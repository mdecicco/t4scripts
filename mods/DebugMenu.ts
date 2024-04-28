import { Cache } from '../internal/mod_cache';
import { GlobalMod, ModMan } from '../internal/mod_mgr';
import { vec2, vec3, vec4 } from '../utils/math';

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
    private showCameras : boolean;
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
        this.showCameras = Cache.getItem('show-camera', false);
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
                const color = new vec4(1, 1, 1, 1);
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

    renderActorTooltip(a: t4.CActor) {
        if (ImGui.BeginItemTooltip()) {
            const address = t4.getGameObjectId(a);
            const pos = a.position;
            const id = `0x${address.toString(16)}`;
            const flags = a.actorFlags.toString(2);
            ImGui.Text(`ID: ${id}`);
            ImGui.Text(`Position: ${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}`);
            ImGui.Text(`Flags: 0b${flags}`);
            ImGui.Text(`Collision Flags: 0b${a.collisionFlags.toString(2)}`);
            ImGui.Text(`Touches: 0b${a.touches.toString(2)}`);
            ImGui.Text(`Using Quat Rotation: 0b${a.usingQuatRotation ? 'Yes' : 'No'}`)
            ImGui.Text(`Mode: ${a.mode} (0b${a.mode.toString(2)})`);
            ImGui.Text(`Nudge: ${a.nudge} (0b${a.nudge.toString(2)}`);
            ImGui.Text(`Visibility: ${a.isVisible ? 'Visible' : 'Invisible'}`)
            ImGui.EndTooltip();
        }
    }

    renderActorList(actors: t4.CActor[]) {
        const groups : { [k: string]: t4.CActor[] } = {};
        const typeIds : string[] = [];
        actors.forEach(a => {
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

                    this.renderActorTooltip(a);
                });
            }
        });
    }

    renderCameraList(cameras: t4.CCamera[]) {
        cameras.forEach((camera, idx) => {
            t4.refreshGameObject(camera);
            if (ImGui.CollapsingHeader(`Camera ${idx + 1}, '${camera.name}'`, ImGui.TreeNodeFlags.None)) {
                const pos = camera.position;
                ImGui.Text('Position');
                ImGui.DragFloat('x###posx', pos.x, x => camera.setPosition({ x, y: pos.y, z: pos.z }));
                ImGui.DragFloat('y###posy', pos.y, y => camera.setPosition({ x: pos.x, y, z: pos.z }));
                ImGui.DragFloat('z###posz', pos.z, z => camera.setPosition({ x: pos.x, y: pos.y, z }));

                const rot = camera.rotationEuler;
                ImGui.Text('Rotation');
                ImGui.DragFloat('x###rotx', rot.x, x => camera.setRotation({ x, y: rot.y, z: rot.z }));
                ImGui.DragFloat('y###roty', rot.y, y => camera.setRotation({ x: rot.x, y, z: rot.z }));
                ImGui.DragFloat('z###rotz', rot.z, z => camera.setRotation({ x: rot.x, y: rot.y, z }));

                const scale = camera.scale;
                ImGui.Text('Scale');
                ImGui.DragFloat('x###scalex', scale.x, x => camera.setScale({ x, y: scale.y, z: scale.z }));
                ImGui.DragFloat('y###scaley', scale.y, y => camera.setScale({ x: scale.x, y, z: scale.z }));
                ImGui.DragFloat('z###scalez', scale.z, z => camera.setScale({ x: scale.x, y: scale.y, z }));
    
                const visibility = camera.isVisible;
                if (ImGui.Checkbox('Visible', visibility)) camera.setVisibility(!visibility);
                if (ImGui.Checkbox('Enabled', camera.isEnabled)) camera.isEnabled = !camera.isEnabled;
    
                const typeInfo = camera.typeInfo;
                if (typeInfo) {
                    if (ImGui.CollapsingHeader('Type Info', ImGui.TreeNodeFlags.None)) {
                        ImGui.Text(`ATR: '${typeInfo.actorPath}'`);
                        ImGui.Text(`Geom: '${typeInfo.geomPath}'`);
                        ImGui.Text(`Type: '${typeInfo.typeName}'`)
                        ImGui.Text(`Total alive of this type: '${typeInfo.activeCount}'`);
                    }
                }

                ImGui.DragFloat('field13_0x240', camera.field13_0x240, nv => camera.field13_0x240 = nv);
                ImGui.DragFloat('field14_0x244', camera.field14_0x244, nv => camera.field14_0x244 = nv);
                ImGui.DragFloat('field19_0x24c', camera.field19_0x24c, nv => camera.field19_0x24c = nv);
                ImGui.DragFloat('field36_0x260', camera.field36_0x260, nv => camera.field36_0x260 = nv);
                ImGui.DragFloat('field53_0x274', camera.field53_0x274, nv => camera.field53_0x274 = nv);
                ImGui.DragFloat('field70_0x288', camera.field70_0x288, nv => camera.field70_0x288 = nv);
                ImGui.DragFloat('field155_0x2e0', camera.field155_0x2e0, nv => camera.field155_0x2e0 = nv);
                ImGui.DragFloat('field184_0x300', camera.field184_0x300, nv => camera.field184_0x300 = nv);
                ImGui.DragFloat('field185_0x304', camera.field185_0x304, nv => camera.field185_0x304 = nv);
                ImGui.DragFloat('field186_0x308', camera.field186_0x308, nv => camera.field186_0x308 = nv);
                ImGui.DragFloat('field203_0x31c', camera.field203_0x31c, nv => camera.field203_0x31c = nv);
                ImGui.DragFloat('field204_0x320', camera.field204_0x320, nv => camera.field204_0x320 = nv);
                ImGui.DragFloat('field205_0x324', camera.field205_0x324, nv => camera.field205_0x324 = nv);
                ImGui.DragFloat('field206_0x328', camera.field206_0x328, nv => camera.field206_0x328 = nv);
                ImGui.DragFloat('field399_0x3ec', camera.field399_0x3ec, nv => camera.field399_0x3ec = nv);
            }
        });
    }

    renderActors() {
        if (!this.showActors) return;
        
        if (ImGui.Begin('Actors', ImGui.WindowFlags.None)) {
            this.renderActorList(this.actors);
        }
        ImGui.End();
    }

    renderLevels() {
        if (!this.showLevels) return;

        if (ImGui.Begin('Levels', ImGui.WindowFlags.None)) {
            const levels = t4.getEngine()?.getLevels();
            if (!levels) {
                ImGui.Text('No Levels');
            } else {
                levels.forEach(l => {
                    t4.refreshGameObject(l);
                    const lid = t4.getGameObjectId(l);

                    let name = '';
                    if (l.actorPath) {
                        name = l.actorPath;
                        let lastSlash = name.lastIndexOf('\\');
                        if (lastSlash == -1) lastSlash = name.lastIndexOf('/');
                        if (lastSlash >= 0) name = name.substring(lastSlash);
                        name = `'${name}'`;
                    } else {
                        name = `0x${lid.toString(16)}`;
                    }

                    if (ImGui.CollapsingHeader(`Level ${name}`, ImGui.TreeNodeFlags.None)) {
                        ImGui.Indent(16.0);
                        ImGui.Text(`Is Dead: ${l.isDead ? 'Yes' : 'No'}`);
                        ImGui.Text(`Active Camera: ${l.activeCamera ? `'${l.activeCamera.name}'` : 'None'}`);
                        ImGui.Text(`Some Elapsed Time ${l.someTimeElapsed.toFixed(2)}`);
                        ImGui.Text(`Some Time Remaining ${l.someTimeRemaining.toFixed(2)}`);
                        ImGui.DragFloat('someTypeWarp0', l.someTimeWarp0, nv => l.someTimeWarp0 = nv);
                        ImGui.DragFloat('someTypeWarp1', l.someTimeWarp1, nv => l.someTimeWarp1 = nv);
                        if (l.info) ImGui.DragFloat(`Gravity###${lid}_grav`, l.info.gravity.y, y => l.info.gravity = { ...l.info.gravity, y });

                        const actors = l.getActors();
                        if (actors && ImGui.CollapsingHeader(`Actors (${actors.length})###${lid}_actors`, ImGui.TreeNodeFlags.None)) {
                            this.renderActorList(actors);
                        }
                        
                        const updateActors = l.getUpdateActors();
                        if (updateActors && ImGui.CollapsingHeader(`Unknown Actor Array (${updateActors.length})###${lid}_uactors`, ImGui.TreeNodeFlags.None)) {
                            this.renderActorList(updateActors);
                        }

                        const cameras = l.getCameras();
                        if (cameras && ImGui.CollapsingHeader(`Cameras (${cameras.length})###${lid}_cameras`, ImGui.TreeNodeFlags.None)) {
                            this.renderCameraList(cameras);
                        }
                        ImGui.Unindent(16.0);
                    }
                });
            }
        }
        ImGui.End();
    }

    renderCameras() {
        if (!this.showCameras) return;

        if (ImGui.Begin(`Cameras`, ImGui.WindowFlags.None)) {
            if (this.levels.length === 0) {
                ImGui.Text('No Level');
            } else {
                const cameras = this.levels[0].getCameras();
                if (cameras.length === 0) {
                    ImGui.Text('No Cameras');
                } else {
                    this.renderCameraList(cameras);
                }
            }
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
            ImGui.DragFloat('x###posx', pos.x, x => actor.setPosition({ x, y: pos.y, z: pos.z }));
            ImGui.DragFloat('y###posy', pos.y, y => actor.setPosition({ x: pos.x, y, z: pos.z }));
            ImGui.DragFloat('z###posz', pos.z, z => actor.setPosition({ x: pos.x, y: pos.y, z }));

            const rot = actor.rotationEuler;
            ImGui.Text('Rotation');
            ImGui.DragFloat('x###rotx', rot.x, x => actor.setRotation({ x, y: rot.y, z: rot.z }));
            ImGui.DragFloat('y###roty', rot.y, y => actor.setRotation({ x: rot.x, y, z: rot.z }));
            ImGui.DragFloat('z###rotz', rot.z, z => actor.setRotation({ x: rot.x, y: rot.y, z }));

            const scale = actor.scale;
            ImGui.Text('Scale');
            ImGui.DragFloat('x###scalex', scale.x, x => actor.setScale({ x, y: scale.y, z: scale.z }));
            ImGui.DragFloat('y###scaley', scale.y, y => actor.setScale({ x: scale.x, y, z: scale.z }));
            ImGui.DragFloat('z###scalez', scale.z, z => actor.setScale({ x: scale.x, y: scale.y, z }));

            const visibility = actor.isVisible;
            if (ImGui.Checkbox('Visible', visibility)) actor.setVisibility(!visibility);
            if (ImGui.Checkbox('Enabled', actor.isEnabled)) actor.isEnabled = !actor.isEnabled;

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
                    ImGui.DragFloat('mass', physicsInfo.mass, nv => physicsInfo.mass = nv);
                    ImGui.DragFloat('field_0x4', physicsInfo.field_0x4, nv => physicsInfo.field_0x4 = nv);
                    ImGui.DragFloat('gravity', physicsInfo.gravity, nv => physicsInfo.gravity = nv);
                    ImGui.DragFloat('velocity.x', velocity.x, x => physicsInfo.velocity = { ...physicsInfo.velocity, x });
                    ImGui.DragFloat('velocity.y', velocity.y, y => physicsInfo.velocity = { ...physicsInfo.velocity, y });
                    ImGui.DragFloat('velocity.z', velocity.z, z => physicsInfo.velocity = { ...physicsInfo.velocity, z });
                    ImGui.DragFloat('field_0xC', physicsInfo.field_0xC, nv => physicsInfo.field_0xC = nv);
                    ImGui.DragFloat('field_0x10', physicsInfo.field_0x10, nv => physicsInfo.field_0x10 = nv);
                    ImGui.DragFloat('field_0x14', physicsInfo.field_0x14, nv => physicsInfo.field_0x14 = nv);
                    ImGui.DragFloat('field_0x24', physicsInfo.field_0x24, nv => physicsInfo.field_0x24 = nv);
                    ImGui.DragFloat('field_0x28', physicsInfo.field_0x28, nv => physicsInfo.field_0x28 = nv);
                    ImGui.DragFloat('field_0x2C', physicsInfo.field_0x2C, nv => physicsInfo.field_0x2C = nv);
                    ImGui.DragFloat('field_0x30', physicsInfo.field_0x30, nv => physicsInfo.field_0x30 = nv);
                    ImGui.DragFloat('field_0x34', physicsInfo.field_0x34, nv => physicsInfo.field_0x34 = nv);
                    ImGui.DragFloat('field_0x38', physicsInfo.field_0x38, nv => physicsInfo.field_0x38 = nv);
                }
            }

            if (this.player && ImGui.Button('Teleport Near Player', new vec2(0, 0))) {
                const setToPos = vec3.From(this.player.position);
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

            if (this.player && ImGui.Button('Teleport To Object', new vec2(0, 0))) {
                const setToPos = vec3.From(actor.position);
                const forward = this.player.transform.z;
                forward.x *= 3.0;
                forward.y *= 3.0;
                forward.z *= 3.0;

                // put it in front of the player
                setToPos.add(forward);

                // move it up a little bit to try to decrease the odds of it falling through the map
                setToPos.y += 0.5;

                this.player.setPosition(setToPos);
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
                if (ImGui.MenuItem("Cameras", null, this.showCameras, true)) {
                    this.showCameras = !this.showCameras;
                    Cache.setItem('show-camera', this.showCameras);
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
        this.renderCameras();
        this.renderActorInfo();

        ImGui.EndGlobalDockSpace();
    }
};

ModMan.registerGlobalMod(DebugMenu);