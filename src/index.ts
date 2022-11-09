import { getCanvasContext } from "./helpers/canvas";

const ctx = getCanvasContext(1280, 720);

const draw = () => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  requestAnimationFrame(draw);
}

draw();