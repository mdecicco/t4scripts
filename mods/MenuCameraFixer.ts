import { GlobalMod, ModMan } from '../internal/mod_mgr';

class MenuCameraFixerMod implements GlobalMod {
    // Game entities
    private level : t4.CLevel | null;
    private didTheThing : boolean;

    constructor() {
        this.level = null;
    }

    onLevelCreate(level: t4.CLevel) {
        if (!level.info.actorPath || !level.info.actorPath.toLowerCase().includes('frontendbackground')) {
            // set to false here so that if we come back to the menu later we do it again
            this.didTheThing = false;
            return;
        }
        this.level = level;
    }

    onLevelDestroy(level: t4.CLevel) {
        if (t4.compareGameObjects(level, this.level)) this.level = null;
    }

    onUpdate() {
        if (!this.level || this.didTheThing) return;

        const cameras = this.level.getCameras();
        if (!cameras || cameras.length === 0) return;

        const pos = cameras[0].position;
        cameras[0].setPosition({
            x: pos.x,
            y: -5.0,
            z: pos.z
        });

        this.didTheThing = true;
    }
};

ModMan.registerGlobalMod(MenuCameraFixerMod);