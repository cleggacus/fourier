import { drawing } from "./drawing";
import { getCanvasContext } from "./helpers/canvas";
import { CMath, createComplex } from "./helpers/complex";
import { dft } from "./helpers/fft";
import { createSawtoothFourier, createSquareFourier, createTriangleFourier } from "./helpers/fourier";
import drawingFromCircles from "./sims/drawingFromCircles";
import { recordDrawing } from "./sims/recordDrawing";
import waveFromCircles from "./sims/waveFromCircles";


const ctx1 = getCanvasContext(document.body.clientWidth, document.body.clientHeight);

const img = new Image();

img.onload = () => {
    const canvas = document.createElement("canvas") 
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");

    if(!ctx)
        return;

    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const threshold = 0.5;

    for(let y = 0; y < imgData.height; y++) {
        for(let x = 0; x < imgData.width; x++) {
            const i = x + y * 4;
            const r = data[i];
            const g = data[i+1];
            const b = data[i+2];
            const a = data[i+3];

            const scale = (r+g+b) / 3;

            if(scale > threshold) {
                data[i] = 255;
                data[i+1] = 255;
                data[i+2] = 255;
            } else {
                data[i] = 0;
                data[i+1] = 0;
                data[i+2] = 0;
            }
        }
    }

    ctx1.putImageData(imgData, 0, 0);
}

img.src = "/image.jpg";

// recordDrawing(ctx)
//     .then(arr => {
//         let tri = dft(arr.map(v => createComplex(v[0], v[1]))).sort((a, b) => CMath.getAmp(b) - CMath.getAmp(a))
//         drawingFromCircles(ctx, tri);
//     });
