import { getCanvasContext } from "./helpers/canvas";
import { CMath, createComplex } from "./helpers/complex";
import { dft } from "./helpers/fft";
import drawingFromCircles from "./sims/drawingFromCircles";
import { recordDrawing } from "./sims/recordDrawing";


const ctx1 = getCanvasContext(document.body.clientWidth, document.body.clientHeight);

recordDrawing(ctx1)
    .then(arr => {
        let tri = dft(arr.map(v => createComplex(v[0], v[1]))).sort((a, b) => CMath.getAmp(b) - CMath.getAmp(a))
        drawingFromCircles(ctx1, tri);
    });
