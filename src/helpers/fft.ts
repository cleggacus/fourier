import { Complex, CMath, createComplex } from "./complex";

// export const ifft = (amplitudes: Complex[]) => {
// 	const N = amplitudes.length;
	
// 	for(let i = 0 ; i < N; ++i)
//         amplitudes[i].im = -amplitudes[i].im;
			
// 	amplitudes = fft(amplitudes)
	
// 	for(let i = 0 ; i < N; ++i) {
// 		amplitudes[i].im = -amplitudes[i].im;
// 		amplitudes[i].re /= N;
// 		amplitudes[i].im /= N;
// 	}

// 	return amplitudes;
// }


export const dft = (x: Complex[]) => {
  const X: Complex[] = [];
  const N = x.length;

  for (let k = 0; k < N; k++) {
    let sum = createComplex(0, 0);

    for (let n = 0; n < N; n++) {
      const phi = (2 * Math.PI * k * n) / N;
      const c = createComplex(Math.cos(phi), -Math.sin(phi));
      sum = CMath.add(sum, CMath.mult(x[n], c))
    }

    sum.re = sum.re / N;
    sum.im = sum.im / N;

    X.push(createComplex(sum.re, sum.im));
    X[k].k = k;
  }

  return X;
}

// export const fft = (amplitudes: Complex[]) => {
// 	const N = amplitudes.length;

// 	if( N <= 1 )
// 		return amplitudes;
	
// 	const hN = N / 2;

// 	let even: Complex[] = [];
// 	let odd: Complex[] = [];

//     for(let i = 0; i < hN; i++) {
//         even.push(amplitudes[i*2]);
//         odd.push(amplitudes[i*2+1]);
//     }

// 	even = fft(even);
// 	odd = fft(odd);
	
// 	for(let k = 0; k < hN; k++) {
// 		let t = createComplex(0, -2 * Math.PI * k / N);

//         t = CMath.mult(odd[k], CMath.exp(t));

// 		amplitudes[k] = CMath.add(even[k], t);
// 		amplitudes[k + hN] = CMath.sub(even[k], t);
// 	}

// 	return amplitudes;
// }