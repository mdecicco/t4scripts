type vec4_like = {
    x: f32;
    y: f32;
    z: f32;
    w?: f32;
};

export function radians(fromDegrees: f32) { return fromDegrees * 0.017453292; }
export function degrees(fromRadians: f32) { return fromRadians * 57.2958; }
export function clamp(value: f32, min: f32, max: f32) { return Math.max(Math.min(value, max), min); }
export function lerp(a: f32, b: f32, factor: f32) { return a + ((b - a) * factor); }

export class vec2 {
    public x: f32;
    public y: f32;

    constructor(x: f32, y: f32) {
        this.x = x;
        this.y = y;
    }

    add(rhs: basic_vec2f) { return new vec2(this.x + rhs.x, this.y + rhs.y); }
    sub(rhs: basic_vec2f) { return new vec2(this.x - rhs.x, this.y - rhs.y); }
    mul(rhs: basic_vec2f) { return new vec2(this.x * rhs.x, this.y * rhs.y); }
    div(rhs: basic_vec2f) { return new vec2(this.x / rhs.x, this.y / rhs.y); }
    addEq(rhs: basic_vec4f) { return new vec2(this.x += rhs.x, this.y += rhs.y); }
    subEq(rhs: basic_vec4f) { return new vec2(this.x -= rhs.x, this.y -= rhs.y); }
    mulEq(rhs: basic_vec4f) { return new vec2(this.x *= rhs.x, this.y *= rhs.y); }
    divEq(rhs: basic_vec4f) { return new vec2(this.x /= rhs.x, this.y /= rhs.y); }
    addScalar(rhs: f32) { return new vec2(this.x + rhs, this.y + rhs); }
    subScalar(rhs: f32) { return new vec2(this.x - rhs, this.y - rhs); }
    mulScalar(rhs: f32) { return new vec2(this.x * rhs, this.y * rhs); }
    divScalar(rhs: f32) { return new vec2(this.x / rhs, this.y / rhs); }
    addScalarEq(rhs: f32) { return new vec2(this.x += rhs, this.y += rhs); }
    subScalarEq(rhs: f32) { return new vec2(this.x -= rhs, this.y -= rhs); }
    mulScalarEq(rhs: f32) { return new vec2(this.x *= rhs, this.y *= rhs); }
    divScalarEq(rhs: f32) { return new vec2(this.x /= rhs, this.y /= rhs); }
    negate() { this.x *= -1; this.y *= -1; }
    negated() { return new vec2(-this.x, -this.y); }
    magnitudeSq() { return this.x * this.x + this.y * this.y; }
    magnitude() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    dot(rhs: basic_vec2f) { return this.x * rhs.x + this.y * rhs.y; }
    normalize() {
        const invMag = 1.0 / Math.sqrt(this.x * this.x + this.y * this.y);
        this.x *= invMag; this.y *= invMag;
    }
    normalized() {
        const invMag = 1.0 / Math.sqrt(this.x * this.x + this.y * this.y);
        return new vec2(this.x * invMag, this.y * invMag);
    }

    static From(basic: basic_vec2f) : vec2 {
        return new vec2(basic.x, basic.y);
    }

    static Random() {
        return new vec2((Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 2.0);
    }
};

export class vec3 {
    public x: f32;
    public y: f32;
    public z: f32;

    constructor(x: f32, y: f32, z: f32) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(rhs: basic_vec3f) { return new vec3(this.x + rhs.x, this.y + rhs.y, this.z + rhs.z); }
    sub(rhs: basic_vec3f) { return new vec3(this.x - rhs.x, this.y - rhs.y, this.z - rhs.z); }
    mul(rhs: basic_vec3f) { return new vec3(this.x * rhs.x, this.y * rhs.y, this.z * rhs.z); }
    div(rhs: basic_vec3f) { return new vec3(this.x / rhs.x, this.y / rhs.y, this.z / rhs.z); }
    addEq(rhs: basic_vec4f) { return new vec3(this.x += rhs.x, this.y += rhs.y, this.z += rhs.z); }
    subEq(rhs: basic_vec4f) { return new vec3(this.x -= rhs.x, this.y -= rhs.y, this.z -= rhs.z); }
    mulEq(rhs: basic_vec4f) { return new vec3(this.x *= rhs.x, this.y *= rhs.y, this.z *= rhs.z); }
    divEq(rhs: basic_vec4f) { return new vec3(this.x /= rhs.x, this.y /= rhs.y, this.z /= rhs.z); }
    addScalar(rhs: f32) { return new vec3(this.x + rhs, this.y + rhs, this.z + rhs); }
    subScalar(rhs: f32) { return new vec3(this.x - rhs, this.y - rhs, this.z - rhs); }
    mulScalar(rhs: f32) { return new vec3(this.x * rhs, this.y * rhs, this.z * rhs); }
    divScalar(rhs: f32) { return new vec3(this.x / rhs, this.y / rhs, this.z / rhs); }
    addScalarEq(rhs: f32) { return new vec3(this.x += rhs, this.y += rhs, this.z += rhs); }
    subScalarEq(rhs: f32) { return new vec3(this.x -= rhs, this.y -= rhs, this.z -= rhs); }
    mulScalarEq(rhs: f32) { return new vec3(this.x *= rhs, this.y *= rhs, this.z *= rhs); }
    divScalarEq(rhs: f32) { return new vec3(this.x /= rhs, this.y /= rhs, this.z /= rhs); }
    negate() { this.x *= -1; this.y *= -1; this.z *= -1; }
    negated() { return new vec3(-this.x, -this.y, -this.z); }
    magnitudeSq() { return this.x * this.x + this.y * this.y + this.z * this.z; }
    magnitude() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z); }
    dot(rhs: basic_vec3f) { return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z; }
    normalize() {
        const invMag = 1.0 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        this.x *= invMag; this.y *= invMag; this.z *= invMag;
    }
    normalized() {
        const invMag = 1.0 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return new vec3(this.x * invMag, this.y * invMag, this.z * invMag);
    }
    cross(rhs: basic_vec3f) {
        return new vec3(
            this.y * rhs.z - this.z * rhs.y,
            this.z * rhs.x - this.x * rhs.z,
            this.x * rhs.y - this.y * rhs.x
        );
    }

    static From(basic: basic_vec3f) : vec3 { return new vec3(basic.x, basic.y, basic.z); }

    static Random() {
        return new vec3((Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 2.0);
    }

    static readonly Axis = {
        X: () => new vec3(1.0, 0.0, 0.0),
        Y: () => new vec3(0.0, 1.0, 0.0),
        Z: () => new vec3(0.0, 0.0, 1.0)
    };
};

export class vec4 {
    public x: f32;
    public y: f32;
    public z: f32;
    public w: f32;

    constructor(x: f32, y: f32, z: f32, w: f32) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    add(rhs: basic_vec4f) { return new vec4(this.x + rhs.x, this.y + rhs.y, this.z + rhs.z, this.w + rhs.w); }
    sub(rhs: basic_vec4f) { return new vec4(this.x - rhs.x, this.y - rhs.y, this.z - rhs.z, this.w - rhs.w); }
    mul(rhs: basic_vec4f) { return new vec4(this.x * rhs.x, this.y * rhs.y, this.z * rhs.z, this.w * rhs.w); }
    div(rhs: basic_vec4f) { return new vec4(this.x / rhs.x, this.y / rhs.y, this.z / rhs.z, this.w / rhs.w); }
    addEq(rhs: basic_vec4f) { return new vec4(this.x += rhs.x, this.y += rhs.y, this.z += rhs.z, this.w + rhs.w); }
    subEq(rhs: basic_vec4f) { return new vec4(this.x -= rhs.x, this.y -= rhs.y, this.z -= rhs.z, this.w - rhs.w); }
    mulEq(rhs: basic_vec4f) { return new vec4(this.x *= rhs.x, this.y *= rhs.y, this.z *= rhs.z, this.w * rhs.w); }
    divEq(rhs: basic_vec4f) { return new vec4(this.x /= rhs.x, this.y /= rhs.y, this.z /= rhs.z, this.w / rhs.w); }
    addScalar(rhs: f32) { return new vec4(this.x + rhs, this.y + rhs, this.z + rhs, this.w + rhs); }
    subScalar(rhs: f32) { return new vec4(this.x - rhs, this.y - rhs, this.z - rhs, this.w - rhs); }
    mulScalar(rhs: f32) { return new vec4(this.x * rhs, this.y * rhs, this.z * rhs, this.w * rhs); }
    divScalar(rhs: f32) { return new vec4(this.x / rhs, this.y / rhs, this.z / rhs, this.w / rhs); }
    addScalarEq(rhs: f32) { return new vec4(this.x += rhs, this.y += rhs, this.z += rhs, this.w + rhs); }
    subScalarEq(rhs: f32) { return new vec4(this.x -= rhs, this.y -= rhs, this.z -= rhs, this.w - rhs); }
    mulScalarEq(rhs: f32) { return new vec4(this.x *= rhs, this.y *= rhs, this.z *= rhs, this.w * rhs); }
    divScalarEq(rhs: f32) { return new vec4(this.x /= rhs, this.y /= rhs, this.z /= rhs, this.w / rhs); }
    negate() { this.x *= -1; this.y *= -1; this.z *= -1; this.w *= -1; }
    negated() { return new vec4(-this.x, -this.y, -this.z, -this.w); }
    magnitudeSq() { return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w; }
    magnitude() { return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w); }
    dot(rhs: basic_vec4f) { return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z + this.w * rhs.w; }
    normalize() {
        const invMag = 1.0 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        this.x *= invMag; this.y *= invMag; this.z *= invMag; this.w *= invMag;
    }
    normalized() {
        const invMag = 1.0 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        return new vec4(this.x * invMag, this.y * invMag, this.z * invMag, this.w * invMag);
    }
    cross(rhs: basic_vec3f) {
        return new vec3(
            this.y * rhs.z - this.z * rhs.y,
            this.z * rhs.x - this.x * rhs.z,
            this.x * rhs.y - this.y * rhs.x
        );
    }

    static From(basic: vec4_like) : vec4 { return new vec4(basic.x, basic.y, basic.z, basic.w || 0.0); }

    static Random() {
        return new vec4(
            (Math.random() - 0.5) * 2.0,
            (Math.random() - 0.5) * 2.0,
            (Math.random() - 0.5) * 2.0,
            (Math.random() - 0.5) * 2.0
        );
    }
};

export class quat {
    public axis: vec3;
    public angle: f32;

    constructor(axis: basic_vec3f, angle: f32) {
        this.axis = new vec3(axis.x, axis.y, axis.z);
        this.angle = angle;
    }

    mul(rhs: basic_quatf) {
        const ax = (this.angle * rhs.axis.x + rhs.angle * this.axis.x + this.axis.y * rhs.axis.z) - this.axis.z * rhs.axis.y;
        const ay = (this.angle * rhs.axis.y + rhs.angle * this.axis.y + this.axis.z * rhs.axis.x) - this.axis.x * rhs.axis.z;
        const az = (this.angle * rhs.axis.z + rhs.angle * this.axis.z + this.axis.x * rhs.axis.y) - this.axis.y * rhs.axis.x;
        const angle = ((this.angle * rhs.angle - this.axis.x * rhs.axis.x) - this.axis.y * rhs.axis.y) - this.axis.z * rhs.axis.z;
        return new quat({ x: ax, y: ay, z: az }, angle);
    }
    mulEq(rhs: basic_quatf) {
        const ax = (this.angle * rhs.axis.x + rhs.angle * this.axis.x + this.axis.y * rhs.axis.z) - this.axis.z * rhs.axis.y;
        const ay = (this.angle * rhs.axis.y + rhs.angle * this.axis.y + this.axis.z * rhs.axis.x) - this.axis.x * rhs.axis.z;
        const az = (this.angle * rhs.axis.z + rhs.angle * this.axis.z + this.axis.x * rhs.axis.y) - this.axis.y * rhs.axis.x;
        const angle = ((this.angle * rhs.angle - this.axis.x * rhs.axis.x) - this.axis.y * rhs.axis.y) - this.axis.z * rhs.axis.z;
        this.axis.x = ax;
        this.axis.y = ay;
        this.axis.z = az;
        this.angle = angle;
        return new quat(this.axis, angle);
    }
    dot(rhs: basic_quatf) {
        return this.axis.x * rhs.axis.x + this.axis.y * rhs.axis.y + this.axis.z * rhs.axis.z + this.angle * rhs.angle;
    }
    transform(rhs: basic_vec3f) {
        let f = (this.axis.x * rhs.x + this.axis.y * rhs.y + this.axis.z * rhs.z) * 2.0;
        const result = new vec3(this.axis.x, this.axis.y, this.axis.z);
        result.x *= f;
        result.y *= f;
        result.z *= f;

        f = ((this.angle * this.angle) * 2.0) - 1.0;
        result.x += rhs.x * f;
        result.y += rhs.y * f;
        result.z += rhs.z * f;

        f = this.angle * 2.0;
        result.x += (this.axis.y * rhs.z - this.axis.z * rhs.y) * f;
        result.y += (this.axis.z * rhs.x - this.axis.x * rhs.z) * f;
        result.z += (this.axis.x * rhs.y - this.axis.y * rhs.x) * f;
        return result;
    }

    static FromAxisAngle(axis: basic_vec3f, angleRadians: f32) {
        const ha = angleRadians * 0.5;
        const s = Math.sin(ha);
        return new quat({ x: axis.x * s, y: axis.y * s, z: axis.z * s }, Math.cos(ha));
    }

    static FromMatrix(m: basic_mat3f) {
        const getMinParamIdx = (a: f32, b: f32, c: f32, d: f32) => {
            let idx = 0;
            let min = a;
            
            if (b < min) {
                idx = 1;
                min = b;
            }
            
            if (c < min) {
                idx = 2;
                min = c;
            }
            
            if (d < min) {
                idx = 3;
                min = d;
            }

            return idx;
        };

        const xx = m.x.x;
        const yy = m.y.y;
        const zz = m.z.z;
        const sum = xx + yy + zz;
        const minIdx = getMinParamIdx(sum, xx, yy, zz);

        switch (minIdx) {
            case 0: {
                const unk = Math.sqrt(sum + 1.0) * 0.5;
                const unk1 = 0.25 / unk;

                return new quat(
                    {
                        x: (m.y.z - m.z.y) * unk1,
                        y: (m.z.x - m.x.z) * unk1,
                        z: (m.x.y - m.y.x) * unk1
                    },
                    unk
                );
            }
            case 1: {
                const unk = Math.sqrt(((m.x.x + m.x.x) - sum) + 1.0) * 0.5;
                const unk1 = 0.25 / unk;

                return new quat(
                    {
                        x: unk,
                        y: (m.x.y + m.y.x) * unk1,
                        z: (m.z.x + m.x.z) * unk1
                    },
                    (m.y.z - m.z.y) * unk1
                );
            }
            case 2: {
                const unk = Math.sqrt(((m.y.y + m.y.y) - sum) + 1.0) * 0.5;
                const unk1 = 0.25 / unk;

                return new quat(
                    {
                        x: (m.x.y + m.y.x) * unk1,
                        y: unk,
                        z: (m.y.z + m.z.y) * unk1
                    },
                    (m.z.x - m.x.z) * unk1
                );
            }
            case 3: {
                const unk = Math.sqrt(((m.z.z + m.z.z) - sum) + 1.0) * 0.5;
                const unk1 = 0.25 / unk;

                return new quat(
                    {
                        x: (m.z.x + m.x.z) * unk1,
                        y: (m.y.z + m.z.y) * unk1,
                        z: unk
                    },
                    (m.x.y - m.y.x) * unk1
                );
            }
        }

        return new quat({ x: 0, y: 0, z: 0 }, 0);
    }

    static From(basic: basic_quatf) : quat {
        return new quat(basic.axis, basic.angle);
    }
};

export class mat3 {
    public x: vec3;
    public y: vec3;
    public z: vec3;

    constructor(x: basic_vec3f, y: basic_vec3f, z: basic_vec3f) {
        this.x = vec3.From(x);
        this.y = vec3.From(y);
        this.z = vec3.From(z);
    }

    mul(rhs: basic_mat3f) {
        return new mat3(
            {
                x: this.x.x * rhs.x.x + this.x.y * rhs.y.x + this.x.z * rhs.z.x,
                y: this.x.x * rhs.x.y + this.x.y * rhs.y.y + this.x.z * rhs.z.y,
                z: this.x.x * rhs.x.z + this.x.y * rhs.y.z + this.x.z * rhs.z.z
            },
            {
                x: this.y.x * rhs.x.x + this.y.y * rhs.y.x + this.y.z * rhs.z.x,
                y: this.y.x * rhs.x.y + this.y.y * rhs.y.y + this.y.z * rhs.z.y,
                z: this.y.x * rhs.x.z + this.y.y * rhs.y.z + this.y.z * rhs.z.z
            },
            {
                x: this.z.x * rhs.x.x + this.z.y * rhs.y.x + this.z.z * rhs.z.x,
                y: this.z.x * rhs.x.y + this.z.y * rhs.y.y + this.z.z * rhs.z.y,
                z: this.z.x * rhs.x.z + this.z.y * rhs.y.z + this.z.z * rhs.z.z
            }
        );
    }

    mulEq(rhs: basic_mat3f) {
        const result = new mat3(
            {
                x: this.x.x * rhs.x.x + this.x.y * rhs.y.x + this.x.z * rhs.z.x,
                y: this.x.x * rhs.x.y + this.x.y * rhs.y.y + this.x.z * rhs.z.y,
                z: this.x.x * rhs.x.z + this.x.y * rhs.y.z + this.x.z * rhs.z.z
            },
            {
                x: this.y.x * rhs.x.x + this.y.y * rhs.y.x + this.y.z * rhs.z.x,
                y: this.y.x * rhs.x.y + this.y.y * rhs.y.y + this.y.z * rhs.z.y,
                z: this.y.x * rhs.x.z + this.y.y * rhs.y.z + this.y.z * rhs.z.z
            },
            {
                x: this.z.x * rhs.x.x + this.z.y * rhs.y.x + this.z.z * rhs.z.x,
                y: this.z.x * rhs.x.y + this.z.y * rhs.y.y + this.z.z * rhs.z.y,
                z: this.z.x * rhs.x.z + this.z.y * rhs.y.z + this.z.z * rhs.z.z
            }
        );

        this.x.x = result.x.x;
        this.x.y = result.x.y;
        this.x.z = result.x.z;
        this.y.x = result.y.x;
        this.y.y = result.y.y;
        this.y.z = result.y.z;
        this.z.x = result.z.x;
        this.z.y = result.z.y;
        this.z.z = result.z.z;

        return result;
    }

    transform(rhs: basic_vec3f) {
        return new vec3(
            this.x.x * rhs.x + this.y.x * rhs.y + this.z.x * rhs.z,
            this.x.y * rhs.x + this.y.y * rhs.y + this.z.y * rhs.z,
            this.x.z * rhs.x + this.y.z * rhs.y + this.z.z * rhs.z
        );
    }

    transpose() {
        const xy = this.x.y;
        const xz = this.x.z;
        const yz = this.y.z;
        this.x.y = this.y.x;
        this.y.z = this.z.x;
        this.y.z = this.z.y;
        this.y.x = xy;
        this.z.x = xz;
        this.z.y = yz;
    }

    transposed() {
        return new mat3(
            { x: this.x.x, y: this.y.x, z: this.z.x },
            { x: this.x.y, y: this.y.y, z: this.z.y },
            { x: this.x.z, y: this.y.z, z: this.z.z }
        );
    }

    static From(m: basic_mat3f) {
        return new mat3(m.x, m.y, m.z);
    }

    static FromQuat(q: basic_quatf) {
        const ax = q.axis.x * 1.414214;
        const ay = q.axis.y * 1.414214;
        const az = q.axis.z * 1.414214;
        const ang = q.angle * 1.414214;
        return new mat3(
            {
                x: 1.0 - (ay * ay + az * az),
                y: ax * ay + az * ang,
                z: ax * az - ay * ang
            },
            {
                x: ax * ay - az * ang,
                y: 1.0 - (az * az + ax * ax),
                z: ay * az + ax * ang
            },
            {
                x: ax * az + ay * ang,
                y: ay * az - ax * ang,
                z: 1.0 - (ay * ay + ax * ax)
            }
        );
    }

    static Rotation(axis: basic_vec3f, angleRadians: f32) {
        return mat3.FromQuat(quat.FromAxisAngle(axis, angleRadians));
    }

    static Scale(scale: basic_vec3f) {
        return new mat3(
            { x: scale.x, y: 0.0, z: 0.0 },
            { x: 0.0, y: scale.y, z: 0.0 },
            { x: 0.0, y: 0.0, z: scale.z }
        );
    }

    static ScaleUniform(scale: f32) {
        return new mat3(
            { x: scale, y: 0.0, z: 0.0 },
            { x: 0.0, y: scale, z: 0.0 },
            { x: 0.0, y: 0.0, z: scale }
        );
    }

    static Identity() {
        return new mat3(
            { x: 1.0, y: 0.0, z: 0.0 },
            { x: 0.0, y: 1.0, z: 0.0 },
            { x: 0.0, y: 0.0, z: 1.0 }
        );
    }
};

export class mat4 {
    public x: vec4;
    public y: vec4;
    public z: vec4;
    public w: vec4;

    constructor(x: basic_vec4f, y: basic_vec4f, z: basic_vec4f, w: basic_vec4f) {
        this.x = vec4.From(x);
        this.y = vec4.From(y);
        this.z = vec4.From(z);
        this.w = vec4.From(w);
    }

    mul(rhs: basic_mat4f) {
        return new mat4(
            {
                x: this.x.x * rhs.x.x + this.x.y * rhs.y.x + this.x.z * rhs.z.x + this.x.w * rhs.w.x,
                y: this.x.x * rhs.x.y + this.x.y * rhs.y.y + this.x.z * rhs.z.y + this.x.w * rhs.w.y,
                z: this.x.x * rhs.x.z + this.x.y * rhs.y.z + this.x.z * rhs.z.z + this.x.w * rhs.w.z,
                w: this.x.x * rhs.x.w + this.x.y * rhs.y.w + this.x.z * rhs.z.w + this.x.w * rhs.w.w
            },
            {
                x: this.y.x * rhs.x.x + this.y.y * rhs.y.x + this.y.z * rhs.z.x + this.y.w * rhs.w.x,
                y: this.y.x * rhs.x.y + this.y.y * rhs.y.y + this.y.z * rhs.z.y + this.y.w * rhs.w.y,
                z: this.y.x * rhs.x.z + this.y.y * rhs.y.z + this.y.z * rhs.z.z + this.y.w * rhs.w.z,
                w: this.y.x * rhs.x.w + this.y.y * rhs.y.w + this.y.z * rhs.z.w + this.y.w * rhs.w.w
            },
            {
                x: this.z.x * rhs.x.x + this.z.y * rhs.y.x + this.z.z * rhs.z.x + this.z.w * rhs.w.x,
                y: this.z.x * rhs.x.y + this.z.y * rhs.y.y + this.z.z * rhs.z.y + this.z.w * rhs.w.y,
                z: this.z.x * rhs.x.z + this.z.y * rhs.y.z + this.z.z * rhs.z.z + this.z.w * rhs.w.z,
                w: this.z.x * rhs.x.z + this.z.y * rhs.y.z + this.z.z * rhs.z.w + this.z.w * rhs.w.w
            },
            {
                x: this.w.x * rhs.x.x + this.w.y * rhs.y.x + this.w.z * rhs.z.x + this.w.w * rhs.w.x,
                y: this.w.x * rhs.x.y + this.w.y * rhs.y.y + this.w.z * rhs.z.y + this.w.w * rhs.w.y,
                z: this.w.x * rhs.x.z + this.w.y * rhs.y.z + this.w.z * rhs.z.z + this.w.w * rhs.w.z,
                w: this.w.x * rhs.x.w + this.w.y * rhs.y.w + this.w.z * rhs.z.w + this.w.w * rhs.w.w
            }
        );
    }

    mulEq(rhs: basic_mat4f) {
        const result = new mat4(
            {
                x: this.x.x * rhs.x.x + this.x.y * rhs.y.x + this.x.z * rhs.z.x + this.x.w * rhs.w.x,
                y: this.x.x * rhs.x.y + this.x.y * rhs.y.y + this.x.z * rhs.z.y + this.x.w * rhs.w.y,
                z: this.x.x * rhs.x.z + this.x.y * rhs.y.z + this.x.z * rhs.z.z + this.x.w * rhs.w.z,
                w: this.x.x * rhs.x.w + this.x.y * rhs.y.w + this.x.z * rhs.z.w + this.x.w * rhs.w.w
            },
            {
                x: this.y.x * rhs.x.x + this.y.y * rhs.y.x + this.y.z * rhs.z.x + this.y.w * rhs.w.x,
                y: this.y.x * rhs.x.y + this.y.y * rhs.y.y + this.y.z * rhs.z.y + this.y.w * rhs.w.y,
                z: this.y.x * rhs.x.z + this.y.y * rhs.y.z + this.y.z * rhs.z.z + this.y.w * rhs.w.z,
                w: this.y.x * rhs.x.w + this.y.y * rhs.y.w + this.y.z * rhs.z.w + this.y.w * rhs.w.w
            },
            {
                x: this.z.x * rhs.x.x + this.z.y * rhs.y.x + this.z.z * rhs.z.x + this.z.w * rhs.w.x,
                y: this.z.x * rhs.x.y + this.z.y * rhs.y.y + this.z.z * rhs.z.y + this.z.w * rhs.w.y,
                z: this.z.x * rhs.x.z + this.z.y * rhs.y.z + this.z.z * rhs.z.z + this.z.w * rhs.w.z,
                w: this.z.x * rhs.x.z + this.z.y * rhs.y.z + this.z.z * rhs.z.w + this.z.w * rhs.w.w
            },
            {
                x: this.w.x * rhs.x.x + this.w.y * rhs.y.x + this.w.z * rhs.z.x + this.w.w * rhs.w.x,
                y: this.w.x * rhs.x.y + this.w.y * rhs.y.y + this.w.z * rhs.z.y + this.w.w * rhs.w.y,
                z: this.w.x * rhs.x.z + this.w.y * rhs.y.z + this.w.z * rhs.z.z + this.w.w * rhs.w.z,
                w: this.w.x * rhs.x.w + this.w.y * rhs.y.w + this.w.z * rhs.z.w + this.w.w * rhs.w.w
            }
        );

        this.x.x = result.x.x;
        this.x.y = result.x.y;
        this.x.z = result.x.z;
        this.x.w = result.x.w;
        this.y.x = result.y.x;
        this.y.y = result.y.y;
        this.y.z = result.y.z;
        this.y.w = result.y.w;
        this.z.x = result.z.x;
        this.z.y = result.z.y;
        this.z.z = result.z.z;
        this.z.w = result.z.w;
        this.w.x = result.w.x;
        this.w.y = result.w.y;
        this.w.z = result.w.z;
        this.w.w = result.w.w;

        return result;
    }

    transform(rhs: basic_vec4f) {
        return new vec4(
            this.x.x * rhs.x + this.y.x * rhs.y + this.z.x * rhs.z + this.w.x * rhs.w,
            this.x.y * rhs.x + this.y.y * rhs.y + this.z.y * rhs.z + this.w.y * rhs.w,
            this.x.z * rhs.x + this.y.z * rhs.y + this.z.z * rhs.z + this.w.z * rhs.w,
            this.x.w * rhs.x + this.y.w * rhs.y + this.z.w * rhs.z + this.w.w * rhs.w
        );
    }

    transpose() {
        const xy = this.x.y;
        const xz = this.x.z;
        const xw = this.x.w;
        const yz = this.y.z;
        const yw = this.y.x;
        const zw = this.z.w;
        
        this.x.y = this.y.x;
        this.x.z = this.z.x;
        this.x.w = this.w.x;
        this.y.z = this.z.y;
        this.y.w = this.w.y;
        this.z.w = this.w.z;

        this.y.x = xy;
        this.z.x = xz;
        this.z.y = yz;
        this.w.x = xw;
        this.w.y = yw;
        this.w.z = zw;
    }

    transposed() {
        return new mat4(
            { x: this.x.x, y: this.y.x, z: this.z.x, w: this.w.x },
            { x: this.x.y, y: this.y.y, z: this.z.y, w: this.w.y },
            { x: this.x.z, y: this.y.z, z: this.z.z, w: this.w.z },
            { x: this.x.w, y: this.y.w, z: this.z.w, w: this.w.w }
        );
    }

    basis() {
        return new mat3(this.x, this.y, this.z);
    }

    static From(m: basic_mat4f) {
        return new mat4(m.x, m.y, m.z, m.w);
    }

    static FromMat3(m: basic_mat3f) {
        return new mat4(
            { x: m.x.x, y: m.x.y, z: m.x.z, w: 0.0 },
            { x: m.y.x, y: m.y.y, z: m.y.z, w: 0.0 },
            { x: m.z.x, y: m.z.y, z: m.z.z, w: 0.0 },
            { x:   0.0, y:   0.0, z:   0.0, w: 1.0 }
        );
    }

    static FromQuat(q: basic_quatf) {
        const ax = q.axis.x * 1.414214;
        const ay = q.axis.y * 1.414214;
        const az = q.axis.z * 1.414214;
        const ang = q.angle * 1.414214;
        return new mat4(
            {
                x: 1.0 - (ay * ay + az * az),
                y: ax * ay + az * ang,
                z: ax * az - ay * ang,
                w: 0.0
            },
            {
                x: ax * ay - az * ang,
                y: 1.0 - (az * az + ax * ax),
                z: ay * az + ax * ang,
                w: 0.0
            },
            {
                x: ax * az + ay * ang,
                y: ay * az - ax * ang,
                z: 1.0 - (ay * ay + ax * ax),
                w: 0.0
            },
            {
                x: 0,
                y: 0,
                z: 0,
                w: 1.0
            }
        );
    }

    static Translation(trans: basic_vec3f) {
        return new mat4(
            { x: 1.0,     y: 0.0,     z: 0.0,     w: 0.0 },
            { x: 0.0,     y: 1.0,     z: 0.0,     w: 0.0 },
            { x: 0.0,     y: 0.0,     z: 1.0,     w: 0.0 },
            { x: trans.x, y: trans.y, z: trans.z, w: 1.0 }
        )
    }

    static Rotation(axis: basic_vec3f, angleRadians: f32) {
        return mat4.FromQuat(quat.FromAxisAngle(axis, angleRadians));
    }

    static Scale(scale: basic_vec3f) {
        return new mat4(
            { x: scale.x, y: 0.0,     z: 0.0,     w: 0.0 },
            { x: 0.0,     y: scale.y, z: 0.0,     w: 0.0 },
            { x: 0.0,     y: 0.0,     z: scale.z, w: 0.0 },
            { x: 0.0,     y: 0.0,     z: 0.0,     w: 1.0 }
        );
    }

    static ScaleUniform(scale: f32) {
        return new mat4(
            { x: scale, y: 0.0,   z: 0.0,   w: 0.0 },
            { x: 0.0,   y: scale, z: 0.0,   w: 0.0 },
            { x: 0.0,   y: 0.0,   z: scale, w: 0.0 },
            { x: 0.0,   y: 0.0,   z: 0.0,   w: 1.0 }
        );
    }
    
    static LookAt(eye: basic_vec3f, center: basic_vec3f, up: basic_vec3f) {
        const f = (vec3.From(center).sub(eye)).normalized();
        const s = f.cross(up).normalized();
        const u = s.cross(f);

        return new mat4(
            { x: s.x, y: u.x, z: -f.x, w: 0.0, },
            { x: s.y, y: u.y, z: -f.y, w: 0.0, },
            { x: s.z, y: u.z, z: -f.z, w: 0.0, },
            { x: -s.dot(eye), y:-u.dot(eye), z: f.dot(eye), w: 1.0 }
        );
    }

    static Perspective(fovRadians: f32, aspect: f32, near: f32, far: f32) {
        const out = mat4.Identity();
        out.x.x = out.y.y = out.z.z = out.w.w = 0.0;

        const a = 1.0 / Math.tan(fovRadians * 0.5);
        const b = a * aspect;

        out.x.x = a;
        out.y.y = b;
        out.z.z = (far + near) / (near - far);
        out.z.w = -1.0;
        out.w.z = (2.0 * near * far) / (near - far);

        return out;
    }

    static Orthographic(left: f32, right: f32, top: f32, bottom: f32, near: f32, far: f32) {
        const out = mat4.Identity();

        out.x.x =  2.0 / (right - left  );
        out.y.y =  2.0 / (top   - bottom);
        out.z.z = -2.0 / (far   - near  );
        out.w.x = -((right + left  ) / (right - left  ));
        out.w.y = -((top   + bottom) / (top   - bottom));
        out.w.z = -((far   + near  ) / (far   - near  ));
        out.w.w = 1.0;

        return out;
    }

    static Identity() {
        return new mat4(
            { x: 1.0, y: 0.0, z: 0.0, w: 0.0 },
            { x: 0.0, y: 1.0, z: 0.0, w: 0.0 },
            { x: 0.0, y: 0.0, z: 1.0, w: 0.0 },
            { x: 0.0, y: 0.0, z: 0.0, w: 1.0 }
        );
    }
};