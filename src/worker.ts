import Vec3 from "./vector3.ts";

self.onmessage = (event) => {
    const { height, width } = event.data;
    const image = Array<Vec3>(height * width);

    const aspectRatio = width / height;

    const viewportHeight = 2;
    const viewportWidth = viewportHeight * aspectRatio;

    for (let y = 0; y < height; y++) {
        self.postMessage(y / height);

        for (let x = 0; x < width; x++) {

            image[y * width + x] = new Vec3(y / width, x / height, 0);
        }
    }

    self.postMessage(image);
};