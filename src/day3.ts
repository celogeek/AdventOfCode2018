/* tslint:disable:no-console */

import loadData from "./data";

class Fabric {
    public id: number;
    public top: number;
    public left: number;
    public width: number;
    public height: number;
    constructor(params: string) {
        const spl = params.replace(/[^0-9]+/g, " ").split(" ");
        this.id = parseInt(spl[1], 0);
        this.left = parseInt(spl[2], 10);
        this.top = parseInt(spl[3], 10);
        this.width = parseInt(spl[4], 10);
        this.height = parseInt(spl[5], 10);
    }

    public place(r: number[][][]): Set<number> {
        const overlap = new Set<number>();
        for (let w = this.left; w < this.left + this.width; w++) {
            for (let h = this.top; h < this.top + this.height; h++) {
                if (r[h][w].length) {
                    r[h][w].forEach((x) => overlap.add(x));
                }
                r[h][w].push(this.id);
            }
        }
        return overlap;
    }
}

const result: number[][][] = [];
for (let i = 0; i < 1200; i++) {
    result[i] = [];
    for (let j = 0; j < 1200; j++) {
        result[i][j] = [];
    }
}
const data = loadData(__dirname + "/day3.txt");
const goodId = new Set<number>();
data.forEach((d) => {
    const f = new Fabric(d);
    const overlap = f.place(result);
    if (overlap.size) {
        overlap.forEach((x) => goodId.delete(x));
    } else {
        goodId.add(f.id);
    }
});

let totalX = 0;
result.forEach((r) => {
    const Xs = r.filter((c) => c.length > 1);
    totalX += Xs.length;
});

console.log("X:", totalX);
console.log("GoodId", goodId);
