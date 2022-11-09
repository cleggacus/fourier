import { getCanvasContext } from "./helpers/canvas";
import { createSawtoothFourier } from "./helpers/fourier";
import waveFromCircles from "./sims/waveFromCircles";

const ctx = getCanvasContext(1280, 720);
const arr = createSawtoothFourier(10, 70)

waveFromCircles(ctx, arr);