/* tslint:disable:no-console */

import loadData from "./data";

class Fabric {
    public id: number;
    public top: number;
    public left: number;
    public width: number;
    public height: number;
    constructor(params: string) {
        const m = params.match(/\d+/g);
        if (m === null) {
            throw new Error("bad entry " + params);
        }
        [this.id, this.left, this.top, this.width, this.height] = m.map((x) => parseInt(x, 10));
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

const result: number[][][] = new Array(1000).fill(null).map(() => new Array(1000).fill(null).map(() => []));
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
