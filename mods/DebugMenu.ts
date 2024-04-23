import { Cache } from '../internal/mod_cache';
import { ModMan } from '../internal/mod_mgr';

class DebugMenu implements GlobalMod {
    // Game entities
    private player : t4.CActor | null;
    private actors : t4.CActor[];
    private levels : t4.CLevel[];
    private actorRefreshInterval : IntervalID | null;

    // Logging
    private logs : t4.LogEvent[];
    private logActorCreation : boolean;
    private logActorDestruction : boolean;
    private logLevelCreation : boolean;
    private logLevelDestruction : boolean;
    private logListener : u32 | null;

    // UI state
    private debugEnabled : boolean;
    private showActors : boolean;
    private showLevels : boolean;
    private showLogs : boolean;
    private viewingActor : t4.CActor | null;

    constructor() {
        this.logs = [];
        this.player = null;
        this.actors = [];
        this.levels = [];
        this.actorRefreshInterval = null;

        this.logActorCreation = false;
        this.logActorDestruction = false;
        this.logLevelCreation = false;
        this.logLevelDestruction = false;
        this.logListener = null;

        this.debugEnabled = false;
        this.showActors = Cache.getItem('show-actors', false);
        this.showLevels = Cache.getItem('show-levels', false);
        this.showLogs = Cache.getItem('show-logs', false);
        this.viewingActor = null;
        this.logListener = null;
    }

    onInitialize() {
        this.logListener = t4.addLogListener(event => {
            // for now... Event has to be cloned because all the properties
            // are accessed directly from the native event, which gets destroyed
            // immediately after this callback
            this.logs.push({ ...event });
        });

        this.actors = t4.getLiveActors();
    }

    onShutdown() {
        if (this.logListener) t4.removeLogListener(this.logListener);
        this.logListener = null;

        if (this.actorRefreshInterval) clearInterval(this.actorRefreshInterval);
        this.actorRefreshInterval = null;
    }

    onActorCreated(actor: t4.CActor) {
        if (this.logActorCreation) console.log(`Created actor 0x${t4.getGameObjectId(actor).toString(16)} '${actor.name || '(no name)'}'`);

        if (actor.type === 9) this.player = actor;
        this.actors.push(actor);
        this.actors.sort((a, b) => {
            return (a.name || '').localeCompare((b.name || ''), undefined, { numeric: true, sensitivity: 'base' })
        });
    }

    onActorDestroy(actor: t4.CActor) {
        if (this.logActorDestruction) {
            // todo: figure out the very first point at which it's known
            //       that an actor is going to be destroyed and hook that
            //       instead of the actor destructor...
            console.log(`Destroying actor 0x${t4.getGameObjectId(actor).toString(16)}`);
        }

        this.actors = this.actors.filter(a => !t4.compareGameObjects(a, actor));
        if (t4.compareGameObjects(actor, this.player)) this.player = null;
        if (t4.compareGameObjects(actor, this.viewingActor)) this.viewingActor = null;
    }

    onLevelCreate(level: t4.CLevel) {
        if (this.logLevelCreation) console.log(`Created level '${level.info.actorPath}'`);

        this.levels.push(level);
        this.levels = this.levels.sort((a, b) => {
            return (a.info.actorPath || '').localeCompare((b.info.actorPath || ''), undefined, { numeric: true, sensitivity: 'base' })
        });
    }

    onLevelDestroy(level: t4.CLevel) {
        if (this.logLevelDestruction) console.log(`Destroying level '${level.info.actorPath}'`);
        this.levels = this.levels.filter(l => !t4.compareGameObjects(l, level));
    }

    onKeyboardInput(event: t4.KeyboardEvent) {
        const engine = t4.getEngine();
        if (!engine) return;

        if (event.key === t4.Key.Backtick && event.state === t4.KeyState.Pressed) {
            this.debugEnabled = !this.debugEnabled;
            if (this.debugEnabled) {
                engine.disableInput();
                this.actorRefreshInterval = setInterval(this.refreshActors.bind(this), 500);
            } else {
                engine.enableInput();

                if (this.actorRefreshInterval) {
                    clearInterval(this.actorRefreshInterval);
                    this.actorRefreshInterval = null;
                }
            }
        }
    }

    refreshActors() {
        this.actors.forEach(a => t4.refreshGameObject(a));
    }

    renderLogs() {
        if (!this.showLogs) return;

        if (ImGui.Begin('Logs', ImGui.WindowFlags.None)) {
            this.logs.forEach(log => {
                const color = new vec4f(1, 1, 1, 1);
                switch (log.level) {
                    case t4.LogLevel.Warning: {
                        color.x = 1;
                        color.y = 1;
                        color.z = 0;
                        break;
                    }
                    case t4.LogLevel.Error:
                    case t4.LogLevel.Fatal: {
                        color.y = 0;
                        color.z = 0;
                        break;
                    }
                }
                ImGui.TextColored(color, `[${log.scope}] ${log.message}`);
            });

            ImGui.SetScrollHereY(1);
        }
        ImGui.End();
    }

    renderActors() {
        if (!this.showActors) return;
        
        if (ImGui.Begin('Actors', ImGui.WindowFlags.None)) {
            const groups : { [k: string]: t4.CActor[] } = {};
            const typeIds : string[] = [];
            this.actors.forEach(a => {
                const type = a.typeInfo?.typeName || 'No Type';
                if (type in groups) groups[type].push(a);
                else {
                    typeIds.push(type);
                    groups[type] = [a];
                }
            });

            typeIds.forEach(t => {
                if (ImGui.CollapsingHeader(`${t} (${groups[t].length} Actors)`, ImGui.TreeNodeFlags.None)) {
                    groups[t].forEach(a => {
                        const isSelected = t4.compareGameObjects(a, this.viewingActor);
                        const address = t4.getGameObjectId(a);
                        ImGui.PushID(address);
                        if (ImGui.Selectable(`${a.name || 'No Name'}`, isSelected)) {
                            this.viewingActor = a;
                        }
                        ImGui.PopID();

                        if (ImGui.BeginItemTooltip()) {
                            const pos = a.position;
                            const id = `0x${address.toString(16)}`;
                            const flags = a.actorFlags.toString(2);
                            ImGui.Text(`ID: ${id}`);
                            ImGui.Text(`Position: ${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}`);
                            ImGui.Text(`Flags: 0b${flags}`);
                            ImGui.Text(`Collision Flags: 0b${a.collisionFlags.toString(2)}`);
                            ImGui.Text(`Touches: 0b${a.touches.toString(2)}`);
                            ImGui.Text(`Unknown Flag: 0b${a.unknownFlag.toString(2)}`)
                            ImGui.Text(`Mode: ${a.mode} (0b${a.mode.toString(2)})`);
                            ImGui.Text(`Nudge: ${a.nudge} (0b${a.nudge.toString(2)}`);
                            ImGui.Text(`Visibility: ${a.isVisible() ? 'Visible' : 'Invisible'}`)
                            ImGui.EndTooltip();
                        }
                    });
                }
            });
        }
        ImGui.End();
    }

    renderLevels() {
        if (!this.showLevels) return;

        if (ImGui.Begin('Levels', ImGui.WindowFlags.None)) {
            this.levels.forEach(l => {
                ImGui.Text(`Level '${l.info.actorPath}'`);
            });
        }
        ImGui.End();
    }

    renderActorInfo() {
        if (!this.viewingActor) return;
        const actor = this.viewingActor;

        if (ImGui.Begin(`'${actor.name}###ainfo'`, ImGui.WindowFlags.None)) {
            t4.refreshGameObject(this.viewingActor);
            const pos = actor.position;
            ImGui.Text('Position');
            ImGui.DragFloat('x', pos.x, x => actor.setPosition({ x, y: pos.y, z: pos.z }));
            ImGui.DragFloat('y', pos.y, y => actor.setPosition({ x: pos.x, y, z: pos.z }));
            ImGui.DragFloat('z', pos.z, z => actor.setPosition({ x: pos.x, y: pos.y, z }));

            const visibility = actor.isVisible();
            if (ImGui.Checkbox('Visible', visibility)) actor.setVisibility(!visibility);

            const typeInfo = actor.typeInfo;
            if (typeInfo) {
                if (ImGui.CollapsingHeader('Type Info', ImGui.TreeNodeFlags.None)) {
                    ImGui.Text(`ATR: '${typeInfo.actorPath}'`);
                    ImGui.Text(`Geom: '${typeInfo.geomPath}'`);
                    ImGui.Text(`Type: '${typeInfo.typeName}'`)
                    ImGui.Text(`Total alive of this type: '${typeInfo.activeCount}'`);
                }
            }

            const physicsInfo = actor.physics;
            if (physicsInfo) {
                if (ImGui.CollapsingHeader('Physics Info', ImGui.TreeNodeFlags.None)) {
                    const velocity = physicsInfo.velocity;
                    ImGui.Text(`mass: ${physicsInfo.mass}`);
                    ImGui.Text(`field_0x4: ${physicsInfo.field_0x4}`);
                    ImGui.Text(`gravity: ${physicsInfo.gravity}`);
                    ImGui.Text(`field_0xC: ${physicsInfo.field_0xC}`);
                    ImGui.Text(`field_0x10: ${physicsInfo.field_0x10}`);
                    ImGui.Text(`field_0x14: ${physicsInfo.field_0x14}`);
                    ImGui.Text(`Velocity: ${velocity.x}, ${velocity.y}, ${velocity.z}`);
                    ImGui.Text(`field_0x24: ${physicsInfo.field_0x24}`);
                    ImGui.Text(`field_0x28: ${physicsInfo.field_0x28}`);
                    ImGui.Text(`field_0x2C: ${physicsInfo.field_0x2C}`);
                    ImGui.Text(`field_0x30: ${physicsInfo.field_0x30}`);
                    ImGui.Text(`field_0x34: ${physicsInfo.field_0x34}`);
                    ImGui.Text(`field_0x38: ${physicsInfo.field_0x38}`);
                }
            }

            if (this.player && ImGui.Button('Teleport Near Player', new vec2f(0, 0))) {
                const setToPos = vec3f.From(this.player.position);
                const forward = this.player.transform.z;
                forward.x *= 3.0;
                forward.y *= 3.0;
                forward.z *= 3.0;

                // put it in front of the player
                setToPos.add(forward);

                // move it up a little bit to try to decrease the odds of it falling through the map
                setToPos.y += 0.5;

                actor.setPosition(setToPos);
            }
        }
        ImGui.End();
        
    }

    renderMenu() {
        if (ImGui.BeginMenuBar()) {
            if (ImGui.BeginMenu("View", true)) {
                if (ImGui.MenuItem("Actors", null, this.showActors, true)) {
                    this.showActors = !this.showActors;
                    Cache.setItem('show-actors', this.showActors);
                }
                if (ImGui.MenuItem("Levels", null, this.showLevels, true)) {
                    this.showLevels = !this.showLevels;
                    Cache.setItem('show-levels', this.showLevels);
                }
                if (ImGui.MenuItem("Logs", null, this.showLogs, true)) {
                    this.showLogs = !this.showLogs;
                    Cache.setItem('show-logs', this.showLogs);
                }
                ImGui.EndMenu();
            }
            ImGui.EndMenuBar();
        }
    }

    onRender() {
        if (!this.debugEnabled) return;
        
        ImGui.BeginGlobalDockSpace(true);

        this.renderMenu();
        this.renderLogs();
        this.renderActors();
        this.renderLevels();
        this.renderActorInfo();

        ImGui.EndGlobalDockSpace();
    }
};

ModMan.registerGlobalMod(DebugMenu);