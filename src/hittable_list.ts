import HitRecord from "./hit_record";
import type { Hittable } from "./hittable";
import type Ray from "./ray";

export default class HittableList {
    objects: Array<Hittable>;

    constructor() {
        this.objects = new Array<Hittable>();
    }

    clear() {
        this.objects.splice(0);
    }

    add(object: Hittable) {
        this.objects.push(object);
    }

    isHit(ray: Ray, tMin: number, tMax: number, hitRecord: HitRecord): [boolean, HitRecord] {
        const tempRecord = new HitRecord();
        let hitAnything = false;
        let closestSoFar = tMax;
        let record = hitRecord;

        for (let object of this.objects) {
            if (object.isHit(ray, tMin, closestSoFar, tempRecord)) {
                hitAnything = true;
                closestSoFar = tempRecord.t!;
                record = tempRecord;
            }
        }

        return [hitAnything, record];
    }
}