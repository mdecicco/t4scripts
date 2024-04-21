type TrackedMod = {
    __mod_id: string;
    __last_modified_on: number;
} & Mod;

export class ModManager {
    private didInitialize: boolean;
    private mods: TrackedMod[];
    private lastTime: f32;
    private deltaTime: f32;
    private fps: f32;
    private nextModId: string | null;
    private nextModLastModificationTime: number | null;
    private didLoadDlls: boolean;

    private actorCreateListener: u32 | null;
    private actorDestroyListener: u32 | null;
    private levelCreateListener: u32 | null;
    private levelDestroyListener: u32 | null;
    private renderListener: u32 | null;
    private updateListener: u32 | null;
    private keyboardListener: u32 | null;
    private moduleInterval: u32 | null;

    constructor() {
        // todo: listen for requests from the host to load / unload mods

        this.didInitialize = false;
        this.mods = [];
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

        let createListener = t4.addEngineCreateListener(() => {
            this.onLoad();
            t4.removeEngineCreateListener(createListener);
        });

        // todo:
        // - Add filesystem API
        // - Listen for changes in the `<game>/scripts/output/mods` directory
        //     - Instead of requiring mods to provide their own IDs, just 
        //       use the file path of the mod as the ID or something
        //     - When a compiled mod script is created:
        //         - Communicate to the host to try to load it
        //     - When a compiled mod script is updated:
        //         - Unload the currently running instance of that mod
        //         - Communicate to the host to load the fresh version
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

    private onLoad() {
        const engine = t4.getEngine();
        
        if (!engine) {
            let engineListener = t4.addEngineCreateListener(engine => {
                this.bindEngineListeners(engine);
                t4.removeEngineCreateListener(engineListener);

                this.mods.forEach(m => this.callModMethod(m, 'onInitialize', m.onInitialize));

                this.didInitialize = true;
            });
            return;
        }

        this.bindEngineListeners(engine);
        
        this.startModuleListener();
        this.scanModules();

        this.mods.forEach(m => this.callModMethod(m, 'onInitialize', m.onInitialize));

        this.didInitialize = true;
    }

    private onUnload() {
        this.mods.forEach(m => this.callModMethod(m, 'onShutdown', m.onShutdown));
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

            const loaded = this.mods.find(m => m.__mod_id === this.nextModId);
            if (loaded) {
                // Mod was already loaded, unload it so we can load it again
                if (loaded.__last_modified_on === mod.status.lastWriteTime) {
                    this.nextModId = null;
                    this.nextModLastModificationTime = null;
                    return;
                }

                this.callModMethod(loaded, 'onShutdown', loaded.onShutdown);
                this.mods = this.mods.filter(m => m.__mod_id !== loaded.__mod_id);
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
        if (this.moduleInterval) return;
        this.moduleInterval = setInterval(this.scanModules.bind(this), 2000);
    }

    private stopModuleListener() {
        if (!this.moduleInterval) return;
        clearInterval(this.moduleInterval);
        this.moduleInterval = null;
    }

    private bindEngineListeners(engine: t4.CGame) {
        this.actorCreateListener = engine.addActorCreateListener(this.onActorCreated.bind(this));
        this.actorDestroyListener = engine.addActorDestroyListener(this.onActorDestroy.bind(this));
        this.levelCreateListener = engine.addLevelCreateListener(this.onLevelCreate.bind(this));
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
        this.mods.forEach(m => this.callModMethod(m, 'onActorCreated', m.onActorCreated, actor));
    }

    private onActorDestroy(actor: t4.CActor) {
        this.mods.forEach(m => this.callModMethod(m, 'onActorDestroy', m.onActorDestroy, actor));
    }

    private onLevelCreate(level: t4.CLevel) {
        this.mods.forEach(m => this.callModMethod(m, 'onLevelCreate', m.onLevelCreate, level));
    }

    private onLevelDestroy(level: t4.CLevel) {
        this.mods.forEach(m => this.callModMethod(m, 'onLevelDestroy', m.onLevelDestroy, level));
    }

    private onKeyboardInput(event: t4.KeyboardEvent) {
        this.mods.forEach(m => this.callModMethod(m, 'onKeyboardInput', m.onKeyboardInput, event));
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

        this.mods.forEach(m => this.callModMethod(m, 'onUpdate', m.onUpdate, this.deltaTime));
    }

    private onRender() {
        this.mods.forEach(m => this.callModMethod(m, 'onRender', m.onRender, this.deltaTime));
    }

    registerGlobalMod(modClass: GlobalModConstructor) {
        if (this.nextModId === null || this.nextModLastModificationTime === null) {
            throw `ModMan.registerGlobalMod called at an unusual time, not expecting it...`;
        }

        const existing = this.mods.find(m => m.__mod_id == this.nextModId);
        if (existing) throw `Multiple mods with the id '${this.nextModId}' encountered. Mod IDs must be unique.`;

        (Cache as any).currentModId = this.nextModId;
        const mod = new modClass();
        (Cache as any).currentModId = null;

        (mod as TrackedMod).__mod_id = this.nextModId;
        (mod as TrackedMod).__last_modified_on = this.nextModLastModificationTime;
        if (this.didInitialize) {
            // Can't count on the onLoad function of this class
            // being called any time soon, just load the mod now
            // since we know the game has already been running
            if (mod.onInitialize) mod.onInitialize();
        }

        this.mods.push(mod as TrackedMod);
    }
};