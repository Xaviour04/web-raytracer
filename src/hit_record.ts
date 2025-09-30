import type Ray from "./ray";
import Vec3 from "./vector3";

export default class HitRecord {
    point: Vec3;
    normal: Vec3;
    t: number;
    isFrontFace: boolean;

    constructor(){
        this.point = new Vec3(0, 0, 0);
        this.normal = new Vec3(0, 0, 0);
        this.t = 0;
        this.isFrontFace = false;
    }

    setFaceNormal(ray: Ray, outwardNormal: Vec3) {
        this.isFrontFace = ray.dir.dot(outwardNormal) < 0;
        this.normal = this.isFrontFace ? outwardNormal : outwardNormal.mul(-1);
    }
}