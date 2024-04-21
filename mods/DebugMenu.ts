class DebugMenu implements Mod {
    // Game entities
    private player : t4.CActor | null;
    private actors : t4.CActor[];
    private levels : t4.CLevel[];

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

        this.logActorCreation = true;
        this.logActorDestruction = true;
        this.logLevelCreation = true;
        this.logLevelDestruction = true;
        this.logListener = null;

        this.debugEnabled = Cache.getItem('debug-enabled', false);
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

        // todo: grab all the existing actors/levels from the engine
    }

    onShutdown() {
        if (this.logListener) t4.removeLogListener(this.logListener);
        this.logListener = null;
    }

    onActorCreated(actor: t4.CActor) {
        if (this.logActorCreation) console.log(`Created actor '${actor.name || '(no name)'}' (type ${actor.type}, id ${t4.getGameObjectId(actor)})`);

        if (actor.type === 9) this.player = actor;
        this.actors.push(actor);
        this.actors.sort((a, b) => {
            return (a.name || '').localeCompare((b.name || ''), undefined, { numeric: true, sensitivity: 'base' })
        });
    }

    onActorDestroy(actor: t4.CActor) {
        if (this.logActorDestruction) {
            // todo: figure out the very first point at which an actor is going to be destroyed and hook that
            //       ...Sometimes the actor info (name, type, etc) is already gone by this point
            // console.log(`Destroying actor '${actor.name}' (type ${actor.type})`);
            // console.log(`Destroying actor 0x${t4.getGameObjectId(actor).toString(16)}`);
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
            Cache.setItem('debug-enabled', this.debugEnabled);
            if (this.debugEnabled) {
                engine.disableInput();
            } else {
                engine.enableInput();
            }
        } else if (event.key === t4.Key.Space && event.state === t4.KeyState.Pressed) {
            if (!this.player) return;
            const newPos = vec3f.From(this.player.position);
            newPos.add(new vec3f(0, 5.0, 0));
            this.player.setPosition(newPos);
        }
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
            const groups : { [k: number]: t4.CActor[] } = {};
            const typeIds : number[] = [];
            this.actors.forEach(a => {
                if (a.type in groups) groups[a.type].push(a);
                else {
                    typeIds.push(a.type);
                    groups[a.type] = [a];
                }
            });

            typeIds.forEach(t => {
                if (ImGui.CollapsingHeader(`Type ${t} (${groups[t].length} Actors)`, ImGui.TreeNodeFlags.None)) {
                    groups[t].forEach(a => {
                        const isSelected = t4.compareGameObjects(a, this.viewingActor);
                        const address = t4.getGameObjectId(a);
                        ImGui.PushID(address);
                        if (ImGui.Selectable(`${a.name} ${a.typeName}`, isSelected)) {
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

        if (ImGui.Begin(`ainfo###'${actor.name}'`, ImGui.WindowFlags.None)) {
            const pos = actor.position;
            ImGui.Text('Position');
            ImGui.DragFloat('x', pos.x, x => actor.setPosition({ x, y: pos.y, z: pos.z }));
            ImGui.DragFloat('y', pos.y, y => actor.setPosition({ x: pos.x, y, z: pos.z }));
            ImGui.DragFloat('z', pos.z, z => actor.setPosition({ x: pos.x, y: pos.y, z }));
            // ImGui.Text(`Type: '${actor.typeName}'`)
            // ImGui.Text(`Mesh: '${actor.geomFilePath}'`);
            // const typeInfo = actor.typeInfo;
            // if (typeInfo) {
            //     ImGui.Text(`ATR: '${typeInfo.actorPath}'`);
            //     ImGui.Text(`Geom: '${typeInfo.geomPath}'`);
            //     ImGui.Text(`Type: '${typeInfo.typeName}'`)
            //     ImGui.Text(`Total alive of this type: '${typeInfo.activeCount}'`);
            // } else {
            //     ImGui.Text('Type info not specified');
            // }

            if (ImGui.Button('Get High', new vec2f(0, 0))) {
                actor.setPosition(vec3f.From(actor.position).add(new vec3f(0, 15, 0)));
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

            ImGui.Text('Todo: put cool stuff here');
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