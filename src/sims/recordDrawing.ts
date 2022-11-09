export const recordDrawing = (ctx: CanvasRenderingContext2D) => {
    return new Promise<[number, number][]>((response, reject) => {
        let time = 0;
        let arr: [number, number][] = [];
        let isDown = false; 

        ctx.canvas.onmousedown = e => {
            isDown = true;
            time = Date.now();
            console.log("down");
        } 

        ctx.canvas.onmousemove = e => {
            const now = Date.now();
            const delta = now - time;

            if(isDown && delta >= 10) {
                arr.push([
                    e.clientX,
                    e.clientY
                ]);

                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                ctx.strokeStyle = "#ffffff";

                ctx.beginPath();
                ctx.moveTo(arr[0][0], arr[0][1]);

                for(const [x, y] of arr) {
                    ctx.lineTo(x, y);
                }

                ctx.stroke();
                ctx.closePath();

                console.log(ctx);

                time = now;
            }
        }

        ctx.canvas.onmouseup = e => {
            isDown = false;
            ctx.canvas.onmousedown = null;
            ctx.canvas.onmouseup = null;
            ctx.canvas.onmousemove = null;
            arr = arr.map(([x, y]) => [x - ctx.canvas.width/2, y - ctx.canvas.height/2]);
            response(arr);
        } 
    })
}