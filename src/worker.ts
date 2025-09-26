import Ray from "./ray.ts";
import Vec3, { color } from "./vector3.ts";

const rayColor = (ray: Ray) => {
    const unitDir = ray.direction().unit();
    const a = 0.5 * (unitDir.y + 1);
    return color(1, 1, 1)
        .mul(1 - a)
        .add(color(0.5, 0.7, 1).mul(a));
};

self.onmessage = (event) => {
    const { height, width } = event.data;
    const image = Array<Vec3>(height * width);

    const aspectRatio = width / height;

    // Camera
    const focalLength = 1.0;
    const viewportHeight = 2;
    const viewportWidth = viewportHeight * aspectRatio;
    const cameraCenter = new Vec3(0, 0, 0);

    const viewportU = new Vec3(viewportWidth, 0, 0);
    const viewportV = new Vec3(0, -viewportHeight, 0);

    const pixelDeltaU = viewportU.div(width);
    const pixelDeltaV = viewportV.div(height);

    const viewportUpperLeft = cameraCenter
        .sub(new Vec3(0, 0, focalLength))
        .sub(viewportU.div(2))
        .sub(viewportV.div(2));
    const pixel0Loc = viewportUpperLeft.add(
        pixelDeltaU.add(pixelDeltaV).div(2)
    );

    for (let y = 0; y < height; y++) {
        self.postMessage(y / height);

        for (let x = 0; x < width; x++) {
            const pixelCenter = pixel0Loc
                .add(pixelDeltaU.mul(x))
                .add(pixelDeltaV.mul(y));
            const rayDir = pixelCenter.sub(cameraCenter);

            const ray = new Ray(pixelCenter, rayDir);
            const color = rayColor(ray);

            image[y * width + x] = color;
        }
    }

    self.postMessage(image);
};
