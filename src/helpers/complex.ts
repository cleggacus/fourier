export const createComplex = (re: number, im: number) => {
    return {
        re, im, k: 0
    }
}

export type Complex = ReturnType<typeof createComplex>;

export namespace CMath {
    export const mult = (c1: Complex, c2: Complex) => {
        const newRe = (c1.re * c2.re) - (c1.im * c2.im);
        const newIm = (c1.re * c2.im) + (c1.im * c2.re);

        return createComplex(newRe, newIm);
    }

    export const add = (c1: Complex, c2: Complex) => {
        return createComplex(c1.re + c2.re, c1.im + c2.im);
    }

    export const sub = (c1: Complex, c2: Complex) => {
        return createComplex(c1.re - c2.re, c1.im - c2.im);
    }


    export const exp = (c1: Complex) => {
        const er = Math.exp(c1.re);
        const re = er * Math.cos(c1.im);
        const im = er * Math.sin(c1.im);

        return createComplex(re, im);
    }

    export const getPhase = (c1: Complex) => {
        return Math.atan2(c1.im, c1.re);
    }

    export const getAmp = (c1: Complex) => {
        return Math.sqrt(c1.re*c1.re + c1.im*c1.im);
    }

    export const rotate = (c1: Complex, r: number) => {
        return mult(c1, createComplex(Math.cos(r), Math.sin(r)));
    }
}
