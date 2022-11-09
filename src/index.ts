import { getCanvasContext } from "./helpers/canvas";
import { createSawtoothFourier, createTriangleFourier } from "./helpers/fourier";
import waveFromCircles from "./sims/waveFromCircles";

const ctx = getCanvasContext(1280, 720);
const arr = createTriangleFourier(10, 70)

waveFromCircles(ctx, arr);