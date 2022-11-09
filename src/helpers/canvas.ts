const containCanvas = (canvas: HTMLCanvasElement): void => {
  const parent = canvas.parentElement;

  if(!parent)
    throw `Couldn't find parent element`;

  const resize = () => {
    const parentRatio = parent.clientWidth / parent.clientHeight;
    const canvasRatio = canvas.width / canvas.height;

    if(parentRatio > canvasRatio) {
      canvas.style.width = ``;
      canvas.style.height = `100%`;
    } else {
      canvas.style.height = ``;
      canvas.style.width = `100%`;
    }
  }

  window.addEventListener("resize", resize);
  window.addEventListener("load", resize);
  resize();
}

const getCanvasContext = (width: number, height: number): CanvasRenderingContext2D => {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas");

  if(!canvas)
    throw new Error("Can't find canvas in document");

  canvas.width = width; 
  canvas.height = height; 

  containCanvas(canvas);

  const ctx = canvas.getContext("2d");

  if(!ctx)
    throw new Error("Can't get context 2d of canvas");

  return ctx;
}

export { 
  containCanvas,
  getCanvasContext
};