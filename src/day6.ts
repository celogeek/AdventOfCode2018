/* tslint:disable:no-console */
/* tslint:disable:interface-over-type-literal */

import lodash from "lodash";
import loadData from "./data";

class Point {
    public static globalId: number = 0;
    public static create(row: string) {
        const [x, y] = row.split(", ").map((v) => parseInt(v, 10));
        return new Point(x, y);
    }

    public id: number;
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.id = ++Point.globalId;
        this.x = x;
        this.y = y;
    }

    public distance(p: Point): number {
        return Math.abs(p.x - this.x) + Math.abs(p.y - this.y);
    }
}

const data = loadData(__dirname + "/day6.txt").map(Point.create);
let minX = lodash.min(data.map((v) => v.x));
let maxX = lodash.max(data.map((v) => v.x));
let minY = lodash.min(data.map((v) => v.y));
let maxY = lodash.max(data.map((v) => v.y));

data.forEach((d) => {
    d.x = d.x - minX + 10;
    d.y = d.y - minY + 10;
});
maxX = maxX - minX + 10;
minX = 10;
maxY = maxY - minY + 10;
minY = 10;

interface IResult {
    distance: number;
    isInfinite: boolean;
    point: Point;
}

const result: IResult[][][] = Array(maxX + 10).fill(null)
    .map(() => new Array(maxY + 10).fill(null).map((): IResult[] => []));

const closestPoints: {[key: number]: number} = {};
let largestAreaSize: number = 0;

for (let x = 0; x < maxX + 10; x++) {
    for (let y = 0; y < maxY + 10; y++) {
        const p = new Point(x, y);
        const sortedResult = lodash.sortBy(data.map((d) => {
            return {
                distance: d.distance(p),
                isInfinite: (x === 0) || (x === maxX + 10) || (y === 0) || (y === maxY + 10),
                point: d,
            };
        }), (d) => d.distance);
        const matchArea = sortedResult.filter((d) => d.distance === sortedResult[0].distance);
        if (matchArea.length === 1 && !matchArea[0].isInfinite) {
            closestPoints[matchArea[0].point.id] = (closestPoints[matchArea[0].point.id] || 0) + 1;
        }
        if (lodash.sumBy(sortedResult, (v) => v.distance) < 10000) {
            largestAreaSize += 1;
        }
    }
}

console.log("Part 1:", lodash.max(lodash.values(closestPoints)));
console.log("Part 2:", largestAreaSize);
