import { ActorController, ActorMod, ModMan } from '../internal/mod_mgr';

class OnCollisionTestController implements ActorController {
    private actor : t4.CActor;
    private collisionListeners : u32[];

    constructor(actor: t4.CActor) {
        this.actor = actor;
        this.collisionListeners = [];

        const actors = t4.getLiveActors();
        // Currently it's not possible to tell which "[Level]" actor is the _actual_ level...
        if (actors) {
            actors.forEach(a => {
                if (a.name === t4.DefaultLevelActorName) {
                    this.createCollisionListener(a);
                }
            });
        }
    }

    onDestroy(): void {
        // Clean up
        this.collisionListeners.forEach(listenerId => this.actor.removeCollisionListener(listenerId));
    }

    createCollisionListener(levelActor: t4.CActor) {
        // Note:
        // A collision listener may be executed many times for the same pair of colliding
        // actors. For example, if the actor is touching the ground then the collision
        // listener may be called as much as once per frame. This behavior is currently
        // unclear
        //
        // Another note:
        // you can pass null for the first argument to listen for collisions with any actor
        // and not just specific ones
        const listenerId = this.actor.addCollisionListener(levelActor, this.onCollision.bind(this));
        this.collisionListeners.push(listenerId);
    }

    onLevelSpawn(level: t4.CLevel): void {
        // Make sure the level still has an actor
        if (!level.levelActor) return;

        this.createCollisionListener(level.levelActor);
    }

    onCollision(withActor: t4.CActor) {
        const pos = this.actor.position;
        this.actor.setPosition({
            x: pos.x,
            y: pos.y + 1,
            z: pos.z
        });
    }
};

class OnCollisionTestMod implements ActorMod {
    constructor() {}

    actorSelector(actor: t4.CActor) {
        if (!actor.typeInfo || !actor.typeInfo.typeName) return false;
        
        // This mod applies to humanoids, enemies, some animals
        const validTypes = [
            t4.ActorType.HumanAI,
            t4.ActorType.AnimalAI,
            t4.ActorType.EnemyAI,
            t4.ActorType.GroupAnimalAI,
            t4.ActorType.IndigenousAI
        ];

        if (validTypes.includes(actor.typeInfo.typeName as t4.ActorType)) {
            return true;
        }
        return false;
    }

    createController(actor: t4.CActor) {
        return new OnCollisionTestController(actor);
    }
};

ModMan.registerActorMod(OnCollisionTestMod);
