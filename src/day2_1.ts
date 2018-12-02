/* tslint:disable:no-console */

import loadData from "./data";

const data = loadData(__dirname + "/day2.txt");

let match2 = 0;
let match3 = 0;
data.forEach((row) => {
    const count = new Map<string, number>();
    for (const l of row) {
        count.set(l, (count.get(l) || 0) + 1);
    }
    const result = new Set(count.values());
    if (result.has(2)) {
        match2++;
    }
    if (result.has(3)) {
        match3++;
    }
});

console.log(match2, "*", match3, "=", match2 * match3);
