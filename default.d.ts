declare function event_poll(): boolean;


declare const console : {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};

type TimeoutID = u32;
type IntervalID = u32;

/** forgive my non-standard definition of `require` */
declare function require(path: string, doReload?: boolean): any;
declare function setTimeout(callback: () => void, delayMS: number): TimeoutID;
declare function setInterval(callback: () => void, intervalMS: number): IntervalID;
declare function clearTimeout(id: TimeoutID);
declare function clearInterval(id: IntervalID);

declare const global : any;

interface Mod {
    onInitialize?(): void;
    onShutdown?(): void;
}

interface GlobalMod extends Mod {
    onActorCreated?(actor: t4.CActor): void;
    onActorDestroy?(actor: t4.CActor): void;
    onLevelCreate?(level: t4.CLevel): void;
    onLevelSpawn?(level: t4.CLevel): void;
    onLevelDestroy?(level: t4.CLevel): void;
    onKeyboardInput?(event: t4.KeyboardEvent): void;
    onUpdate?(deltaTime: f32): void;
    onRender?(deltaTime: f32): void;
}

interface ActorController {
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
}

interface ActorMod extends Mod {
    actorSelector(actor: t4.CActor) : boolean; 
    createController(actor: t4.CActor) : ActorController;
}

declare class ModDataCache {
    /**
     * Mod data must be serializable without loss of information,
     * so no functions can be present, or anything like that...
     * 
     * Just plain old data
     */
    setItem(field: string, data: any): void;
    getItem<T>(field: string, defaultValue: T) : T;
    getItem(field: string) : any | null;
}

interface GlobalModConstructor {
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
}

interface ActorModConstructor {
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
}

declare class ModManager {
    registerGlobalMod(mod: GlobalModConstructor): void;
    registerActorMod(mod: ActorModConstructor): void;
}

declare class vec2f {
    public x: f32;
    public y: f32;

    constructor(x: f32, y: f32);
    add(rhs: vec2f) : vec2f;
    static From(basic: basic_vec2f) : vec2f;
}

declare class vec3f {
    public x: f32;
    public y: f32;
    public z: f32;

    constructor(x: f32, y: f32, z: f32);
    add(rhs: basic_vec3f) : vec3f;
    static From(basic: basic_vec3f) : vec3f;
}

declare class vec4f {
    public x: f32;
    public y: f32;
    public z: f32;
    public w: f32;

    constructor(x: f32, y: f32, z: f32, w: f32);
    add(rhs: basic_vec4f) : vec4f;
    static From(basic: basic_vec4f) : vec4f;
}

declare class quatf {
    public axis: vec3f;
    public angle: f32;

    constructor(axis: vec3f, angle: f32);
    static From(basic: basic_quatf) : quatf;
}

declare class mat3f {
    public x: vec3f;
    public y: vec3f;
    public z: vec3f;

    constructor();
    constructor(x: vec3f, y: vec3f, z: vec3f);
    static From(basic: basic_mat3f) : mat3f;
}

declare class mat4f {
    public x: vec4f;
    public y: vec4f;
    public z: vec4f;
    public w: vec4f;

    constructor();
    constructor(x: vec4f, y: vec4f, z: vec4f, w: vec4f);
    static From(basic: basic_mat4f) : mat3f;
}

declare class vec2i {
    public x: i32;
    public y: i32;

    constructor(x: i32, y: i32);
}

declare class vec3i {
    public x: i32;
    public y: i32;
    public z: i32;

    constructor(x: i32, y: i32, z: i32);
}

declare class vec4i {
    public x: i32;
    public y: i32;
    public z: i32;
    public w: i32;

    constructor(x: i32, y: i32, z: i32, w: i32);
}

declare namespace t4 {
    /** Number of seconds that has elapsed since the game started */
    const elapsedTime: f32;

    /** Path to the game, where Turok4.exe is located */
    const gameDirectory: string;

    /** Path to the script directory, this file is located */
    const scriptDirectory: string;

    /**
     * Compares any two game objects (CActor, CLevel, etc...)
     * to determine if they are equal. This relies on comparing
     * the value of the internal pointer that's given to game
     * objects when they're passed to v8
     * 
     * @param objA The first object
     * @param objB The second object
     * @returns `true`, if the objects are equal
     */
    function compareGameObjects<T extends {}>(objA: T | null, objB: T | null): boolean;

    /**
     * Gets the internal ID of any game object (CActor, CLevel, etc...)
     * 
     * @param objA The object
     * @returns a positive integer, if the provided object is from the game itself
     */
    function getGameObjectId(objA: t4.CActor): u32;
    function getGameObjectId(objA: t4.CLevel): u32;
    function getGameObjectId(objA: t4.CGame): u32;
    function getGameObjectId(objA: t4.CActorTypeInfo): u32;
    function getGameObjectId(objA: t4.CPhysicsInfo): u32;
    function getGameObjectId<T extends {}>(objA: T | null): u32 | null;

    /**
     * When game objects are converted to script objects, we lose the ability to efficiently
     * look up the actual current values of the fields in realtime. For some fields where it's
     * important to only get current values that behavior is enabled, but otherwise you will
     * have to manually "refresh" the game objects to get the current values. This should be
     * avoided until it's strictly necessary.
     */
    function refreshGameObject(obj: any);

    const DefaultLevelActorName: '[Level]';

    enum ActorType {
        Actor = 'Actor',
        Camera = 'Camera',
        SpawnPoint = 'SpawnPoint',
        MPPickup = 'MPPickup',
        DMPlayer = 'DMPlayer',
        CompyPlayer = 'CompyPlayer',
        BagActor = 'BagActor',
        Player = 'Player',
        DeadPlayer = 'DeadPlayer',
        Steracosaur = 'Steracosaur',
        AlarmBox = 'AlarmBox',
        AnimalAI = 'AnimalAI',
        AquaticAI = 'AquaticAI',
        AquaticIndigenousAI = 'AquaticIndigenousAI',
        BulletAI = 'BulletAI',
        DeviceAI = 'DeviceAI',
        EnemyAI = 'EnemyAI',
        FlyingIndigenousAI = 'FlyingIndigenousAI',
        GroupAnimalAI = 'GroupAnimalAI',
        HumanAI = 'HumanAI',
        IndigenousAI = 'IndigenousAI',
        MountAI = 'MountAI',
        PlesiosaurAI = 'PlesiosaurAI',
        RaiderAI = 'RaiderAI',
        RidingRaptorAI = 'RidingRaptorAI',
        SwayingTreeAI = 'SwayingTreeAI',
        TestEnemyAI = 'TestEnemyAI',
        TRexAI = 'TRexAI',
        BowObject = 'BowObject',
        CoverObject = 'CoverObject',
        DarkMatterObject = 'DarkMatterObject',
        GeneratorObject = 'GeneratorObject',
        GuidedDeviceObject = 'GuidedDeviceObject',
        LevelExitObject = 'LevelExitObject',
        MPGeneratorObject = 'MPGeneratorObject',
        NapalmGelObject = 'NapalmGelObject',
        SpikedMineObject = 'SpikedMineObject',
        TurretObject = 'TurretObject',
        WarClubObject = 'WarClubObject',
        AITarget = 'AITarget',
        RCDevice = 'RCDevice',
        EnemyWeapon = 'EnemyWeapon',
        EnemyAccessory = 'EnemyAccessory',
        AIMarker = 'AIMarker',
        FallDeathRegion = 'FallDeathRegion',
        WeaponWheel = 'WeaponWheel',
        Flag = 'Flag',
        Door = 'Door',
        Shotgun = 'Shotgun',
        SuperShotgun = 'SuperShotgun',
        DarkMatterCube = 'DarkMatterCube',
        RocketLauncher = 'RocketLauncher',
        Minigun = 'MiniGun',
        TekBow = 'TekBow',
        CrossBow = 'CrossBow',
        Flamethrower = 'FlameThrower',
        DinoBite = 'DinoBite',
        GuidedDevice = 'GuidedDevice',
        SpikedMine = 'SpikedMine',
        SniperPistol = 'SniperPistol',
        StackManager = 'StackManager',
        Stackable = 'Stackable',
        TurokPickup = 'TurokPickup',
        Rocket3Actor = 'Rocket3Actor',
        SmartBullet = 'SmartBullet',
        RocketPteranadon = 'RocketPteranadon',
        Skybox = 'Sky',
        Lock2D = 'Lock2D',
        tekWeapon = 'TekWeapon',
        GravityDisruptor = 'GravityDisruptor',
        SwarmBore = 'SwarmBore',
        GameModeInfo = 'GameModeInfo',
        CinemaCameraAttractor = 'CinemaCameraAttractor',
        EmpathyBlast = 'EmpathyBlast'
    }
}