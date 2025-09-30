import HitRecord from "./hit_record.ts";
import { Sphere } from "./hittable.ts";
import HittableList from "./hittable_list.ts";
import Ray from "./ray.ts";
import Vec3, { color, point } from "./vector3.ts";

const degreeToRadians = (degrees: number) => degrees * Math.PI / 180;

const rayColor = (ray: Ray, world: HittableList) => {
    let hitRecord = new HitRecord();
    let isHitWorld = false;
    [isHitWorld, hitRecord] = world.isHit(ray, 0, Infinity, hitRecord);
    if (isHitWorld) {
        return hitRecord.normal.add(color(1, 1, 1)).div(2)
    } 

    const unitDir = ray.dir.unit();
    const a = 0.5 * (unitDir.y + 1);
    return color(1, 1, 1)
        .mul(1 - a)
        .add(color(0.5, 0.7, 1).mul(a));
};

self.onmessage = (event) => {
    const { height, width } = event.data;
    const image = Array<Vec3>(height * width);

    const aspectRatio = width / height;

    const world = new HittableList();
    world.add(new Sphere(point(0, 0, -1), .5))
    world.add(new Sphere(point(0, -100.5, -1), 100))

    // Camera
    const focalLength = 1.0;
    const viewportHeight = 2;
    const viewportWidth = viewportHeight * aspectRatio;
    const cameraCenter = point(0, 0, 0);

    const viewportX = new Vec3(viewportWidth, 0, 0);
    const viewportY = new Vec3(0, -viewportHeight, 0);

    const pixelDeltaX = viewportX.div(width);
    const pixelDeltaY = viewportY.div(height);

    const viewportUpperLeft = cameraCenter
        .sub(new Vec3(0, 0, focalLength))
        .sub(viewportX.div(2))
        .sub(viewportY.div(2));
    const pixel00Loc = viewportUpperLeft.add(
        pixelDeltaX.add(pixelDeltaY).div(2)
    );

    for (let y = 0; y < height; y++) {
        self.postMessage(y / height);

        for (let x = 0; x < width; x++) {
            const pixelCenter = pixel00Loc
                .add(pixelDeltaX.mul(x))
                .add(pixelDeltaY.mul(y));
            const rayDir = pixelCenter.sub(cameraCenter);

            const ray = new Ray(cameraCenter, rayDir);
            const color = rayColor(ray, world);

            image[y * width + x] = color;
        }
    }

    self.postMessage(image);
};
