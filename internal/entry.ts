import { runEventLoop } from './event_loop';
import { ModManager } from './mod_mgr';
import { ModDataCache } from './mod_cache';
import * as m from '../utils/math';

global.Cache = new ModDataCache();
global.ModMan = new ModManager();

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

runEventLoop();
