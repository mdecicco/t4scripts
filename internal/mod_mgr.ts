import { Cache } from './mod_cache';

interface Mod {
    onInitialize?(): void;
    onShutdown?(): void;
};

export interface GlobalMod extends Mod {
    onActorCreated?(actor: t4.CActor): void;
    onActorDestroy?(actor: t4.CActor): void;
    onLevelCreate?(level: t4.CLevel): void;
    onLevelSpawn?(level: t4.CLevel): void;
    onLevelDestroy?(level: t4.CLevel): void;
    onKeyboardInput?(event: t4.KeyboardEvent): void;
    onUpdate?(deltaTime: f32): void;
    onRender?(deltaTime: f32): void;
};

export interface ActorController {
    onShutdown?(): void;
    onDestroy?(): void;
    onActorCreated?(actor: t4.CActor): void;
    onActorDestroy?(actor: t4.CActor): void;
    onLevelCreate?(level: t4.CLevel): void;
    onLevelSpawn?(level: t4.CLevel): void;
    onLevelDestroy?(level: t4.CLevel): void;
    onKeyboardInput?(event: t4.KeyboardEvent): void;
    onUpdate?(deltaTime: f32): void;
    onRender?(deltaTime: f32): void;
};

export interface ActorMod extends Mod {
    actorSelector(actor: t4.CActor) : boolean; 
    createController(actor: t4.CActor) : ActorController;
};

export interface GlobalModConstructor {
    /**
     * The amount of time to wait in seconds in between updates
     * Use 0 to update every frame. Important note: If you set this
     * to a value that's smaller than the frame rate of the game then
     * your update method may be called multiple times per frame. This
     * is desirable for any behavior that absolutely requires a fixed
     * time step, but be careful. If you set it to something low like
     * 0.00000001 then the game will essentially come to a halt while
     * it calls your update method like a million times per frame...
     */
    updateInterval?: number;

    new (): GlobalMod;
};

export interface ActorModConstructor {
    /**
     * The amount of time to wait in seconds in between updates for each actor.
     * Use 0 to update every frame. Important note: If you set this
     * to a value that's smaller than the frame rate of the game then
     * your update method may be called multiple times per frame. This
     * is desirable for any behavior that absolutely requires a fixed
     * time step, but be careful. If you set it to something low like
     * 0.00000001 then the game will essentially come to a halt while
     * it calls your update method like a million times per frame...
     */
    updateInterval?: number;
    new (): ActorMod;
};

type ModTrackingData = {
    __mod_id: string;
    __last_modified_on: number;
    __update_interval: number;
    __update_timer: number;
};

type TrackedGlobalMod = ModTrackingData & GlobalMod;
type TrackedActorMod = ModTrackingData & ActorMod;

type ActorControllerTrackingData = {
    __actor: t4.CActor;
    __mod_id: string;
    __update_interval: number;
    __update_timer: number;
    __update_listener: number | null;
};
type TrackedActorController = ActorControllerTrackingData & ActorController;

class ModManager {
    private didInitialize: boolean;
    private allModIds: string[];
    private globalMods: TrackedGlobalMod[];
    private actorMods: TrackedActorMod[];
    private actorControllers: TrackedActorController[];
    private lastTime: f32;
    private deltaTime: f32;
    private fps: f32;
    private nextModId: string | null;
    private nextModLastModificationTime: number | null;
    private didLoadDlls: boolean;

    private actorCreateListener: u32 | null;
    private actorDestroyListener: u32 | null;
    private levelCreateListener: u32 | null;
    private levelSpawnListener: u32 | null;
    private levelDestroyListener: u32 | null;
    private renderListener: u32 | null;
    private updateListener: u32 | null;
    private keyboardListener: u32 | null;
    private moduleInterval: u32 | null;

    constructor() {
        // todo: listen for requests from the host to load / unload mods

        this.didInitialize = false;

        this.allModIds = [];
        this.globalMods = [];
        this.actorMods = [];
        this.actorControllers = [];

        this.lastTime = t4.elapsedTime;
        this.deltaTime = 1.0 / 60.0;
        this.fps = 0;
        this.nextModId = null;
        this.nextModLastModificationTime = null;
        this.didLoadDlls = false;

        this.actorCreateListener = null;
        this.actorDestroyListener = null;
        this.levelCreateListener = null;
        this.levelDestroyListener = null;
        this.renderListener = null;
        this.updateListener = null;
        this.keyboardListener = null;
        this.moduleInterval = null;

        this.keyboardListener = t4.addKeyboardListener(this.onKeyboardInput.bind(this));
        this.onLoad();
    }

    private getModId(mod: Mod) {
        return (mod as any).__mod_id;
    }

    private callModMethod<M extends (...args: any) => any>(m: Mod, methodName: string, method: M | undefined, ...args: Parameters<M>) {
        (Cache as any).currentModId = this.getModId(m);
        try {
            if (method) method.apply(m, args);
        } catch (err) {
            console.error(`Caught exception while calling '${methodName}' for mod '${this.getModId(m)}'`);
            console.error(err);
        }
        (Cache as any).currentModId = null;
    }

    private callActorControllerMethod<M extends (...args: any) => any>(c: TrackedActorController, methodName: string, method: M | undefined, ...args: Parameters<M>) {
        (Cache as any).currentModId = c.__mod_id;
        try {
            if (method) method.apply(c, args);
        } catch (err) {
            console.error(`Caught exception while calling '${methodName}' for actor controller from mod '${c.__mod_id}'`);
            console.error(err);
        }
        (Cache as any).currentModId = null;
    }

    private onLoad() {
        const engine = t4.getEngine();
        
        if (!engine) {
            let engineListener = t4.addEngineCreateListener(engine => {
                this.onLoad();
                t4.removeEngineCreateListener(engineListener);
            });
            return;
        }

        this.bindEngineListeners(engine);
        
        this.startModuleListener();
        this.scanModules();

        this.globalMods.forEach(m => this.callModMethod(m, 'onInitialize', m.onInitialize));
        this.actorMods.forEach(m => this.callModMethod(m, 'onInitialize', m.onInitialize));

        this.didInitialize = true;
    }

    private onUnload() {
        this.globalMods.forEach(m => this.callModMethod(m, 'onShutdown', m.onShutdown));
        this.actorControllers.forEach(c => {
            this.callActorControllerMethod(c, 'onShutdown', c.onShutdown);
            if (c.__update_listener) {
                c.__actor.removeUpdateListener(c.__update_listener);
                c.__update_listener = null;
            }
        });
        this.actorMods.forEach(m => this.callModMethod(m, 'onShutdown', m.onShutdown));

        this.globalMods = [];
        this.actorControllers = [];
        this.actorMods = [];
        
        this.removeListeners();
        this.didInitialize = false;
    }

    private scanModules() {
        // also do this while we're at it
        (Cache as any).serialize();

        const compiledMods = fs.listDirectoryEntries(`${t4.scriptDirectory}/output/mods`);
        if (!compiledMods) return;

        compiledMods.forEach(mod => {
            this.nextModId = fs.relativePath(mod.path, `${t4.scriptDirectory}/output`);
            if (!this.nextModId) {
                console.error(`Failed to get relative path for mod '${mod.path}'`);
                return;
            }
            
            this.nextModLastModificationTime = mod.status.lastWriteTime;

            const loadedGlobalMod = this.globalMods.find(m => m.__mod_id === this.nextModId);
            if (loadedGlobalMod) {
                // Mod was already loaded, unload it so we can load it again
                if (loadedGlobalMod.__last_modified_on === mod.status.lastWriteTime) {
                    this.nextModId = null;
                    this.nextModLastModificationTime = null;
                    return;
                }

                this.callModMethod(loadedGlobalMod, 'onShutdown', loadedGlobalMod.onShutdown);
                this.globalMods = this.globalMods.filter(m => m.__mod_id !== loadedGlobalMod.__mod_id);
                this.allModIds = this.allModIds.filter(mid => mid !== loadedGlobalMod.__mod_id);
            }

            const loadedActorMod = this.actorMods.find(m => m.__mod_id === this.nextModId);
            if (loadedActorMod) {
                // Mod was already loaded, unload it so we can load it again
                if (loadedActorMod.__last_modified_on === mod.status.lastWriteTime) {
                    this.nextModId = null;
                    this.nextModLastModificationTime = null;
                    return;
                }

                this.actorControllers = this.actorControllers.filter(c => {
                    if (c.__mod_id === this.nextModId) {
                        this.callActorControllerMethod(c, 'onShutdown', c.onShutdown);
                        return false;
                    }

                    return true;
                });

                this.callModMethod(loadedActorMod, 'onShutdown', loadedActorMod.onShutdown);
                this.actorMods = this.actorMods.filter(m => m.__mod_id !== loadedActorMod.__mod_id);
                this.allModIds = this.allModIds.filter(mid => mid !== loadedActorMod.__mod_id);
            }
            
            // Load it
            try {
                require(this.nextModId, true);
            } catch (err) {
                console.error(`Failed to import mod ${this.nextModId.replace('js', 'ts')}, see the logs for more info possibly`);
            }

            this.nextModId = null;
            this.nextModLastModificationTime = null;
        });
    }

    private startModuleListener() {
        console.log('Starting mod modification listener');
        if (this.moduleInterval) return;
        this.moduleInterval = setInterval(this.scanModules.bind(this), 2000);
    }

    private stopModuleListener() {
        console.log('Stopping mod modification listener');
        if (!this.moduleInterval) return;
        clearInterval(this.moduleInterval);
        this.moduleInterval = null;
    }

    private bindEngineListeners(engine: t4.CGame) {
        this.actorCreateListener = engine.addActorCreateListener(this.onActorCreated.bind(this));
        this.actorDestroyListener = engine.addActorDestroyListener(this.onActorDestroy.bind(this));
        this.levelCreateListener = engine.addLevelCreateListener(this.onLevelCreate.bind(this));
        this.levelSpawnListener = engine.addLevelSpawnListener(this.onLevelSpawn.bind(this));
        this.levelDestroyListener = engine.addLevelDestroyListener(this.onLevelDestroy.bind(this));
        this.renderListener = engine.addRenderListener(this.onRender.bind(this));
        this.updateListener = engine.addUpdateListener(this.onUpdate.bind(this));
    }

    private removeEngineListeners(engine: t4.CGame) {
        if (this.actorCreateListener) engine.removeActorCreateListener(this.actorCreateListener);
        this.actorCreateListener = null;

        if (this.actorDestroyListener) engine.removeActorDestroyListener(this.actorDestroyListener);
        this.actorDestroyListener = null;

        if (this.levelCreateListener) engine.removeLevelCreateListener(this.levelCreateListener);
        this.levelCreateListener = null;

        if (this.levelSpawnListener) engine.removeLevelSpawnListener(this.levelSpawnListener);
        this.levelSpawnListener = null;

        if (this.levelDestroyListener) engine.removeLevelDestroyListener(this.levelDestroyListener);
        this.levelDestroyListener = null;

        if (this.renderListener) engine.removeRenderListener(this.renderListener);
        this.renderListener = null;

        if (this.updateListener) engine.removeUpdateListener(this.updateListener);
        this.updateListener = null;
    }

    private removeListeners() {
        const engine = t4.getEngine();
        if (!engine) return;

        this.removeEngineListeners(engine);
        this.stopModuleListener();

        if (this.keyboardListener) t4.removeKeyboardListener(this.keyboardListener);
        this.keyboardListener = null;
    }

    private onActorCreated(actor: t4.CActor) {
        this.globalMods.forEach(m => this.callModMethod(m, 'onActorCreated', m.onActorCreated, actor));
        this.actorControllers.forEach(c => {
            this.callActorControllerMethod(c, 'onActorCreated', c.onActorCreated, actor);
        });

        this.actorMods.forEach(m => {
            if (m.actorSelector(actor)) {
                this.createActorController(actor, m);
            }
        });
    }

    private onActorDestroy(actor: t4.CActor) {
        this.globalMods.forEach(m => this.callModMethod(m, 'onActorDestroy', m.onActorDestroy, actor));
        this.actorControllers = this.actorControllers.filter(c => {
            if (t4.compareGameObjects(c.__actor, actor)) {
                this.callActorControllerMethod(c, 'onDestroy', c.onDestroy);
                if (c.__update_listener) {
                    actor.removeUpdateListener(c.__update_listener);
                    c.__update_listener = null;
                }
                return false;
            } else {
                this.callActorControllerMethod(c, 'onActorDestroy', c.onActorDestroy, actor);
            }

            return true;
        });
    }

    private onLevelCreate(level: t4.CLevel) {
        this.globalMods.forEach(m => this.callModMethod(m, 'onLevelCreate', m.onLevelCreate, level));
        this.actorControllers.forEach(c => {
            this.callActorControllerMethod(c, 'onLevelCreate', c.onLevelCreate, level);
        });
    }

    private onLevelSpawn(level: t4.CLevel) {
        this.globalMods.forEach(m => this.callModMethod(m, 'onLevelSpawn', m.onLevelSpawn, level));
        this.actorControllers.forEach(c => {
            this.callActorControllerMethod(c, 'onLevelSpawn', c.onLevelSpawn, level);
        });
    }

    private onLevelDestroy(level: t4.CLevel) {
        this.globalMods.forEach(m => this.callModMethod(m, 'onLevelDestroy', m.onLevelDestroy, level));
        this.actorControllers.forEach(c => {
            this.callActorControllerMethod(c, 'onLevelDestroy', c.onLevelDestroy, level);
        });
    }

    private onKeyboardInput(event: t4.KeyboardEvent) {
        this.globalMods.forEach(m => this.callModMethod(m, 'onKeyboardInput', m.onKeyboardInput, event));
        this.actorControllers.forEach(c => {
            if (c.onKeyboardInput) this.callActorControllerMethod(c, 'onKeyboardInput', c.onKeyboardInput, event);
        });
    }

    private onUpdate() {
        if (!this.didLoadDlls) {
            // Load dlls here while we have the game engine paused
            try {
                const injectPath = `${t4.gameDirectory}/inject`;
                console.log(`Looking for dlls to inject in ${injectPath}`);
                const injectPathStat = fs.stat(injectPath);
                if (!injectPathStat) console.log(`${injectPath} does not exist`);
                else if (injectPathStat.type != fs.FileType.Directory) console.log(`${injectPath} exists, but it's not a directory`);
                else {
                    const files = fs.listDirectoryEntries(`${injectPath}`);
                    if (files) {
                        files.forEach(f => {
                            if (f.extension && f.extension.toLocaleLowerCase() === '.dll') {
                                console.log(`Attempting to load dll '${f.name}${f.extension}`);
                                if (!sys.loadDLL(f.extension)) {
                                    console.error(`Failed to load dll '${f.name}${f.extension}'`);
                                }
                            }
                        });
                    }
                }
            } catch (err) {
                console.error('Failed to load dlls');
                console.error(err);
            }
            this.didLoadDlls = true;
        }

        const elapsed = t4.elapsedTime;
        this.deltaTime = elapsed - this.lastTime;

        // limit the FPS to 1000 for now because on loading
        // screens it shoots up to >50k fps and it breaks the
        // thread synchronization somehow
        while (this.deltaTime < 0.0001) {
            t4.sleep(1);
            this.deltaTime = t4.elapsedTime - this.lastTime;
        }

        this.lastTime = elapsed;
        this.fps = 1.0 / this.deltaTime;

        this.globalMods.forEach(m => {
            if (m.__update_interval === 0) {
                this.callModMethod(m, 'onUpdate', m.onUpdate, this.deltaTime);
                return;
            }

            m.__update_timer += this.deltaTime;
            while (m.__update_timer >= m.__update_interval) {
                this.callModMethod(m, 'onUpdate', m.onUpdate, m.__update_interval);
                m.__update_timer -= m.__update_interval;
            }
        });
    }

    private onRender() {
        this.globalMods.forEach(m => this.callModMethod(m, 'onRender', m.onRender, this.deltaTime));
        this.actorControllers.forEach(c => {
            if (c.onRender) this.callActorControllerMethod(c, 'onRender', c.onRender, this.deltaTime);
        });
    }

    private createActorController(actor: t4.CActor, mod: TrackedActorMod) {
        const controller = mod.createController(actor) as TrackedActorController;
        controller.__actor = actor;
        controller.__mod_id = mod.__mod_id;
        controller.__update_interval = (mod as TrackedActorMod).__update_interval;
        controller.__update_timer = 0;

        if (controller.onUpdate) {
            controller.__update_listener = actor.addUpdateListener(dt => {
                if (controller.__update_interval === 0) {
                    this.callModMethod(controller, 'onUpdate', controller.onUpdate, dt);
                    return;
                }
    
                controller.__update_timer += dt;
                while (controller.__update_timer >= controller.__update_interval) {
                    if (controller.onUpdate) this.callActorControllerMethod(controller, 'onUpdate', controller.onUpdate, controller.__update_interval);
                    controller.__update_timer -= controller.__update_interval;
                }
            });
        } else {
            controller.__update_listener = null;
        }

        this.actorControllers.push(controller);
    }

    registerGlobalMod(modClass: GlobalModConstructor) {
        if (this.nextModId === null || this.nextModLastModificationTime === null) {
            throw `ModMan.registerGlobalMod called at an unusual time, not expecting it...`;
        }

        const existing = this.allModIds.find(mid => mid == this.nextModId);
        if (existing) throw `Multiple mods with the id '${this.nextModId}' encountered. Mod IDs must be unique.`;

        (Cache as any).currentModId = this.nextModId;
        const mod = new modClass();
        (Cache as any).currentModId = null;

        (mod as TrackedGlobalMod).__mod_id = this.nextModId;
        (mod as TrackedGlobalMod).__last_modified_on = this.nextModLastModificationTime;
        (mod as TrackedGlobalMod).__update_interval = modClass.updateInterval || 0;
        (mod as TrackedGlobalMod).__update_timer = 0;
        if (this.didInitialize) {
            // Can't count on the onLoad function of this class
            // being called any time soon, just load the mod now
            // since we know the game has already been running
            if (mod.onInitialize) mod.onInitialize();
        }

        this.globalMods.push(mod as TrackedGlobalMod);
        this.allModIds.push(this.nextModId);
    }

    registerActorMod(modClass: ActorModConstructor) {
        if (this.nextModId === null || this.nextModLastModificationTime === null) {
            throw `ModMan.registerActorMod called at an unusual time, not expecting it...`;
        }

        const existing = this.allModIds.find(mid => mid == this.nextModId);
        if (existing) throw `Multiple mods with the id '${this.nextModId}' encountered. Mod IDs must be unique.`;

        (Cache as any).currentModId = this.nextModId;
        const mod = new modClass();
        (Cache as any).currentModId = null;

        (mod as TrackedActorMod).__mod_id = this.nextModId;
        (mod as TrackedActorMod).__last_modified_on = this.nextModLastModificationTime;
        (mod as TrackedActorMod).__update_interval = modClass.updateInterval || 0;
        (mod as TrackedActorMod).__update_timer = 0;

        if (this.didInitialize) {
            // Can't count on the onLoad function of this class
            // being called any time soon, just load the mod now
            // since we know the game has already been running
            if (mod.onInitialize) mod.onInitialize();
        }

        this.actorMods.push(mod as TrackedActorMod);
        this.allModIds.push(this.nextModId);

        // There may be actors already, make sure to get controllers for them if necessary
        const actors = t4.getLiveActors();
        if (actors.length > 0) {
            actors.forEach(actor => {
                t4.refreshGameObject(actor);
                this.actorMods.forEach(m => {
                    if (m.actorSelector(actor)) this.createActorController(actor, m);
                });
            });
        }
    }
};

export const ModMan = new ModManager();