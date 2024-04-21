export class vec2f {
    public x: f32;
    public y: f32;

    constructor(x: f32, y: f32) {
        this.x = x;
        this.y = y;
    }

    add(rhs: vec2f) {
        this.x += rhs.x;
        this.y += rhs.y;
        return this;
    }

    static From(basic: basic_vec2f) : vec2f {
        return new vec2f(basic.x, basic.y);
    }

    // more later
};

export class vec3f {
    public x: f32;
    public y: f32;
    public z: f32;

    constructor(x: f32, y: f32, z: f32) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(rhs: basic_vec3f) {
        this.x += rhs.x;
        this.y += rhs.y;
        this.z += rhs.z;
        return this;
    }

    static From(basic: basic_vec3f) : vec3f {
        return new vec3f(basic.x, basic.y, basic.z);
    }

    // more later
};

export class vec4f {
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

    add(rhs: basic_vec4f) {
        this.x += rhs.x;
        this.y += rhs.y;
        this.z += rhs.z;
        this.w += rhs.w;
        return this;
    }

    static From(basic: basic_vec4f) : vec4f {
        return new vec4f(basic.x, basic.y, basic.z, basic.w);
    }

    // more later
};

export class quatf {
    public axis: vec3f;
    public angle: f32;

    constructor(axis: basic_vec3f, angle: f32) {
        this.axis = vec3f.From(axis);
        this.angle = angle;
    }

    static From(basic: basic_quatf) : quatf {
        return new quatf(basic.axis, basic.angle);
    }

    // more later
};

export class mat3f {
    public x: vec3f;
    public y: vec3f;
    public z: vec3f;

    constructor(x: basic_vec3f, y: basic_vec3f, z: basic_vec3f) {
        this.x = vec3f.From(x);
        this.y = vec3f.From(y);
        this.z = vec3f.From(z);
    }

    // more later
};

export class mat4f {
    public x: vec4f;
    public y: vec4f;
    public z: vec4f;
    public w: vec4f;

    constructor(x: basic_vec4f, y: basic_vec4f, z: basic_vec4f, w: basic_vec4f) {
        this.x = vec4f.From(x);
        this.y = vec4f.From(y);
        this.z = vec4f.From(z);
        this.w = vec4f.From(w);
    }

    // more later
};