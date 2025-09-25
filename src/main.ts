import formatTime from "./formatTime";

const worker = new Worker(new URL('./worker.ts', import.meta.url));

const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const progressDialog = document.getElementById("progress-dialog") as HTMLDialogElement;
const progressElem = document.getElementById("progress") as HTMLSpanElement;
const etaElem = document.getElementById("eta") as HTMLSpanElement;


const loop = () => {
	const { width, height } = canvas;
	const image = ctx.createImageData(width, height);
	progressDialog.showModal();
	worker.postMessage(image);

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

			if (progress == 1)
				progressDialog.close();

		} else if (message instanceof ImageData) {
			ctx.putImageData(message, 0, 0);
			// progressDialog.close();
		}
	};


	console.log("closed");
};

const { innerWidth: width, innerHeight: height } = window;
const size = Math.min(width, height);
canvas.width = size;
canvas.height = size;

loop();