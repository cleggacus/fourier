const createSquareFourier = (n: number, scale = 1) => {
  const r = [];

  for(let i = 0; i < n; i++) {
    const n = i*2 + 1;
    r.push(scale * 4/(n*Math.PI));
  }

  return r;
}

const createSawtoothFourier = (n: number, scale = 1) => {
  const r = [];

  for(let i = 0; i < n; i++) {
    const n = i + 1;
    r.push(scale * (4/(n*Math.PI)));
  }

  return r;
}

const createTriangleFourier = (n: number, scale = 1) => {
  const r = [];

  for(let i = 0; i < n; i++) {
    const n = i*2 + 1;
    r.push(scale * (8/(Math.pow(Math.PI,2) * Math.pow(n,2))));
  }

  return r;
}


export {
  createSquareFourier,
  createSawtoothFourier,
  createTriangleFourier
}