import './mod_mgr';
import * as m from '../utils/math';

global.vec2f = m.vec2f;
global.vec3f = m.vec3f;
global.vec4f = m.vec4f;
// i32 === f32 in JS so... Might as well
global.vec2i = m.vec2f;
global.vec3i = m.vec3f;
global.vec4i = m.vec4f;

global.quatf = m.quatf;
global.mat3f = m.mat3f;
global.mat4f = m.mat4f;

t4.compareGameObjects = function <T extends {}>(a: T | null, b: T | null) {
    if (!a || !b) return false;
    const hasPtr = a.hasOwnProperty('__obj_id');
    if (hasPtr != b.hasOwnProperty('__obj_id')) return false;
    if (!hasPtr) return false;
    return (a as any).__obj_id === (b as any).__obj_id;
};

t4.getGameObjectId = function <T extends {}>(a: T | null) {
    if (!a) return null;
    const hasPtr = a.hasOwnProperty('__obj_id');
    if (!hasPtr) return null;
    return (a as any).__obj_id;
};

t4.refreshGameObject = function(a: any) {
    if (!a) return;
    const hasPtr = a.hasOwnProperty('__refresh');
    if (!hasPtr) return;
    
    if ((typeof a.__refresh) !== 'function') return;
    a.__refresh();
};

(t4 as any).DefaultLevelActorName = '[Level]';

(t4.ActorType as any) = {
    Actor: 'Actor',
    Camera: 'Camera',
    SpawnPoint: 'SpawnPoint',
    MPPickup: 'MPPickup',
    DMPlayer: 'DMPlayer',
    CompyPlayer: 'CompyPlayer',
    BagActor: 'BagActor',
    Player: 'Player',
    DeadPlayer: 'DeadPlayer',
    Steracosaur: 'Steracosaur',
    AlarmBox: 'AlarmBox',
    AnimalAI: 'AnimalAI',
    AquaticAI: 'AquaticAI',
    AquaticIndigenousAI: 'AquaticIndigenousAI',
    BulletAI: 'BulletAI',
    DeviceAI: 'DeviceAI',
    EnemyAI: 'EnemyAI',
    FlyingIndigenousAI: 'FlyingIndigenousAI',
    GroupAnimalAI: 'GroupAnimalAI',
    HumanAI: 'HumanAI',
    IndigenousAI: 'IndigenousAI',
    MountAI: 'MountAI',
    PlesiosaurAI: 'PlesiosaurAI',
    RaiderAI: 'RaiderAI',
    RidingRaptorAI: 'RidingRaptorAI',
    SwayingTreeAI: 'SwayingTreeAI',
    TestEnemyAI: 'TestEnemyAI',
    TRexAI: 'TRexAI',
    BowObject: 'BowObject',
    CoverObject: 'CoverObject',
    DarkMatterObject: 'DarkMatterObject',
    GeneratorObject: 'GeneratorObject',
    GuidedDeviceObject: 'GuidedDeviceObject',
    LevelExitObject: 'LevelExitObject',
    MPGeneratorObject: 'MPGeneratorObject',
    NapalmGelObject: 'NapalmGelObject',
    SpikedMineObject: 'SpikedMineObject',
    TurretObject: 'TurretObject',
    WarClubObject: 'WarClubObject',
    AITarget: 'AITarget',
    RCDevice: 'RCDevice',
    EnemyWeapon: 'EnemyWeapon',
    EnemyAccessory: 'EnemyAccessory',
    AIMarker: 'AIMarker',
    FallDeathRegion: 'FallDeathRegion',
    WeaponWheel: 'WeaponWheel',
    Flag: 'Flag',
    Door: 'Door',
    Shotgun: 'Shotgun',
    SuperShotgun: 'SuperShotgun',
    DarkMatterCube: 'DarkMatterCube',
    RocketLauncher: 'RocketLauncher',
    Minigun: 'MiniGun',
    TekBow: 'TekBow',
    CrossBow: 'CrossBow',
    Flamethrower: 'FlameThrower',
    DinoBite: 'DinoBite',
    GuidedDevice: 'GuidedDevice',
    SpikedMine: 'SpikedMine',
    SniperPistol: 'SniperPistol',
    StackManager: 'StackManager',
    Stackable: 'Stackable',
    TurokPickup: 'TurokPickup',
    Rocket3Actor: 'Rocket3Actor',
    SmartBullet: 'SmartBullet',
    RocketPteranadon: 'RocketPteranadon',
    Skybox: 'Sky',
    Lock2D: 'Lock2D',
    tekWeapon: 'TekWeapon',
    GravityDisruptor: 'GravityDisruptor',
    SwarmBore: 'SwarmBore',
    GameModeInfo: 'GameModeInfo',
    CinemaCameraAttractor: 'CinemaCameraAttractor',
    EmpathyBlast: 'EmpathyBlast'
};