import { ModMan } from '../internal/mod_mgr';

class ScaleTestController implements ActorController {
    private actor : t4.CActor;
    private originalScale : vec3f;
    private time : f32;

    constructor(actor: t4.CActor) {
        this.actor = actor;
        this.originalScale = vec3f.From(actor.scale);
        this.time = Math.random() * 3.0;
    }

    onDestroy(): void {
        this.actor.setScale(this.originalScale);
    }

    onUpdate(dt: f32) {
        this.time += dt;

        // should be in the range of 0.75 ... 1.25
        const deltaScale = 1.0 + (Math.sin(this.time) * 0.25);

        this.actor.setScale({
            x: this.originalScale.x * deltaScale,
            y: this.originalScale.y * deltaScale,
            z: this.originalScale.z * deltaScale
        });
    }
};

class ScaleTestMod implements ActorMod {
    constructor() {}

    actorSelector(actor: t4.CActor) {
        if (!actor.typeInfo || !actor.typeInfo.typeName) return false;
        
        // This mod applies to most vegetation
        const validTypes = [
            t4.ActorType.SwayingTreeAI,
        ];

        if (validTypes.includes(actor.typeInfo.typeName as t4.ActorType)) {
            return true;
        }

        if (actor.name) {
            if (actor.name.includes('ENV_') || actor.name.includes('VEG_')) return true;
        }

        return false;
    }

    createController(actor: t4.CActor) {
        return new ScaleTestController(actor);
    }
};

ModMan.registerActorMod(ScaleTestMod);
