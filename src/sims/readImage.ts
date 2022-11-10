const readImaged = (src: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            const canvas = document.createElement("canvas") 
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");

            if(!ctx)
                return;

            ctx.drawImage(img, 0, 0);

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let arr: [number, number][] = [];

            while(arr.length < 5000) {
                const threshold = 110;
                const c = Math.random() * threshold;
                const x = Math.floor(Math.random() * img.width);
                const y = Math.floor(Math.random() * img.height);

                if(arr.find(([x1, y1]) => x1 == x && y1 == y))
                    continue;

                const i = (x + y * imgData.width) * 4;

                const r = imgData.data[i];
                const g = imgData.data[i+1];
                const b = imgData.data[i+2];

                const avg = (r + g)/2;

                if(avg < c) {
                    if(arr.length < 2) {
                        arr.push([x, y]);
                    } else {
                        let cur = 0;
                        let dist = Infinity;

                        for(let i = 0; i < arr.length-1; i++) {
                            const [xl, yl] = arr[i];
                            const [xr, yr] = arr[i+1];
                            const dl = Math.sqrt(Math.pow(xl-x, 2) + Math.pow(yl-y, 2));
                            const dr = Math.sqrt(Math.pow(xr-x, 2) + Math.pow(yr-y, 2));

                            if(dist > dl + dr) {
                                dist = dl + dr;
                                cur = i;
                            }
                        }

                        arr.splice(cur+1, 0, [x, y]);
                    }
                }
            }

            arr = arr.map(([x, y]) => [x-img.width/2, y-img.height/2]);
            arr = arr.map(([x, y]) => [x*3, y*3]);

            resolve(arr);
        }

        img.onerror = err => {
            reject(err);
        }

        img.src = src;
    })
}