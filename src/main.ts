import formatTime from "./formatTime";

import Worker from "./worker.ts?worker";

const worker = new Worker();

const mainElem = document.getElementById("container") as HTMLElement;
const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const progressDialog = document.getElementById("progress-dialog") as HTMLDialogElement;
const progressElem = document.getElementById("progress") as HTMLSpanElement;
const etaElem = document.getElementById("eta") as HTMLSpanElement;
const rerunBtn = document.getElementById("rerun-btn") as HTMLButtonElement;

const aspectRatio = 16 / 9;
const canvasWidth = 1000;
const canvasHeight = Math.max(canvasWidth / aspectRatio, 1);

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const resizeImageData = (
	ctx: CanvasRenderingContext2D,
	image: ImageData,
	sourceWidth: number,
	sourceHeight: number,
	targetWidth: number,
	targetHeight: number) => {
	const tempCanvas = document.createElement("canvas");
	tempCanvas.width = sourceWidth;
	tempCanvas.height = sourceHeight;

	const tempCtx = tempCanvas.getContext("2d")!;
	tempCtx.putImageData(image, 0, 0);
	ctx.scale(targetWidth / sourceWidth, targetHeight / sourceHeight);

	ctx.clearRect(0, 0, sourceWidth, sourceHeight);
	ctx.drawImage(tempCanvas, 0, 0);
	
	ctx.scale(sourceWidth / targetWidth, sourceHeight / targetHeight);
};

const loop = () => {
	progressDialog.showModal();
	worker.postMessage({ width: canvasWidth, height: canvasHeight });

	let prevProgress = 0;
	let prevProgressTime = Date.now();
	const startTime = Date.now();

	worker.onmessage = (event) => {
		const message = event.data;
		if (typeof message === "number") {
			const progress = message;
			const time = Date.now();

			// const dProgress = progress - prevProgress;
			// const dTime = time - prevProgressTime;
			// const ETA = (1 - progress) * dTime / dProgress;

			const ETA = (1 - progress) * (time - startTime) / progress;

			prevProgress = progress;
			prevProgressTime = time;

			progressElem.innerText = `${Math.round(progress * 100)}%`;
			etaElem.innerText = formatTime(ETA);
			progressDialog.style.setProperty("--progress", `${progress * 100}%`);
		} else if (message instanceof Array) {
			const image = ctx.createImageData(canvasWidth, canvasHeight);

			for (let i = 0; i < message.length; i++) {
				image.data[i * 4 + 0] = message[i].x * 256;
				image.data[i * 4 + 1] = message[i].y * 256;
				image.data[i * 4 + 2] = message[i].z * 256;
				image.data[i * 4 + 3] = 255;
			}

			resizeImageData(ctx, image, canvasWidth, canvasHeight, canvas.width, canvas.height);

			progressDialog.close();
		}
	};
};

(window.onresize = () => {
	const { width: oldWidth, height: oldHeight } = canvas;
	const aspectRatio = oldWidth / oldHeight;

	const image = ctx.getImageData(0, 0, oldWidth, oldHeight);

	let newHeight = mainElem.clientHeight;
	let newWidth = mainElem.clientHeight * aspectRatio;

	if (newWidth > mainElem.clientWidth) {
		newWidth = mainElem.clientWidth;
		newHeight = mainElem.clientWidth / aspectRatio;
	}

	canvas.width = newWidth;
	canvas.height = newHeight;

	resizeImageData(ctx, image, oldWidth, oldHeight, canvas.width, canvas.height);
});

let newHeight = mainElem.clientHeight;
let newWidth = mainElem.clientHeight * canvas.width / canvas.height;

if (newWidth > mainElem.clientWidth) {
	newWidth = mainElem.clientWidth;
	newHeight = mainElem.clientWidth * canvas.height / canvas.width;
}

canvas.width = newWidth;
canvas.height = newHeight;

loop();

rerunBtn.addEventListener("click", loop);