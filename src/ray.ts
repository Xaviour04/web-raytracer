import type Vec3 from "./vector3";

export default class Ray {
    origin: Vec3;
    dir: Vec3;

    constructor(origin: Vec3, dir: Vec3) {
        this.origin = origin.clone();
        this.dir = dir.clone();
    }

    at(t: number): Vec3 {
        return this.origin.add(this.dir.mul(t));
    }
}