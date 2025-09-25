self.onmessage = (event) => {
    if (!(event.data instanceof ImageData)) return;

    const image = event.data;
    const { height, width } = image;

    for (let y = 0; y < height; y++) {
        self.postMessage(y / height);

        for (let x = 0; x < width; x++) {
            const r = y * 256 / (width - 1);
            const g = x * 256 / (height - 1);
            const b = 0;


            image.data[(y * width + x) * 4] = r;
            image.data[(y * width + x) * 4 + 1] = g;
            image.data[(y * width + x) * 4 + 2] = b;
            image.data[(y * width + x) * 4 + 3] = 255;
        }
    }

    self.postMessage(1);
    self.postMessage(image);
};