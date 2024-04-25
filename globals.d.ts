type char = number | string;
type i8 = number;
type i16 = number;
type i32 = number;
type i64 = number;
type u8 = number;
type u16 = number;
type u32 = number;
type u64 = number;
type f32 = number;
type f64 = number;

/**
 * @size 0x8 (8 bytes)
 */
interface basic_vec2f {
    /**
     * @offset 0x0 (0 bytes)
     * @size 0x4 (4 bytes)
     */
    x: f32;
    
    /**
     * @offset 0x4 (4 bytes)
     * @size 0x4 (4 bytes)
     */
    y: f32;
}

/**
 * @size 0xC (12 bytes)
 */
interface basic_vec3f {
    /**
     * @offset 0x0 (0 bytes)
     * @size 0x4 (4 bytes)
     */
    x: f32;
    
    /**
     * @offset 0x4 (4 bytes)
     * @size 0x4 (4 bytes)
     */
    y: f32;
    
    /**
     * @offset 0x8 (8 bytes)
     * @size 0x4 (4 bytes)
     */
    z: f32;
}

/**
 * @size 0x10 (16 bytes)
 */
interface basic_vec4f {
    /**
     * @offset 0x0 (0 bytes)
     * @size 0x4 (4 bytes)
     */
    x: f32;
    
    /**
     * @offset 0x4 (4 bytes)
     * @size 0x4 (4 bytes)
     */
    y: f32;
    
    /**
     * @offset 0x8 (8 bytes)
     * @size 0x4 (4 bytes)
     */
    z: f32;
    
    /**
     * @offset 0xC (12 bytes)
     * @size 0x4 (4 bytes)
     */
    w: f32;
}

/**
 * @size 0x10 (16 bytes)
 */
interface basic_quatf {
    /**
     * @offset 0x0 (0 bytes)
     * @size 0xC (12 bytes)
     */
    axis: basic_vec3f;
    
    /**
     * @offset 0xC (12 bytes)
     * @size 0x4 (4 bytes)
     */
    angle: f32;
}

/**
 * @size 0x8 (8 bytes)
 */
interface basic_vec2i {
    /**
     * @offset 0x0 (0 bytes)
     * @size 0x4 (4 bytes)
     */
    x: i32;
    
    /**
     * @offset 0x4 (4 bytes)
     * @size 0x4 (4 bytes)
     */
    y: i32;
}

/**
 * @size 0xC (12 bytes)
 */
interface basic_vec3i {
    /**
     * @offset 0x0 (0 bytes)
     * @size 0x4 (4 bytes)
     */
    x: i32;
    
    /**
     * @offset 0x4 (4 bytes)
     * @size 0x4 (4 bytes)
     */
    y: i32;
    
    /**
     * @offset 0x8 (8 bytes)
     * @size 0x4 (4 bytes)
     */
    z: i32;
}

/**
 * @size 0x10 (16 bytes)
 */
interface basic_vec4i {
    /**
     * @offset 0x0 (0 bytes)
     * @size 0x4 (4 bytes)
     */
    x: i32;
    
    /**
     * @offset 0x4 (4 bytes)
     * @size 0x4 (4 bytes)
     */
    y: i32;
    
    /**
     * @offset 0x8 (8 bytes)
     * @size 0x4 (4 bytes)
     */
    z: i32;
    
    /**
     * @offset 0xC (12 bytes)
     * @size 0x4 (4 bytes)
     */
    w: i32;
}

/**
 * @size 0x24 (36 bytes)
 */
interface basic_mat3f {
    /**
     * @offset 0x0 (0 bytes)
     * @size 0xC (12 bytes)
     */
    x: basic_vec3f;
    
    /**
     * @offset 0xC (12 bytes)
     * @size 0xC (12 bytes)
     */
    y: basic_vec3f;
    
    /**
     * @offset 0x18 (24 bytes)
     * @size 0xC (12 bytes)
     */
    z: basic_vec3f;
}

/**
 * @size 0x40 (64 bytes)
 */
interface basic_mat4f {
    /**
     * @offset 0x0 (0 bytes)
     * @size 0x10 (16 bytes)
     */
    x: basic_vec4f;
    
    /**
     * @offset 0x10 (16 bytes)
     * @size 0x10 (16 bytes)
     */
    y: basic_vec4f;
    
    /**
     * @offset 0x20 (32 bytes)
     * @size 0x10 (16 bytes)
     */
    z: basic_vec4f;
    
    /**
     * @offset 0x30 (48 bytes)
     * @size 0x10 (16 bytes)
     */
    w: basic_vec4f;
}
declare namespace fs {
    /**
     * @size 0x28 (40 bytes)
     */
    class Buffer {
        /**
         * @address 0x56811ACD
         */
        readUInt8(): u8;
        /**
         * @address 0x56814EC1
         */
        writeUInt8(value: u8): u8;
        /**
         * @address 0x56815015
         */
        readUInt16(): u16;
        /**
         * @address 0x56813AD0
         */
        writeUInt16(value: u16): u16;
        /**
         * @address 0x5681268F
         */
        readUInt32(): u32;
        /**
         * @address 0x56817D47
         */
        writeUInt32(value: u32): u32;
        /**
         * @address 0x56813B93
         */
        readUInt64(): u64;
        /**
         * @address 0x56811C3F
         */
        writeUInt64(value: u64): u64;
        /**
         * @address 0x56818CD8
         */
        readInt8(): i8;
        /**
         * @address 0x56814ACA
         */
        writeInt8(value: i8): i8;
        /**
         * @address 0x568165A0
         */
        readInt16(): i16;
        /**
         * @address 0x568122F2
         */
        writeInt16(value: i16): i16;
        /**
         * @address 0x56812DF6
         */
        readInt32(): i32;
        /**
         * @address 0x5681707C
         */
        writeInt32(value: i32): i32;
        /**
         * @address 0x56819287
         */
        readInt64(): i64;
        /**
         * @address 0x5681833C
         */
        writeInt64(value: i64): i64;
        /**
         * @address 0x568186F2
         */
        readFloat32(): f32;
        /**
         * @address 0x56815574
         */
        writeFloat32(value: f32): f32;
        /**
         * @address 0x56819241
         */
        readFloat64(): f64;
        /**
         * @address 0x56817063
         */
        writeFloat64(value: f64): f64;
        /**
         * @address 0x568116BD
         */
        getPosition(): u64;
        /**
         * @address 0x568151FA
         */
        getSize(): u64;
        /**
         * @address 0x56817AE0
         */
        getCapacity(): u64;
        /**
         * @address 0x56814151
         */
        getRemaining(): u64;
        /**
         * @address 0x56813409
         */
        isAtEnd(): boolean;
        /**
         * @address 0x56813E40
         */
        seek(offsetFromStart: u64): void;
        /**
         * @address 0x56817284
         */
        subBuffer(size: u64): Buffer;
        /**
         * @address 0x56811DA7
         */
        readNullTerminatedString(): string;
        /**
         * @address 0x56811532
         */
        readString(length: u32): string;
        /**
         * @address 0x56817C2F
         */
        writeString(str: string): boolean;
        /**
         * @address 0x56811D2F
         */
        saveToFile(path: string): boolean;
    }
    
    /**
     * @size 0x18 (24 bytes)
     */
    class FileStatus {
        /**
         * @offset 0x0 (0 bytes)
         * @size 0x4 (4 bytes)
         */
        type: FileType;
        
        /**
         * @offset 0x8 (8 bytes)
         * @size 0x8 (8 bytes)
         */
        size: u64;
        
        /**
         * @offset 0x10 (16 bytes)
         * @size 0x8 (8 bytes)
         */
        lastWriteTime: u64;
    }
    
    enum FileType {
        Unknown = 0,
        File = 1,
        Directory = 2,
        Pipe = 3,
        Socket = 4,
        CharacterDevice = 5,
        BlockDevice = 6,
        SymLink = 7
    }
    
    /**
     * @size 0x28 (40 bytes)
     */
    class DirectoryEntry {
        /**
         * @offset 0x0 (0 bytes)
         * @size 0x4 (4 bytes)
         */
        path: string;
        
        /**
         * @offset 0x4 (4 bytes)
         * @size 0x4 (4 bytes)
         */
        name: string;
        
        /**
         * @offset 0x8 (8 bytes)
         * @size 0x4 (4 bytes)
         */
        extension: string | null;
        
        /**
         * @offset 0x10 (16 bytes)
         * @size 0x18 (24 bytes)
         */
        status: FileStatus;
    }
    
    enum OpenMode {
        Text = 0,
        Binary = 1
    }
    
    /**
     * @address 0x569D8CF0
     */
    function bufferFromFile(filePath: string, param_2: OpenMode): Buffer | null;
    /**
     * @address 0x569D8DC0
     */
    function createBuffer(capacity: u32): Buffer;
    /**
     * @address 0x569D8E40
     */
    function destroyBuffer(buffer: Buffer): void;
    /**
     * @address 0x56818729
     */
    function listDirectoryEntries(dirPath: string): DirectoryEntry[] | null;
    /**
     * @address 0x569D9110
     */
    function stat(path: string): FileStatus | null;
    /**
     * @address 0x569D9460
     */
    function relativePath(inputPath: string, relativeTo: string): string | null;
    /**
     * @address 0x569D95F0
     */
    function createDirectory(path: string): boolean;
    /**
     * @address 0x569D9780
     */
    function exists(path: string): boolean;
}
declare namespace t4 {
    /**
     * @size 0x1258 (4696 bytes)
     */
    class CGame {
        /**
         * @offset 0x4C (76 bytes)
         * @size 0x4 (4 bytes)
         */
        levelPath: string | null;
        /**
         * @address 0x56816F00
         */
        getCurrentLevel(): CLevel;
        /**
         * @address 0x56812DEC
         */
        getLevels(): CLevel[];
        /**
         * @address 0x5681272F
         */
        addUpdateListener(param_1: () => void): u32;
        /**
         * @address 0x568189CC
         */
        removeUpdateListener(param_1: u32): void;
        /**
         * @address 0x568159D9
         */
        addRenderListener(param_1: () => void): u32;
        /**
         * @address 0x56815173
         */
        removeRenderListener(param_1: u32): void;
        /**
         * @address 0x5681425A
         */
        addActorCreateListener(param_1: (param_0: CActor) => void): u32;
        /**
         * @address 0x56818B07
         */
        removeActorCreateListener(param_1: u32): void;
        /**
         * @address 0x56816EFB
         */
        addActorDestroyListener(param_1: (param_0: CActor) => void): u32;
        /**
         * @address 0x56817554
         */
        removeActorDestroyListener(param_1: u32): void;
        /**
         * @address 0x56818265
         */
        addLevelCreateListener(param_1: (param_0: CLevel) => void): u32;
        /**
         * @address 0x56816082
         */
        removeLevelCreateListener(param_1: u32): void;
        /**
         * @address 0x56811767
         */
        addLevelDestroyListener(param_1: (param_0: CLevel) => void): u32;
        /**
         * @address 0x56813C6A
         */
        removeLevelDestroyListener(param_1: u32): void;
        /**
         * @address 0x56817676
         */
        addLevelSpawnListener(param_1: (param_0: CLevel) => void): u32;
        /**
         * @address 0x56811D52
         */
        removeLevelSpawnListener(param_1: u32): void;
        /**
         * @address 0x56812630
         */
        disableInput(): void;
        /**
         * @address 0x56813E3B
         */
        enableInput(): void;
    }
    
    /**
     * @size 0x2F0 (752 bytes)
     */
    class CLevel {
        /**
         * @offset 0x24 (36 bytes)
         * @size 0x74 (116 bytes)
         */
        readonly info: UnkLevelInfo;
        
        /**
         * @offset 0x130 (304 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly levelActor: CActor | null;
        /**
         * @address 0x56818981
         */
        spawnActor(param_1: i32, param_2: string, param_3: string, param_4: basic_vec3f, param_5: i32): CActor;
        /**
         * @address 0x56818521
         */
        getCameras(): CCamera[];
        /**
         * @address 0x5681388C
         */
        addActorAddedListener(listener: (param_0: CActor) => void): u32;
        /**
         * @address 0x5681801C
         */
        removeActorAddedListener(listenerId: u32): void;
    }
    
    /**
     * @size 0x234 (564 bytes)
     */
    class CActor {
        /**
         * @offset 0x1E (30 bytes)
         * @size 0x1 (1 bytes)
         */
        isEnabled: boolean;
        
        /**
         * @offset 0x23 (35 bytes)
         * @size 0x1 (1 bytes)
         */
        actorFlags: u8;
        
        /**
         * @offset 0x24 (36 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly type: u32;
        
        /**
         * @offset 0x30 (48 bytes)
         * @size 0x4 (4 bytes)
         */
        unknownFlags0: u32;
        
        /**
         * @offset 0x34 (52 bytes)
         * @size 0x4 (4 bytes)
         */
        unknownFlags1: u32;
        
        /**
         * @offset 0x38 (56 bytes)
         * @size 0x10 (16 bytes)
         */
        readonly position: basic_vec4f;
        
        /**
         * @offset 0x48 (72 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly level: CLevel | null;
        
        /**
         * @offset 0x51 (81 bytes)
         * @size 0x1 (1 bytes)
         */
        nudge: u8;
        
        /**
         * @offset 0x5C (92 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly name: string | null;
        
        /**
         * @offset 0x7C (124 bytes)
         * @size 0xC (12 bytes)
         */
        readonly scale: basic_vec3f;
        
        /**
         * @offset 0x88 (136 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly geomFilePath: string | null;
        
        /**
         * @offset 0xDC (220 bytes)
         * @size 0x4 (4 bytes)
         */
        unknownFlag: u32;
        
        /**
         * @offset 0xE0 (224 bytes)
         * @size 0x10 (16 bytes)
         */
        readonly rotationQuat: basic_quatf;
        
        /**
         * @offset 0xF0 (240 bytes)
         * @size 0xC (12 bytes)
         */
        readonly rotationEuler: basic_vec3f;
        
        /**
         * @offset 0xFC (252 bytes)
         * @size 0x4 (4 bytes)
         */
        physics: CPhysicsInfo | null;
        
        /**
         * @offset 0x12C (300 bytes)
         * @size 0x4 (4 bytes)
         */
        mode: i32;
        
        /**
         * @offset 0x130 (304 bytes)
         * @size 0x40 (64 bytes)
         */
        transform: basic_mat4f;
        
        /**
         * @offset 0x170 (368 bytes)
         * @size 0x40 (64 bytes)
         */
        maybeInverseTransform: basic_mat4f;
        
        /**
         * @offset 0x1E4 (484 bytes)
         * @size 0x4 (4 bytes)
         */
        typeInfo: CActorTypeInfo | null;
        
        /**
         * @offset 0x204 (516 bytes)
         * @size 0x4 (4 bytes)
         */
        collisionFlags: u32;
        
        /**
         * @offset 0x208 (520 bytes)
         * @size 0x4 (4 bytes)
         */
        touches: u32;
        
        /**
         * @offset 0x210 (528 bytes)
         * @size 0x4 (4 bytes)
         */
        inputRelated: u32;
        /**
         * @address 0x568112EE
         */
        getNextActor(): CActor;
        /**
         * @address 0x568182BF
         */
        getPrevActor(): CActor;
        /**
         * @address 0x56814A57
         */
        setPosition(position: basic_vec3f): void;
        /**
         * @address 0x5681553D
         */
        setRotation(fromEulerAngles: basic_vec3f): void;
        /**
         * @address 0x568171CB
         */
        setScale(scale: basic_vec3f): void;
        /**
         * @address 0x56816E88
         */
        setVisibility(isVisible: boolean): void;
        /**
         * @address 0x56817E0A
         */
        isVisible(): boolean;
        /**
         * @address 0x56811366
         */
        addCollisionListener(whenCollidingWith: CActor | null, callback: (param_0: CActor, param_1: CActor) => void): u32;
        /**
         * @address 0x56815F3D
         */
        removeCollisionListener(listenerId: u32): void;
    }
    
    /**
     * @size 0x400 (1024 bytes)
     */
    class CCamera extends CActor {
        /**
         * @offset 0x240 (576 bytes)
         * @size 0x4 (4 bytes)
         */
        field13_0x240: f32;
        
        /**
         * @offset 0x244 (580 bytes)
         * @size 0x4 (4 bytes)
         */
        field14_0x244: f32;
        
        /**
         * @offset 0x24C (588 bytes)
         * @size 0x4 (4 bytes)
         */
        field19_0x24c: f32;
        
        /**
         * @offset 0x260 (608 bytes)
         * @size 0x4 (4 bytes)
         */
        field36_0x260: f32;
        
        /**
         * @offset 0x274 (628 bytes)
         * @size 0x4 (4 bytes)
         */
        field53_0x274: f32;
        
        /**
         * @offset 0x288 (648 bytes)
         * @size 0x4 (4 bytes)
         */
        field70_0x288: f32;
        
        /**
         * @offset 0x2E0 (736 bytes)
         * @size 0x4 (4 bytes)
         */
        field155_0x2e0: f32;
        
        /**
         * @offset 0x300 (768 bytes)
         * @size 0x4 (4 bytes)
         */
        field184_0x300: f32;
        
        /**
         * @offset 0x304 (772 bytes)
         * @size 0x4 (4 bytes)
         */
        field185_0x304: f32;
        
        /**
         * @offset 0x308 (776 bytes)
         * @size 0x4 (4 bytes)
         */
        field186_0x308: f32;
        
        /**
         * @offset 0x31C (796 bytes)
         * @size 0x4 (4 bytes)
         */
        field203_0x31c: f32;
        
        /**
         * @offset 0x320 (800 bytes)
         * @size 0x4 (4 bytes)
         */
        field204_0x320: f32;
        
        /**
         * @offset 0x324 (804 bytes)
         * @size 0x4 (4 bytes)
         */
        field205_0x324: f32;
        
        /**
         * @offset 0x328 (808 bytes)
         * @size 0x4 (4 bytes)
         */
        field206_0x328: f32;
        
        /**
         * @offset 0x3EC (1004 bytes)
         * @size 0x4 (4 bytes)
         */
        field399_0x3ec: f32;
    }
    
    /**
     * @size 0x3C (60 bytes)
     */
    class CPhysicsInfo {
        /**
         * @offset 0x0 (0 bytes)
         * @size 0x4 (4 bytes)
         */
        mass: f32;
        
        /**
         * @offset 0x4 (4 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0x4: f32;
        
        /**
         * @offset 0x8 (8 bytes)
         * @size 0x4 (4 bytes)
         */
        gravity: f32;
        
        /**
         * @offset 0xC (12 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0xC: f32;
        
        /**
         * @offset 0x10 (16 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0x10: f32;
        
        /**
         * @offset 0x14 (20 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0x14: f32;
        
        /**
         * @offset 0x18 (24 bytes)
         * @size 0xC (12 bytes)
         */
        readonly velocity: basic_vec3f;
        
        /**
         * @offset 0x24 (36 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0x24: f32;
        
        /**
         * @offset 0x28 (40 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0x28: f32;
        
        /**
         * @offset 0x2C (44 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0x2C: f32;
        
        /**
         * @offset 0x30 (48 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0x30: f32;
        
        /**
         * @offset 0x34 (52 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0x34: f32;
        
        /**
         * @offset 0x38 (56 bytes)
         * @size 0x4 (4 bytes)
         */
        field_0x38: f32;
    }
    
    /**
     * @size 0xE0 (224 bytes)
     */
    class CActorTypeInfo {
        /**
         * @offset 0x4 (4 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly actorPath: string | null;
        
        /**
         * @offset 0x8 (8 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly geomPath: string | null;
        
        /**
         * @offset 0xC (12 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly typeName: string | null;
        
        /**
         * @offset 0xD8 (216 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly activeCount: i32;
    }
    
    /**
     * @size 0x74 (116 bytes)
     */
    class UnkLevelInfo {
        /**
         * @offset 0x1C (28 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly actorPath: string | null;
        
        /**
         * @offset 0x4 (4 bytes)
         * @size 0x4 (4 bytes)
         */
        gravity: f32;
    }
    
    enum LogLevel {
        Info = 0,
        Warning = 1,
        Error = 2,
        Fatal = 3
    }
    
    /**
     * @size 0x18 (24 bytes)
     */
    class LogEvent {
        /**
         * @offset 0x14 (20 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly level: LogLevel;
        
        /**
         * @offset 0x10 (16 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly scope: string | null;
        
        /**
         * @offset 0xC (12 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly message: string | null;
    }
    
    enum Key {
        None = 0,
        Num0 = 11,
        Num1 = 2,
        Num2 = 3,
        Num3 = 4,
        Num4 = 5,
        Num5 = 6,
        Num6 = 7,
        Num7 = 8,
        Num8 = 9,
        Num9 = 10,
        A = 30,
        B = 48,
        C = 46,
        D = 32,
        E = 18,
        F = 33,
        G = 34,
        H = 35,
        I = 23,
        J = 36,
        K = 37,
        L = 38,
        M = 50,
        N = 49,
        O = 24,
        P = 25,
        Q = 16,
        R = 19,
        S = 31,
        T = 20,
        U = 22,
        V = 47,
        W = 17,
        X = 45,
        Y = 21,
        Z = 44,
        SingleQuote = 40,
        Backslash = 43,
        Comma = 51,
        Equal = 13,
        Backtick = 41,
        LeftBracket = 26,
        Minus = 12,
        Period = 52,
        RightBracket = 27,
        Semicolon = 39,
        Slash = 53,
        Backspace = 14,
        Delete = 339,
        End = 335,
        Enter = 28,
        Escape = 1,
        GraveAccent = 192,
        Home = 327,
        Insert = 338,
        Menu = 349,
        PageDown = 337,
        PageUp = 329,
        Pause = 69,
        Space = 57,
        Tab = 15,
        CapLock = 58,
        NumLock = 325,
        ScrollLock = 70,
        F1 = 59,
        F2 = 60,
        F3 = 61,
        F4 = 62,
        F5 = 63,
        F6 = 64,
        F7 = 65,
        F8 = 66,
        F9 = 67,
        F10 = 68,
        F11 = 87,
        F12 = 88,
        F13 = 100,
        F14 = 101,
        F15 = 102,
        F16 = 103,
        F17 = 104,
        F18 = 105,
        F19 = 106,
        F20 = 107,
        F21 = 108,
        F22 = 109,
        F23 = 110,
        F24 = 118,
        LeftAlt = 56,
        LeftControl = 29,
        LeftShift = 42,
        LeftSuper = 347,
        PrintScreen = 311,
        RightAlt = 312,
        RightControl = 285,
        RightShift = 54,
        RightSuper = 348,
        Down = 336,
        Left = 331,
        Right = 333,
        Up = 328,
        Numpad0 = 82,
        Numpad1 = 79,
        Numpad2 = 80,
        Numpad3 = 81,
        Numpad4 = 75,
        Numpad5 = 76,
        Numpad6 = 77,
        Numpad7 = 71,
        Numpad8 = 72,
        Numpad9 = 73,
        NumpadAdd = 78,
        NumpadDecimal = 83,
        NumpadDivide = 309,
        NumpadEnter = 284,
        NumpadEqual = 89,
        NumpadMultiply = 55,
        NumpadSubtract = 74
    }
    
    enum KeyState {
        Pressed = 0,
        Held = 1,
        Released = 2
    }
    
    /**
     * @size 0x14 (20 bytes)
     */
    class KeyboardEvent {
        /**
         * @offset 0xC (12 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly key: Key;
        
        /**
         * @offset 0x10 (16 bytes)
         * @size 0x4 (4 bytes)
         */
        readonly state: KeyState;
    }
    
    /**
     * @address 0x56813A5D
     */
    function getEngine(): CGame | null;
    /**
     * @address 0x56811244
     */
    function sleep(milliseconds: u32): void;
    /**
     * @address 0x56A07110
     */
    function addEngineCreateListener(listener: (param_0: CGame) => void): u32;
    /**
     * @address 0x56A07180
     */
    function removeEngineCreateListener(listenerId: u32): void;
    /**
     * @address 0x56A071E0
     */
    function getLiveActors(): CActor[];
    /**
     * @address 0x569CC590
     */
    function addLogListener(listener: (param_0: LogEvent) => void): u32;
    /**
     * @address 0x569CC600
     */
    function removeLogListener(listenerId: u32): void;
    /**
     * @address 0x569BDA60
     */
    function addKeyboardListener(listener: (param_0: KeyboardEvent) => void): u32;
    /**
     * @address 0x569BDAD0
     */
    function removeKeyboardListener(listenerId: u32): void;
}
declare namespace ImGui {
    enum Key {
        None = 0,
        Tab = 512,
        LeftArrow = 513,
        RightArrow = 514,
        UpArrow = 515,
        DownArrow = 516,
        PageUp = 517,
        PageDown = 518,
        Home = 519,
        End = 520,
        Insert = 521,
        Delete = 522,
        Backspace = 523,
        Space = 524,
        Enter = 525,
        Escape = 526,
        LeftCtrl = 527,
        LeftShift = 528,
        LeftAlt = 529,
        LeftSuper = 530,
        RightCtrl = 531,
        RightShift = 532,
        RightAlt = 533,
        RightSuper = 534,
        Menu = 535,
        Num0 = 536,
        Num1 = 537,
        Num2 = 538,
        Num3 = 539,
        Num4 = 540,
        Num5 = 541,
        Num6 = 542,
        Num7 = 543,
        Num8 = 544,
        Num9 = 545,
        A = 546,
        B = 547,
        C = 548,
        D = 549,
        E = 550,
        F = 551,
        G = 552,
        H = 553,
        I = 554,
        J = 555,
        K = 556,
        L = 557,
        M = 558,
        N = 559,
        O = 560,
        P = 561,
        Q = 562,
        R = 563,
        S = 564,
        T = 565,
        U = 566,
        V = 567,
        W = 568,
        X = 569,
        Y = 570,
        Z = 571,
        F1 = 572,
        F2 = 573,
        F3 = 574,
        F4 = 575,
        F5 = 576,
        F6 = 577,
        F7 = 578,
        F8 = 579,
        F9 = 580,
        F10 = 581,
        F11 = 582,
        F12 = 583,
        F13 = 584,
        F14 = 585,
        F15 = 586,
        F16 = 587,
        F17 = 588,
        F18 = 589,
        F19 = 590,
        F20 = 591,
        F21 = 592,
        F22 = 593,
        F23 = 594,
        F24 = 595,
        Apostrophe = 596,
        Comma = 597,
        Minus = 598,
        Period = 599,
        Slash = 600,
        Semicolon = 601,
        Equal = 602,
        LeftBracket = 603,
        Backslash = 604,
        RightBracket = 605,
        GraveAccent = 606,
        CapsLock = 607,
        ScrollLock = 608,
        NumLock = 609,
        PrintScreen = 610,
        Pause = 611,
        Keypad0 = 612,
        Keypad1 = 613,
        Keypad2 = 614,
        Keypad3 = 615,
        Keypad4 = 616,
        Keypad5 = 617,
        Keypad6 = 618,
        Keypad7 = 619,
        Keypad8 = 620,
        Keypad9 = 621,
        KeypadDecimal = 622,
        KeypadDivide = 623,
        KeypadMultiply = 624,
        KeypadSubtract = 625,
        KeypadAdd = 626,
        KeypadEnter = 627,
        KeypadEqual = 628,
        AppBack = 629,
        AppForward = 630,
        GamepadStart = 631,
        GamepadBack = 632,
        GamepadFaceLeft = 633,
        GamepadFaceRight = 634,
        GamepadFaceUp = 635,
        GamepadFaceDown = 636,
        GamepadDpadLeft = 637,
        GamepadDpadRight = 638,
        GamepadDpadUp = 639,
        GamepadDpadDown = 640,
        GamepadL1 = 641,
        GamepadR1 = 642,
        GamepadL2 = 643,
        GamepadR2 = 644,
        GamepadL3 = 645,
        GamepadR3 = 646,
        GamepadLStickLeft = 647,
        GamepadLStickRight = 648,
        GamepadLStickUp = 649,
        GamepadLStickDown = 650,
        GamepadRStickLeft = 651,
        GamepadRStickRight = 652,
        GamepadRStickUp = 653,
        GamepadRStickDown = 654,
        MouseLeft = 655,
        MouseRight = 656,
        MouseMiddle = 657,
        MouseX1 = 658,
        MouseX2 = 659,
        MouseWheelX = 660,
        MouseWheelY = 661,
        ReservedForModCtrl = 662,
        ReservedForModShift = 663,
        ReservedForModAlt = 664,
        ReservedForModSuper = 665,
        Ctrl = 4096,
        Shift = 8192,
        Alt = 16384,
        Super = 32768,
        Shortcut = 2048,
        Mask_ = 63488,
        ModCtrl = 4096,
        ModShift = 8192,
        ModAlt = 16384,
        ModSuper = 32768
    }
    
    enum MouseSource {
        Mouse = 0,
        TouchScreen = 1,
        Pen = 2
    }
    
    enum Color {
        Text = 0,
        TextDisabled = 1,
        WindowBg = 2,
        ChildBg = 3,
        PopupBg = 4,
        Border = 5,
        BorderShadow = 6,
        FrameBg = 7,
        FrameBgHovered = 8,
        FrameBgActive = 9,
        TitleBg = 10,
        TitleBgActive = 11,
        TitleBgCollapsed = 12,
        MenuBarBg = 13,
        ScrollbarBg = 14,
        ScrollbarGrab = 15,
        ScrollbarGrabHovered = 16,
        ScrollbarGrabActive = 17,
        CheckMark = 18,
        SliderGrab = 19,
        SliderGrabActive = 20,
        Button = 21,
        ButtonHovered = 22,
        ButtonActive = 23,
        Header = 24,
        HeaderHovered = 25,
        HeaderActive = 26,
        Separator = 27,
        SeparatorHovered = 28,
        SeparatorActive = 29,
        ResizeGrip = 30,
        ResizeGripHovered = 31,
        ResizeGripActive = 32,
        Tab = 33,
        TabHovered = 34,
        TabActive = 35,
        TabUnfocused = 36,
        TabUnfocusedActive = 37,
        PlotLines = 40,
        PlotLinesHovered = 41,
        PlotHistogram = 42,
        PlotHistogramHovered = 43,
        TableHeaderBg = 44,
        TableBorderStrong = 45,
        TableBorderLight = 46,
        TableRowBg = 47,
        TableRowBgAlt = 48,
        TextSelectedBg = 49,
        DragDropTarget = 50,
        NavHighlight = 51,
        NavWindowingHighlight = 52,
        NavWindowingDimBg = 53,
        ModalWindowDimBg = 54
    }
    
    enum Condition {
        None = 0,
        Always = 1,
        Once = 2,
        FirstUseEver = 4,
        Appearing = 8
    }
    
    enum DataType {
        S8 = 0,
        U8 = 1,
        S16 = 2,
        U16 = 3,
        S32 = 4,
        U32 = 5,
        S64 = 6,
        U64 = 7,
        Float = 8,
        Double = 9
    }
    
    enum Direction {
        None = 4294967295,
        Left = 0,
        Right = 1,
        Up = 2,
        Down = 3
    }
    
    enum MouseButton {
        Left = 0,
        Right = 1,
        Middle = 2
    }
    
    enum MouseCursor {
        None = 4294967295,
        Arrow = 0,
        TextInput = 1,
        ResizeAll = 2,
        ResizeNS = 3,
        ResizeEW = 4,
        ResizeNESW = 5,
        ResizeNWSE = 6,
        Hand = 7,
        NotAllowed = 8
    }
    
    enum SortDirection {
        None = 0,
        Ascending = 1,
        Descending = 2
    }
    
    enum StyleVar {
        Alpha = 0,
        DisabledAlpha = 1,
        WindowPadding = 2,
        WindowRounding = 3,
        WindowBorderSize = 4,
        WindowMinSize = 5,
        WindowTitleAlign = 6,
        ChildRounding = 7,
        ChildBorderSize = 8,
        PopupRounding = 9,
        PopupBorderSize = 10,
        FramePadding = 11,
        FrameRounding = 12,
        FrameBorderSize = 13,
        ItemSpacing = 14,
        ItemInnerSpacing = 15,
        IndentSpacing = 16,
        CellPadding = 17,
        ScrollbarSize = 18,
        ScrollbarRounding = 19,
        GrabMinSize = 20,
        GrabRounding = 21,
        TabRounding = 22,
        TabBorderSize = 23,
        TabBarBorderSize = 24,
        TableAngledHeadersAngle = 25,
        ButtonTextAlign = 26,
        SelectableTextAlign = 27,
        SeparatorTextBorderSize = 28,
        SeparatorTextAlign = 29,
        SeparatorTextPadding = 30
    }
    
    enum TableBgTarget {
        None = 0,
        RowBg0 = 1,
        RowBg1 = 2,
        CellBg = 3
    }
    
    enum DrawFlags {
    }
    
    enum DrawListFlags {
    }
    
    enum FontAtlasFlags {
    }
    
    enum BackendFlags {
        None = 0,
        HasGamepad = 1,
        HasMouseCursors = 2,
        HasSetMousePos = 4,
        RendererHasVtxOffset = 8
    }
    
    enum ButtonFlags {
        None = 0,
        MouseButtonLeft = 1,
        MouseButtonRight = 2,
        MouseButtonMiddle = 4,
        MouseButtonMask_ = 7,
        MouseButtonDefault_ = 1
    }
    
    enum ChildFlags {
        None = 0,
        Border = 1,
        AlwaysUseWindowPadding = 2,
        ResizeX = 4,
        ResizeY = 8,
        AutoResizeX = 16,
        AutoResizeY = 32,
        AlwaysAutoResize = 64,
        FrameStyle = 128
    }
    
    enum ColorEditFlags {
        None = 0,
        NoAlpha = 2,
        NoPicker = 4,
        NoOptions = 8,
        NoSmallPreview = 16,
        NoInputs = 32,
        NoTooltip = 64,
        NoLabel = 128,
        NoSidePreview = 256,
        NoDragDrop = 512,
        NoBorder = 1024,
        AlphaBar = 65536,
        AlphaPreview = 131072,
        AlphaPreviewHalf = 262144,
        HDR = 524288,
        DisplayRGB = 1048576,
        DisplayHSV = 2097152,
        DisplayHex = 4194304,
        Uint8 = 8388608,
        Float = 16777216,
        PickerHueBar = 33554432,
        PickerHueWheel = 67108864,
        InputRGB = 134217728,
        InputHSV = 268435456,
        DefaultOptions_ = 177209344,
        DisplayMask_ = 7340032,
        DataTypeMask_ = 25165824,
        PickerMask_ = 100663296,
        InputMask_ = 402653184
    }
    
    enum ConfigFlags {
        None = 0,
        NavEnableKeyboard = 1,
        NavEnableGamepad = 2,
        NavEnableSetMousePos = 4,
        NavNoCaptureKeyboard = 8,
        NoMouse = 16,
        NoMouseCursorChange = 32,
        IsSRGB = 1048576,
        IsTouchScreen = 2097152
    }
    
    enum ComboFlags {
        None = 0,
        PopupAlignLeft = 1,
        HeightSmall = 2,
        HeightRegular = 4,
        HeightLarge = 8,
        HeightLargest = 16,
        NoArrowButton = 32,
        NoPreview = 64,
        WidthFitPreview = 128,
        HeightMask_ = 30
    }
    
    enum DragDropFlags {
        None = 0,
        SourceNoPreviewTooltip = 1,
        SourceNoDisableHover = 2,
        SourceNoHoldToOpenOthers = 4,
        SourceAllowNullID = 8,
        SourceExtern = 16,
        SourceAutoExpirePayload = 32,
        AcceptBeforeDelivery = 1024,
        AcceptNoDrawDefaultRect = 2048,
        AcceptNoPreviewTooltip = 4096,
        AcceptPeekOnly = 3072
    }
    
    enum FocusedFlags {
        None = 0,
        ChildWindows = 1,
        RootWindow = 2,
        AnyWindow = 4,
        NoPopupHierarchy = 8,
        RootAndChildWindows = 3
    }
    
    enum HoveredFlags {
        None = 0,
        ChildWindows = 1,
        RootWindow = 2,
        AnyWindow = 4,
        NoPopupHierarchy = 8,
        AllowWhenBlockedByPopup = 32,
        AllowWhenBlockedByActiveItem = 128,
        AllowWhenOverlappedByItem = 256,
        AllowWhenOverlappedByWindow = 512,
        AllowWhenDisabled = 1024,
        NoNavOverride = 2048,
        AllowWhenOverlapped = 768,
        RectOnly = 928,
        RootAndChildWindows = 3,
        ForTooltip = 4096,
        Stationary = 8192,
        DelayNone = 16384,
        DelayShort = 32768,
        DelayNormal = 65536,
        NoSharedDelay = 131072
    }
    
    enum InputTextFlags {
        None = 0,
        CharsDecimal = 1,
        CharsHexadecimal = 2,
        CharsUppercase = 4,
        CharsNoBlank = 8,
        AutoSelectAll = 16,
        EnterReturnsTrue = 32,
        CallbackCompletion = 64,
        CallbackHistory = 128,
        CallbackAlways = 256,
        CallbackCharFilter = 512,
        AllowTabInput = 1024,
        CtrlEnterForNewLine = 2048,
        NoHorizontalScroll = 4096,
        AlwaysOverwrite = 8192,
        ReadOnly = 16384,
        Password = 32768,
        NoUndoRedo = 65536,
        CharsScientific = 131072,
        CallbackResize = 262144,
        CallbackEdit = 524288,
        EscapeClearsAll = 1048576
    }
    
    enum PopupFlags {
        None = 0,
        MouseButtonLeft = 0,
        MouseButtonRight = 1,
        MouseButtonMiddle = 2,
        MouseButtonMask_ = 31,
        MouseButtonDefault_ = 1,
        NoReopen = 32,
        NoOpenOverExistingPopup = 128,
        NoOpenOverItems = 256,
        AnyPopupId = 1024,
        AnyPopupLevel = 2048,
        AnyPopup = 3072
    }
    
    enum SelectableFlags {
        None = 0,
        DontClosePopups = 1,
        SpanAllColumns = 2,
        AllowDoubleClick = 4,
        Disabled = 8,
        AllowOverlap = 16,
        AllowItemOverlap = 16
    }
    
    enum SliderFlags {
        None = 0,
        AlwaysClamp = 16,
        Logarithmic = 32,
        NoRoundToFormat = 64,
        NoInput = 128,
        InvalidMask_ = 1879048207
    }
    
    enum TabBarFlags {
        None = 0,
        Reorderable = 1,
        AutoSelectNewTabs = 2,
        TabListPopupButton = 4,
        NoCloseWithMiddleMouseButton = 8,
        NoTabListScrollingButtons = 16,
        NoTooltip = 32,
        FittingPolicyResizeDown = 64,
        FittingPolicyScroll = 128,
        FittingPolicyMask_ = 192,
        FittingPolicyDefault_ = 64
    }
    
    enum TabItemFlags {
        None = 0,
        UnsavedDocument = 1,
        SetSelected = 2,
        NoCloseWithMiddleMouseButton = 4,
        NoPushId = 8,
        NoTooltip = 16,
        NoReorder = 32,
        Leading = 64,
        Trailing = 128,
        NoAssumedClosure = 256
    }
    
    enum TableFlags {
        None = 0,
        Resizable = 1,
        Reorderable = 2,
        Hideable = 4,
        Sortable = 8,
        NoSavedSettings = 16,
        ContextMenuInBody = 32,
        RowBg = 64,
        BordersInnerH = 128,
        BordersOuterH = 256,
        BordersInnerV = 512,
        BordersOuterV = 1024,
        BordersH = 384,
        BordersV = 1536,
        BordersInner = 640,
        BordersOuter = 1280,
        Borders = 1920,
        NoBordersInBody = 2048,
        NoBordersInBodyUntilResize = 4096,
        SizingFixedFit = 8192,
        SizingFixedSame = 16384,
        SizingStretchProp = 24576,
        SizingStretchSame = 32768,
        NoHostExtendX = 65536,
        NoHostExtendY = 131072,
        NoKeepColumnsVisible = 262144,
        PreciseWidths = 524288,
        NoClip = 1048576,
        PadOuterX = 2097152,
        NoPadOuterX = 4194304,
        NoPadInnerX = 8388608,
        ScrollX = 16777216,
        ScrollY = 33554432,
        SortMulti = 67108864,
        SortTristate = 134217728,
        HighlightHoveredColumn = 268435456,
        SizingMask_ = 57344
    }
    
    enum TableColumnFlags {
        None = 0,
        Disabled = 1,
        DefaultHide = 2,
        DefaultSort = 4,
        WidthStretch = 8,
        WidthFixed = 16,
        NoResize = 32,
        NoReorder = 64,
        NoHide = 128,
        NoClip = 256,
        NoSort = 512,
        NoSortAscending = 1024,
        NoSortDescending = 2048,
        NoHeaderLabel = 4096,
        NoHeaderWidth = 8192,
        PreferSortAscending = 16384,
        PreferSortDescending = 32768,
        IndentEnable = 65536,
        IndentDisable = 131072,
        AngledHeader = 262144,
        IsEnabled = 16777216,
        IsVisible = 33554432,
        IsSorted = 67108864,
        IsHovered = 134217728,
        WidthMask_ = 24,
        IndentMask_ = 196608,
        StatusMask_ = 251658240,
        NoDirectResize_ = 1073741824
    }
    
    enum TableRowFlags {
        None = 0,
        Headers = 1
    }
    
    enum TreeNodeFlags {
        None = 0,
        Selected = 1,
        Framed = 2,
        AllowOverlap = 4,
        NoTreePushOnOpen = 8,
        NoAutoOpenOnLog = 16,
        DefaultOpen = 32,
        OpenOnDoubleClick = 64,
        OpenOnArrow = 128,
        Leaf = 256,
        Bullet = 512,
        FramePadding = 1024,
        SpanAvailWidth = 2048,
        SpanFullWidth = 4096,
        SpanAllColumns = 8192,
        NavLeftJumpsBackHere = 16384,
        CollapsingHeader = 26,
        AllowItemOverlap = 4
    }
    
    enum ViewportFlags {
    }
    
    enum WindowFlags {
        None = 0,
        NoTitleBar = 1,
        NoResize = 2,
        NoMove = 4,
        NoScrollbar = 8,
        NoScrollWithMouse = 16,
        NoCollapse = 32,
        AlwaysAutoResize = 64,
        NoBackground = 128,
        NoSavedSettings = 256,
        NoMouseInputs = 512,
        MenuBar = 1024,
        HorizontalScrollbar = 2048,
        NoFocusOnAppearing = 4096,
        NoBringToFrontOnFocus = 8192,
        AlwaysVerticalScrollbar = 16384,
        AlwaysHorizontalScrollbar = 32768,
        NoNavInputs = 65536,
        NoNavFocus = 131072,
        UnsavedDocument = 262144,
        NoNav = 196608,
        NoDecoration = 43,
        NoInputs = 197120,
        NavFlattened = 8388608,
        ChildWindow = 16777216,
        Tooltip = 33554432,
        Popup = 67108864,
        Modal = 134217728,
        ChildMenu = 268435456,
        AlwaysUseWindowPadding = 1073741824
    }
    
    enum NavInput {
        Activate = 0,
        Cancel = 1,
        Input = 2,
        Menu = 3,
        DpadLeft = 4,
        DpadRight = 5,
        DpadUp = 6,
        DpadDown = 7,
        LStickLeft = 8,
        LStickRight = 9,
        LStickUp = 10,
        LStickDown = 11,
        FocusPrev = 12,
        FocusNext = 13,
        TweakSlow = 14,
        TweakFast = 15
    }
    
    /**
     * @size 0x18 (24 bytes)
     */
    class ImDrawChannel {
    }
    
    /**
     * @size 0x28 (40 bytes)
     */
    class ImDrawCmd {
    }
    
    /**
     * @size 0x38 (56 bytes)
     */
    class ImDrawData {
    }
    
    /**
     * @size 0x90 (144 bytes)
     */
    class ImDrawList {
        /**
         * @address 0x5681800D
         */
        AddLine(p1: ImVec2, p2: ImVec2, color: u32, thickness: f32): void;
        /**
         * @address 0x568123E2
         */
        AddRect(min: ImVec2, max: ImVec2, color: u32, rounding: f32, flags: i32, thickness: f32): void;
        /**
         * @address 0x568143AE
         */
        AddRectFilled(min: ImVec2, max: ImVec2, color: u32, rounding: f32, flags: i32): void;
        /**
         * @address 0x568181E8
         */
        AddRectFilledMultiColor(min: ImVec2, max: ImVec2, colorUpperLeft: u32, colorUpperRight: u32, colorBottomRight: u32, colorBottomLeft: u32): void;
        /**
         * @address 0x56816B63
         */
        AddQuad(p1: ImVec2, p2: ImVec2, p3: ImVec2, p4: ImVec2, color: u32, thickness: f32): void;
        /**
         * @address 0x568154BB
         */
        AddQuadFilled(p1: ImVec2, p2: ImVec2, p3: ImVec2, p4: ImVec2, color: u32): void;
        /**
         * @address 0x56813747
         */
        AddTriangle(p1: ImVec2, p2: ImVec2, p3: ImVec2, color: u32, thickness: f32): void;
        /**
         * @address 0x56818E8B
         */
        AddTriangleFilled(p1: ImVec2, p2: ImVec2, p3: ImVec2, color: u32): void;
        /**
         * @address 0x568119C9
         */
        AddCircle(center: ImVec2, radius: f32, color: u32, numSegments: i32, thickness: f32): void;
        /**
         * @address 0x5681663B
         */
        AddCircleFilled(center: ImVec2, radius: f32, color: u32, numSegments: i32): void;
        /**
         * @address 0x56818A6C
         */
        AddNgon(center: ImVec2, radius: f32, color: u32, numSegments: i32, thickness: f32): void;
        /**
         * @address 0x568173A1
         */
        AddNgonFilled(center: ImVec2, radius: f32, color: u32, numSegments: i32): void;
        /**
         * @address 0x56818B8E
         */
        AddEllipse(center: ImVec2, radius: ImVec2, color: u32, rotation: f32, numSegments: i32, thickness: f32): void;
        /**
         * @address 0x56818AF8
         */
        AddEllipseFilled(center: ImVec2, radius: ImVec2, color: u32, rotation: f32, numSegments: i32): void;
        /**
         * @address 0x56A1F3E0
         */
        AddText(position: ImVec2, color: u32, text: string): void;
        /**
         * @address 0x56816933
         */
        AddBezierCubic(p1: ImVec2, p2: ImVec2, p3: ImVec2, p4: ImVec2, color: u32, thickness: f32, numSegments: i32): void;
        /**
         * @address 0x56816343
         */
        AddBezierQuadratic(p1: ImVec2, p2: ImVec2, p3: ImVec2, color: u32, thickness: f32, numSegments: i32): void;
    }
    
    /**
     * @size 0x1 (1 bytes)
     */
    class ImDrawListSharedData {
    }
    
    /**
     * @size 0x14 (20 bytes)
     */
    class ImDrawListSplitter {
    }
    
    /**
     * @size 0x14 (20 bytes)
     */
    class ImDrawVert {
    }
    
    /**
     * @size 0x60 (96 bytes)
     */
    class ImFont {
    }
    
    /**
     * @size 0x470 (1136 bytes)
     */
    class ImFontAtlas {
    }
    
    /**
     * @size 0x1 (1 bytes)
     */
    class ImFontBuilderIO {
    }
    
    /**
     * @size 0x7C (124 bytes)
     */
    class ImFontConfig {
    }
    
    /**
     * @size 0x28 (40 bytes)
     */
    class ImFontGlyph {
    }
    
    /**
     * @size 0xC (12 bytes)
     */
    class ImFontGlyphRangesBuilder {
    }
    
    /**
     * @size 0x10 (16 bytes)
     */
    class ImColor {
    }
    
    /**
     * @size 0x1 (1 bytes)
     */
    class ImGuiContext {
    }
    
    /**
     * @size 0x38D8 (14552 bytes)
     */
    class ImGuiIO {
    }
    
    /**
     * @size 0x34 (52 bytes)
     */
    class ImGuiInputTextCallbackData {
    }
    
    /**
     * @size 0x10 (16 bytes)
     */
    class ImGuiKeyData {
    }
    
    /**
     * @size 0x1C (28 bytes)
     */
    class ImGuiListClipper {
    }
    
    /**
     * @size 0x4 (4 bytes)
     */
    class ImGuiOnceUponAFrame {
    }
    
    /**
     * @size 0x38 (56 bytes)
     */
    class ImGuiPayload {
    }
    
    /**
     * @size 0x10 (16 bytes)
     */
    class ImGuiPlatformImeData {
    }
    
    /**
     * @size 0x1C (28 bytes)
     */
    class ImGuiSizeCallbackData {
    }
    
    /**
     * @size 0xC (12 bytes)
     */
    class ImGuiStorage {
    }
    
    /**
     * @size 0x46C (1132 bytes)
     */
    class ImGuiStyle {
    }
    
    /**
     * @size 0xC (12 bytes)
     */
    class ImGuiTableSortSpecs {
    }
    
    /**
     * @size 0xC (12 bytes)
     */
    class ImGuiTableColumnSortSpecs {
    }
    
    /**
     * @size 0xC (12 bytes)
     */
    class ImGuiTextBuffer {
    }
    
    /**
     * @size 0x110 (272 bytes)
     */
    class ImGuiTextFilter {
    }
    
    /**
     * @size 0x48 (72 bytes)
     */
    class ImGuiViewport {
    }
    
    /**
     * @size 0x8 (8 bytes)
     */
    interface ImVec2 {
        /**
         * @offset 0x0 (0 bytes)
         * @size 0x4 (4 bytes)
         */
        x: f32;
        
        /**
         * @offset 0x4 (4 bytes)
         * @size 0x4 (4 bytes)
         */
        y: f32;
    }
    
    /**
     * @size 0x10 (16 bytes)
     */
    interface ImVec4 {
        /**
         * @offset 0x0 (0 bytes)
         * @size 0x4 (4 bytes)
         */
        x: f32;
        
        /**
         * @offset 0x4 (4 bytes)
         * @size 0x4 (4 bytes)
         */
        y: f32;
        
        /**
         * @offset 0x8 (8 bytes)
         * @size 0x4 (4 bytes)
         */
        z: f32;
        
        /**
         * @offset 0xC (12 bytes)
         * @size 0x4 (4 bytes)
         */
        w: f32;
    }
    
    /**
     * @address 0x568145DE
     */
    function GetCurrentContext(): ImGuiContext | null;
    /**
     * @address 0x5681844F
     */
    function SetCurrentContext(ctx: ImGuiContext): void;
    /**
     * @address 0x5681240F
     */
    function GetIO(): ImGuiIO | null;
    /**
     * @address 0x56817860
     */
    function GetStyle(): ImGuiStyle | null;
    /**
     * @address 0x56A1C020
     */
    function ShowDemoWindow(isOpen: boolean): boolean;
    /**
     * @address 0x56A1C080
     */
    function ShowMetricsWindow(isOpen: boolean): boolean;
    /**
     * @address 0x56A1C0E0
     */
    function ShowDebugLogWindow(isOpen: boolean): boolean;
    /**
     * @address 0x56A1C140
     */
    function ShowIDStackToolWindow(isOpen: boolean): boolean;
    /**
     * @address 0x56A1C1A0
     */
    function ShowAboutWindow(isOpen: boolean): boolean;
    /**
     * @address 0x56818AC6
     */
    function ShowStyleEditor(targetStyle: ImGuiStyle): void;
    /**
     * @address 0x5681251D
     */
    function ShowStyleSelector(label: string): boolean;
    /**
     * @address 0x56818C51
     */
    function ShowFontSelector(label: string): void;
    /**
     * @address 0x56816F0A
     */
    function ShowUserGuide(): void;
    /**
     * @address 0x5681708B
     */
    function GetVersion(): string | null;
    /**
     * @address 0x5681223E
     */
    function StyleColorsDark(targetStyle: ImGuiStyle): void;
    /**
     * @address 0x5681759F
     */
    function StyleColorsLight(targetStyle: ImGuiStyle): void;
    /**
     * @address 0x56816B2C
     */
    function StyleColorsClassic(targetStyle: ImGuiStyle): void;
    /**
     * @address 0x56A1C200
     */
    function Begin(title: string, flags: WindowFlags): boolean;
    /**
     * @address 0x56814458
     */
    function End(): void;
    /**
     * @address 0x56A1C270
     */
    function BeginChild(id: u32, size: ImVec2, childFlags: ChildFlags, windowFlags: WindowFlags): boolean;
    /**
     * @address 0x56817487
     */
    function EndChild(): void;
    /**
     * @address 0x56815123
     */
    function IsWindowAppearing(): boolean;
    /**
     * @address 0x56816F87
     */
    function IsWindowCollapsed(): boolean;
    /**
     * @address 0x56A1C2E0
     */
    function IsWindowFocused(flags: FocusedFlags): boolean;
    /**
     * @address 0x568160EB
     */
    function IsWindowHovered(param_1: i32): boolean;
    /**
     * @address 0x5681737E
     */
    function GetWindowDrawList(): ImDrawList | null;
    /**
     * @address 0x568119B0
     */
    function GetWindowPos(): ImVec2;
    /**
     * @address 0x56816AAF
     */
    function GetWindowSize(): ImVec2;
    /**
     * @address 0x56815669
     */
    function GetWindowWidth(): f32;
    /**
     * @address 0x568123F6
     */
    function GetWindowHeight(): f32;
    /**
     * @address 0x56A1C370
     */
    function SetNextWindowPos(pos: ImVec2): void;
    /**
     * @address 0x56A1C3D0
     */
    function SetNextWindowSize(size: ImVec2): void;
    /**
     * @address 0x56A1C440
     */
    function SetNextWindowSizeConstraints(minSize: ImVec2, maxSize: ImVec2): void;
    /**
     * @address 0x568178E2
     */
    function SetNextWindowContentSize(size: ImVec2): void;
    /**
     * @address 0x56A1C4A0
     */
    function SetNextWindowCollapsed(isCollapsed: boolean): void;
    /**
     * @address 0x568144AD
     */
    function SetNextWindowFocus(): void;
    /**
     * @address 0x5681551A
     */
    function SetNextWindowScroll(scrollValue: ImVec2): void;
    /**
     * @address 0x56811181
     */
    function SetNextWindowBgAlpha(alpha: f32): void;
    /**
     * @address 0x56A1C500
     */
    function SetWindowPos(position: ImVec2): void;
    /**
     * @address 0x56A1C560
     */
    function SetWindowSize(size: ImVec2): void;
    /**
     * @address 0x56A1C5C0
     */
    function SetWindowCollapsed(isCollapsed: boolean): void;
    /**
     * @address 0x56A1C620
     */
    function SetWindowFocus(): void;
    /**
     * @address 0x568137C9
     */
    function SetWindowFontScale(fontScale: f32): void;
    /**
     * @address 0x568155BA
     */
    function GetContentRegionAvail(): ImVec2;
    /**
     * @address 0x56815B41
     */
    function GetContentRegionMax(): ImVec2;
    /**
     * @address 0x56815484
     */
    function GetWindowContentRegionMin(): ImVec2;
    /**
     * @address 0x5681225C
     */
    function GetWindowContentRegionMax(): ImVec2;
    /**
     * @address 0x56811CDF
     */
    function GetScrollX(): f32;
    /**
     * @address 0x56815A1A
     */
    function GetScrollY(): f32;
    /**
     * @address 0x56814C91
     */
    function SetScrollX(scrollX: f32): void;
    /**
     * @address 0x56811EB0
     */
    function SetScrollY(scrollY: f32): void;
    /**
     * @address 0x568183A0
     */
    function GetScrollMaxX(): f32;
    /**
     * @address 0x568164B5
     */
    function GetScrollMaxY(): f32;
    /**
     * @address 0x568110D2
     */
    function SetScrollHereX(centerRatioX: f32): void;
    /**
     * @address 0x56811843
     */
    function SetScrollHereY(centerRatioY: f32): void;
    /**
     * @address 0x56814647
     */
    function SetScrollFromPosX(localX: f32, centerRatioX: f32): void;
    /**
     * @address 0x56813387
     */
    function SetScrollFromPosY(localY: f32, centerRatioY: f32): void;
    /**
     * @address 0x56812905
     */
    function PushFont(font: ImFont): void;
    /**
     * @address 0x56811299
     */
    function PopFont(): void;
    /**
     * @address 0x56A1C680
     */
    function PushStyleColor(index: Color, color: ImVec4): void;
    /**
     * @address 0x56A1C6E0
     */
    function PopStyleColor(): void;
    /**
     * @address 0x56A1C750
     */
    function PushStyleVarF32(index: StyleVar, value: f32): void;
    /**
     * @address 0x56A1C7B0
     */
    function PushStyleVarVec2(index: StyleVar, value: ImVec2): void;
    /**
     * @address 0x56A1C810
     */
    function PopStyleVar(): void;
    /**
     * @address 0x56815097
     */
    function PushTabStop(tabStop: boolean): void;
    /**
     * @address 0x56816F6E
     */
    function PopTabStop(): void;
    /**
     * @address 0x56813CCE
     */
    function PushButtonRepeat(repeat: boolean): void;
    /**
     * @address 0x56815AD3
     */
    function PopButtonRepeat(): void;
    /**
     * @address 0x56817DE7
     */
    function PushItemWidth(itemWidth: f32): void;
    /**
     * @address 0x5681641A
     */
    function PopItemWidth(): void;
    /**
     * @address 0x56817EF0
     */
    function SetNextItemWidth(itemWidth: f32): void;
    /**
     * @address 0x56812FE0
     */
    function CalcItemWidth(): f32;
    /**
     * @address 0x56814C6E
     */
    function PushTextWrapPos(wrapLocalPosX: f32): void;
    /**
     * @address 0x568159F2
     */
    function PopTextWrapPos(): void;
    /**
     * @address 0x568151F0
     */
    function GetFont(): ImFont | null;
    /**
     * @address 0x5681783D
     */
    function GetFontSize(): f32;
    /**
     * @address 0x568161A9
     */
    function GetFontTexUvWhitePixel(): ImVec2;
    /**
     * @address 0x56A1C890
     */
    function GetStyleColorVec4(index: Color): ImVec4;
    /**
     * @address 0x56811D84
     */
    function GetCursorScreenPos(): ImVec2;
    /**
     * @address 0x568166C7
     */
    function SetCursorScreenPos(position: ImVec2): void;
    /**
     * @address 0x5681911A
     */
    function GetCursorPos(): ImVec2;
    /**
     * @address 0x568116EF
     */
    function GetCursorPosX(): f32;
    /**
     * @address 0x5681689D
     */
    function GetCursorPosY(): f32;
    /**
     * @address 0x56816AC3
     */
    function SetCursorPos(localPosition: ImVec2): void;
    /**
     * @address 0x56811F55
     */
    function SetCursorPosX(localX: f32): void;
    /**
     * @address 0x56817C89
     */
    function SetCursorPosY(localY: f32): void;
    /**
     * @address 0x568178B5
     */
    function GetCursorStartPos(): ImVec2;
    /**
     * @address 0x568183F0
     */
    function Separator(): void;
    /**
     * @address 0x56A1C900
     */
    function SameLine(offsetX: f32, spacingX: f32): void;
    /**
     * @address 0x568141C9
     */
    function NewLine(): void;
    /**
     * @address 0x568164C9
     */
    function Spacing(): void;
    /**
     * @address 0x568152E0
     */
    function Dummy(size: ImVec2): void;
    /**
     * @address 0x56816393
     */
    function Indent(indentWidth: f32): void;
    /**
     * @address 0x56811DFC
     */
    function Unindent(indentWidth: f32): void;
    /**
     * @address 0x5681755E
     */
    function BeginGroup(): void;
    /**
     * @address 0x5681852B
     */
    function EndGroup(): void;
    /**
     * @address 0x56815C1D
     */
    function AlignTextToFramePadding(): void;
    /**
     * @address 0x56818125
     */
    function GetTextLineHeight(): f32;
    /**
     * @address 0x56811A3C
     */
    function GetTextLineHeightWithSpacing(): f32;
    /**
     * @address 0x56819471
     */
    function GetFrameHeight(): f32;
    /**
     * @address 0x56818387
     */
    function GetFrameHeightWithSpacing(): f32;
    /**
     * @address 0x56819250
     */
    function PushID(id: i32): void;
    /**
     * @address 0x5681592F
     */
    function PopID(): void;
    /**
     * @address 0x56813968
     */
    function GetID(id: string): u32;
    /**
     * @address 0x56A1C970
     */
    function Text(text: string): void;
    /**
     * @address 0x56A1C9D0
     */
    function TextColored(color: ImVec4, text: string): void;
    /**
     * @address 0x56A1CA30
     */
    function TextDisabled(text: string): void;
    /**
     * @address 0x56A1CA90
     */
    function TextWrapped(text: string): void;
    /**
     * @address 0x56A1CAF0
     */
    function LabelText(label: string, text: string): void;
    /**
     * @address 0x56A1CB50
     */
    function BulletText(text: string): void;
    /**
     * @address 0x56811A50
     */
    function SeparatorText(label: string): void;
    /**
     * @address 0x5681877E
     */
    function Button(label: string, size: ImVec2): boolean;
    /**
     * @address 0x5681878D
     */
    function SmallButton(label: string): boolean;
    /**
     * @address 0x56A1CBC0
     */
    function InvisibleButton(id: string, size: ImVec2, flags: ButtonFlags): boolean;
    /**
     * @address 0x56A1CC20
     */
    function ArrowButton(id: string, direction: Direction): boolean;
    /**
     * @address 0x56A1CC80
     */
    function Checkbox(label: string, value: boolean): boolean;
    /**
     * @address 0x56813B1B
     */
    function RadioButton(label: string, active: boolean): boolean;
    /**
     * @address 0x56A1CD20
     */
    function ProgressBar(fraction: f32): void;
    /**
     * @address 0x56813DDC
     */
    function Bullet(): void;
    /**
     * @address 0x56A1CE60
     */
    function Image(textureId: u32, size: ImVec2): void;
    /**
     * @address 0x56A1CFA0
     */
    function ImageButton(textureId: u32, size: ImVec2): boolean;
    /**
     * @address 0x56A1D080
     */
    function DragFloat(label: string, value: f32, onChange: (param_0: f32) => void): boolean;
    /**
     * @address 0x56A1D170
     */
    function DragFloat2(label: string, value: basic_vec2f, onChange: (param_0: basic_vec2f) => void): boolean;
    /**
     * @address 0x56A1D250
     */
    function DragFloat3(label: string, value: basic_vec3f, onChange: (param_0: basic_vec3f) => void): boolean;
    /**
     * @address 0x56A1D330
     */
    function DragFloat4(label: string, value: basic_vec4f, onChange: (param_0: basic_vec4f) => void): boolean;
    /**
     * @address 0x56A1D400
     */
    function DragInt(label: string, value: i32, onChange: (param_0: i32) => void): boolean;
    /**
     * @address 0x56A1D4D0
     */
    function DragInt2(label: string, value: basic_vec2i, onChange: (param_0: basic_vec2i) => void): boolean;
    /**
     * @address 0x56A1D5A0
     */
    function DragInt3(label: string, value: basic_vec3i, onChange: (param_0: basic_vec3i) => void): boolean;
    /**
     * @address 0x56A1D670
     */
    function DragInt4(label: string, value: basic_vec4i, onChange: (param_0: basic_vec4i) => void): boolean;
    /**
     * @address 0x56A1D740
     */
    function SliderFloat(label: string, value: f32, min: f32, max: f32, onChange: (param_0: f32) => void): boolean;
    /**
     * @address 0x56A1D830
     */
    function SliderFloat2(label: string, value: basic_vec2f, min: f32, max: f32, onChange: (param_0: basic_vec2f) => void): boolean;
    /**
     * @address 0x56A1D920
     */
    function SliderFloat3(label: string, value: basic_vec3f, min: f32, max: f32, onChange: (param_0: basic_vec3f) => void): boolean;
    /**
     * @address 0x56A1DA10
     */
    function SliderFloat4(label: string, value: basic_vec4f, min: f32, max: f32, onChange: (param_0: basic_vec4f) => void): boolean;
    /**
     * @address 0x56A1DB00
     */
    function SliderAngle(label: string, value: f32, min: f32, max: f32, onChange: (param_0: f32) => void): boolean;
    /**
     * @address 0x56A1DBF0
     */
    function SliderInt(label: string, value: i32, min: i32, max: i32, onChange: (param_0: f32) => void): boolean;
    /**
     * @address 0x56A1DCC0
     */
    function SliderInt2(label: string, value: basic_vec2i, min: i32, max: i32, onChange: (param_0: basic_vec2i) => void): boolean;
    /**
     * @address 0x56A1DD90
     */
    function SliderInt3(label: string, value: basic_vec3i, min: i32, max: i32, onChange: (param_0: basic_vec3i) => void): boolean;
    /**
     * @address 0x56A1DE60
     */
    function SliderInt4(label: string, value: basic_vec4i, min: i32, max: i32, onChange: (param_0: basic_vec4i) => void): boolean;
    /**
     * @address 0x56A1DF50
     */
    function VSliderFloat(label: string, size: ImVec2, value: f32, min: f32, max: f32, onChange: (param_0: f32) => void): boolean;
    /**
     * @address 0x56A1E030
     */
    function VSliderInt(label: string, size: ImVec2, value: i32, min: i32, max: i32, onChange: (param_0: i32) => void): boolean;
    /**
     * @address 0x56A1E1A0
     */
    function InputText(label: string, value: string, onChange: (param_0: string) => void): boolean;
    /**
     * @address 0x56A1E300
     */
    function InputTextMultiline(label: string, value: string, size: ImVec2, onChange: (param_0: string) => void): boolean;
    /**
     * @address 0x56A1E470
     */
    function InputTextWithHint(label: string, value: string, onChange: string, param_4: (param_0: string) => void): boolean;
    /**
     * @address 0x56A1E550
     */
    function InputFloat(label: string, value: f32, onChange: (param_0: f32) => void): boolean;
    /**
     * @address 0x56A1E620
     */
    function InputFloat2(label: string, value: basic_vec2f, onChange: (param_0: basic_vec2f) => void): boolean;
    /**
     * @address 0x56A1E6E0
     */
    function InputFloat3(label: string, value: basic_vec3f, onChange: (param_0: basic_vec3f) => void): boolean;
    /**
     * @address 0x56A1E7A0
     */
    function InputFloat4(label: string, value: basic_vec4f, onChange: (param_0: basic_vec4f) => void): boolean;
    /**
     * @address 0x56A1E860
     */
    function InputInt(label: string, value: i32, onChange: (param_0: i32) => void): boolean;
    /**
     * @address 0x56A1E910
     */
    function InputInt2(label: string, value: basic_vec2i, onChange: (param_0: basic_vec2i) => void): boolean;
    /**
     * @address 0x56A1E9C0
     */
    function InputInt3(label: string, value: basic_vec3i, onChange: (param_0: basic_vec3i) => void): boolean;
    /**
     * @address 0x56A1EA70
     */
    function InputInt4(label: string, value: basic_vec4i, onChange: (param_0: basic_vec4i) => void): boolean;
    /**
     * @address 0x56A1EB20
     */
    function ColorEdit3(label: string, value: basic_vec3f, onChange: (param_0: basic_vec3f) => void): boolean;
    /**
     * @address 0x56A1EBD0
     */
    function ColorEdit4(label: string, value: basic_vec4f, onChange: (param_0: basic_vec4f) => void): boolean;
    /**
     * @address 0x56A1EC80
     */
    function ColorPicker3(label: string, value: basic_vec3f, onChange: (param_0: basic_vec3f) => void): boolean;
    /**
     * @address 0x56A1ED30
     */
    function ColorPicker4(label: string, value: basic_vec4f, onChange: (param_0: basic_vec4f) => void): boolean;
    /**
     * @address 0x56A1ED90
     */
    function SetColorEditOptions(flags: ColorEditFlags): void;
    /**
     * @address 0x56817A31
     */
    function TreeNode(label: string): boolean;
    /**
     * @address 0x56A1EDF0
     */
    function TreeNodeEx(label: string, flags: TreeNodeFlags): boolean;
    /**
     * @address 0x56A1EE50
     */
    function TreePush(id: string): void;
    /**
     * @address 0x568183BE
     */
    function TreePop(): void;
    /**
     * @address 0x56812342
     */
    function GetTreeNodeToLabelSpacing(): f32;
    /**
     * @address 0x56A1EEB0
     */
    function CollapsingHeader(label: string, flags: TreeNodeFlags): boolean;
    /**
     * @address 0x56A1EF10
     */
    function SetNextItemOpen(isOpen: boolean): void;
    /**
     * @address 0x56A1EFA0
     */
    function Selectable(label: string, isSelected: boolean): boolean;
    /**
     * @address 0x568122D4
     */
    function BeginMenuBar(): boolean;
    /**
     * @address 0x568173C4
     */
    function EndMenuBar(): void;
    /**
     * @address 0x56813AA3
     */
    function BeginMainMenuBar(): boolean;
    /**
     * @address 0x56816C7B
     */
    function EndMainMenuBar(): void;
    /**
     * @address 0x5681313E
     */
    function BeginMenu(label: string, isEnabled: boolean): boolean;
    /**
     * @address 0x56815D62
     */
    function EndMenu(): void;
    /**
     * @address 0x56A1F010
     */
    function MenuItem(label: string, shortcut: string | null, isSelected: boolean, isEnabled: boolean): boolean;
    /**
     * @address 0x56811145
     */
    function BeginTooltip(): boolean;
    /**
     * @address 0x56817801
     */
    function EndTooltip(): void;
    /**
     * @address 0x56A1F080
     */
    function SetTooltip(tooltip: string): void;
    /**
     * @address 0x56812982
     */
    function BeginItemTooltip(): boolean;
    /**
     * @address 0x56A1F0E0
     */
    function SetItemTooltip(tooltip: string): void;
    /**
     * @address 0x56A1F140
     */
    function BeginPopup(id: string, flags: WindowFlags): boolean;
    /**
     * @address 0x56A1F1B0
     */
    function BeginPopupModal(id: string, isOpen: boolean, flags: WindowFlags): boolean;
    /**
     * @address 0x568138FF
     */
    function EndPopup(): void;
    /**
     * @address 0x56A1F210
     */
    function OpenPopup(popupId: string): void;
    /**
     * @address 0x56814CEB
     */
    function BeginDisabled(isDisabled: boolean): void;
    /**
     * @address 0x56812D79
     */
    function EndDisabled(): void;
    /**
     * @address 0x56816FF5
     */
    function PushClipRect(min: ImVec2, max: ImVec2, doIntersectWithCurrent: boolean): void;
    /**
     * @address 0x5681174E
     */
    function PopClipRect(): void;
    /**
     * @address 0x568115FF
     */
    function IsItemActive(): boolean;
    /**
     * @address 0x56815BF0
     */
    function IsItemFocused(): boolean;
    /**
     * @address 0x56817194
     */
    function IsItemVisible(): boolean;
    /**
     * @address 0x5681738D
     */
    function IsItemEdited(): boolean;
    /**
     * @address 0x568169BF
     */
    function IsItemActivated(): boolean;
    /**
     * @address 0x568115FA
     */
    function IsItemDeactivated(): boolean;
    /**
     * @address 0x56812121
     */
    function IsItemDeactivatedAfterEdit(): boolean;
    /**
     * @address 0x5681554C
     */
    function IsItemToggledOpen(): boolean;
    /**
     * @address 0x56812DDD
     */
    function IsAnyItemHovered(): boolean;
    /**
     * @address 0x56815EA2
     */
    function IsAnyItemActive(): boolean;
    /**
     * @address 0x56818076
     */
    function IsAnyItemFocused(): boolean;
    /**
     * @address 0x568193F9
     */
    function GetItemID(): u32;
    /**
     * @address 0x5681471E
     */
    function GetItemRectMin(): ImVec2;
    /**
     * @address 0x568158C6
     */
    function GetItemRectMax(): ImVec2;
    /**
     * @address 0x56814D9F
     */
    function GetItemRectSize(): ImVec2;
    /**
     * @address 0x56817F36
     */
    function GetMainViewport(): ImGuiViewport | null;
    /**
     * @address 0x568160C8
     */
    function IsKeyDown(param_1: Key): boolean;
    /**
     * @address 0x568114B0
     */
    function IsKeyPressed(param_1: Key, param_2: boolean): boolean;
    /**
     * @address 0x56815B37
     */
    function IsKeyReleased(param_1: Key): boolean;
    /**
     * @address 0x5681790F
     */
    function IsKeyChordPressed(param_1: i32): boolean;
    /**
     * @address 0x568175E5
     */
    function GetKeyPressedAmount(param_1: Key, param_2: f32, param_3: f32): i32;
    /**
     * @address 0x56814BD8
     */
    function GetKeyName(param_1: Key): string | null;
    /**
     * @address 0x56812A5E
     */
    function IsMouseHoveringRect(min: ImVec2, max: ImVec2, clip: boolean): boolean;
    /**
     * @address 0x56818CA6
     */
    function IsAnyMouseDown(): boolean;
    /**
     * @address 0x56816901
     */
    function GetMousePos(): ImVec2;
    /**
     * @address 0x568155DD
     */
    function GetClipboardText(): string | null;
    /**
     * @address 0x56818873
     */
    function SetClipboardText(param_1: string): void;
    /**
     * @address 0x56A1F3B0
     */
    function BeginGlobalDockSpace(withMenu: boolean): void;
    /**
     * @address 0x56814458
     */
    function EndGlobalDockSpace(): void;
}
declare namespace sys {
    /**
     * @address 0x56A639B0
     */
    function loadDLL(param_1: string): boolean;
}
