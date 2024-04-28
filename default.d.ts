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