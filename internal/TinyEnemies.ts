import { GlobalMod, ModMan } from '../internal/mod_mgr';

type Listener = {
    level: t4.CLevel;
    listenerId: u32;
};

class TinyEnemiesMod implements GlobalMod {
    private listeners: Listener[];
    constructor() {
        this.listeners = [];
    }

    onLevelCreate(level: t4.CLevel): void {
        this.listeners.push({
            level,
            listenerId: level.addActorAddedListener(this.onActorAdded.bind(this))
        });
    }

    onLevelDestroy(level: t4.CLevel): void {
        this.listeners = this.listeners.filter(l => {
            if (t4.compareGameObjects(l.level, level)) {
                l.level.removeActorAddedListener(l.listenerId);
                return false;
            }

            return true;
        });
    }

    onShutdown(): void {
        this.listeners.forEach(l => {
            l.level.removeActorAddedListener(l.listenerId);
        });
        this.listeners = [];
    }

    onActorAdded(actor: t4.CActor) {
        if (!actor.typeInfo || !actor.typeInfo.typeName) return;
        
        // This mod applies to humanoids, enemies, some animals
        const validTypes = [
            t4.ActorType.HumanAI,
            t4.ActorType.AnimalAI,
            t4.ActorType.EnemyAI,
            t4.ActorType.GroupAnimalAI,
            t4.ActorType.IndigenousAI
        ];

        if (!validTypes.includes(actor.typeInfo.typeName as t4.ActorType)) return;

        const scale = actor.scale;
        actor.setScale({
            x: scale.x * 0.35,
            y: scale.y * 0.35,
            z: scale.z * 0.35
        });
    }
};

ModMan.registerGlobalMod(TinyEnemiesMod);
