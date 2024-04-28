import { ActorController, ActorMod, ModMan } from '../internal/mod_mgr';

//
// Simple mod to make actors of types 'HumanAI', 'AnimalAI',
// 'EnemyAI', 'GroupAnimalAI' rise into the sky when you hold
// the 'U' key
//
// Note: This mod only works some of the time because there is
// some unknown game mechanism that seems to bind actors to the
// ground. It works about ~50% of the time, but if they're falling
// already it works 100% of the time
//
// I have much to learn about the internals of this game

class KeyboardInputTestController implements ActorController {
    private actor : t4.CActor;
    private goUp : boolean;

    constructor(actor: t4.CActor) {
        this.actor = actor;
        this.goUp = false;
    }

    onKeyboardInput(event: t4.KeyboardEvent) {
        const engine = t4.getEngine();
        if (!engine) return;

        if (event.key === t4.Key.U) {
            if (event.state === t4.KeyState.Pressed) {
                this.goUp = true;
            } else if (event.state === t4.KeyState.Released) {
                this.goUp = false;
            }
        }
    }

    onUpdate(deltaTime: f32) {
        // Make them go up at a rate of 15 units per second
        if (this.goUp) {
            const pos = this.actor.position;
            this.actor.setPosition({
                x: pos.x,
                y: pos.y + (15.0 * deltaTime),
                z: pos.z
            });
        }
    }
};

class KeyboardInputTestMod implements ActorMod {
    constructor() {}

    actorSelector(actor: t4.CActor) {
        if (!actor.typeInfo || !actor.typeInfo.typeName) return false;
        
        // This mod applies to humanoids, enemies, some animals
        const validTypes = [
            t4.ActorType.HumanAI,
            t4.ActorType.AnimalAI,
            t4.ActorType.EnemyAI,
            t4.ActorType.GroupAnimalAI
        ];

        if (validTypes.includes(actor.typeInfo.typeName as t4.ActorType)) {
            return true;
        }
        return false;
    }

    createController(actor: t4.CActor) {
        return new KeyboardInputTestController(actor);
    }
};

ModMan.registerActorMod(KeyboardInputTestMod);
