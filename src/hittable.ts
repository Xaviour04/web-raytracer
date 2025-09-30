import type HitRecord from "./hit_record";
import type Ray from "./ray";
import type Vec3 from "./vector3";

class Hittable {
    point?: Vec3;
    normal?: Vec3;
    t?: number;

    isHit(_ray: Ray, _tMin: number, _tMax: number, _hitRecord: HitRecord): boolean {
        return false;
    }
}

export type { Hittable };

export class Sphere extends Hittable {
    center: Vec3;
    radius: number;

    constructor(center: Vec3, radius: number) {
        super();
        this.center = center;
        this.radius = radius;
    }

    isHit(ray: Ray, tMin: number, tMax: number, hitRecord: HitRecord): boolean {
        const oc = this.center.sub(ray.origin);

        const a = ray.dir.mag_sqaured();
        const h = ray.dir.dot(oc);
        const c = oc.mag_sqaured() - this.radius * this.radius;

        const D = h * h - a * c;

        if (D < 0) {
            return false;
        }

        const sqrtD = Math.sqrt(D);

        let root = (h - sqrtD) / a;
        if (root <= tMin || tMax <= root) {
            root = (h + sqrtD) / a;
            if (root <= tMin || tMax <= root)
                return false;
        }

        this.t = root;
        this.point = ray.at(root);
        const outwardNormal = hitRecord.point!.sub(this.center).div(this.radius);
        hitRecord.setFaceNormal(ray, outwardNormal);
        // this.normal = this.point.sub(this.center).div(this.radius);

        return true;
    }
}