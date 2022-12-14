import { getCanvasContext } from "../helpers/canvas";


const waveFromCircles = (ctx: CanvasRenderingContext2D, arr: number[]) => {
    let seq: [number, number][] = [];

    const drawFourierCircles = (startX: number, startY: number, arr: number[], t: number) => {
        let x = startX;
        let y = startY;

        ctx.strokeStyle = "#ffffff";

        for(const r of arr) {
            ctx.beginPath()
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath()
            x += r * Math.cos(t/r);
            y += r * Math.sin(t/r);
        }

        seq.unshift([x, y]);

        if(seq.length > 1000)
            seq.pop();
    }

    const drawGraph = () => {
        let x = 500;

        ctx.strokeStyle = "#ffffff66";
        ctx.beginPath();
        ctx.moveTo(seq[0][0], seq[0][1]);
        ctx.lineTo(x, seq[0][1]);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "#ffffff";
        ctx.beginPath();

        for(const [, y] of seq) {
            ctx.lineTo(x, y);
            x++;
        }

        ctx.stroke();
        ctx.closePath()
    }

    let t = 0;


    let last = Date.now();
    let start = last;

    const draw = () => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const now = Date.now();
        const delta = now - last;
        last = now;

        t += delta / (2*Math.PI);

        drawFourierCircles(ctx.canvas.height/3, ctx.canvas.height/2, arr, t)
        drawGraph();


        requestAnimationFrame(draw);
    }

    draw();
}

export default waveFromCircles;