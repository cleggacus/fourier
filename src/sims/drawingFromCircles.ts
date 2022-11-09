import { transform } from "typescript";
import { CMath, Complex } from "../helpers/complex";

const drawingFromCircles = (ctx: CanvasRenderingContext2D, arr: Complex[]) => {
    let seq: [number, number][] = [];

    const addToSeq = (startX: number, startY: number, arr: Complex[], t: number) => {
        let x = startX;
        let y = startY;

        for(let i = 0; i < arr.length; i++) {
            let c = arr[i];

            const radius = CMath.getAmp(c);
            const phase = CMath.getPhase(c);

            x += radius * Math.cos(c.k * t + phase);
            y += radius * Math.sin(c.k * t + phase);

        }

        seq.unshift([x, y]);
    }

    const drawFourierCircles = (startX: number, startY: number, arr: Complex[], t: number) => {
        let x = startX;
        let y = startY;

        ctx.strokeStyle = "#00aaff66";

        for(let i = 0; i < arr.length; i++) {
            let c = arr[i];

            const radius = CMath.getAmp(c);
            const phase = CMath.getPhase(c);


            ctx.beginPath()
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath()


            x += radius * Math.cos(c.k * t + phase);
            y += radius * Math.sin(c.k * t + phase);

        }
    }

    const drawPath = () => {
        let [lastx, lasty] = seq[0];

        for(let i = 0; i < seq.length; i++) {
            const [x, y] = seq[i];

            ctx.strokeStyle = `rgba(255, 255, 255, ${1-i/arr.length})`;

            ctx.beginPath();
            ctx.moveTo(lastx, lasty);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.closePath()

            lastx = x;
            lasty = y;
        }

    }

    let t = 0;


    let last = Date.now();
    let start = last;

    const draw = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for(let i =0 ; i < 1; i++) {
            t += 2 * Math.PI / arr.length;
            addToSeq(ctx.canvas.width/2, ctx.canvas.height/2, arr, t)

            if(seq.length > arr.length)
                seq.pop();
        }

        if(t != 0) {
            drawFourierCircles(ctx.canvas.width/2, ctx.canvas.height/2, arr, t)
            drawPath();
        }

        requestAnimationFrame(draw);
    }

    draw();
}

export default drawingFromCircles;