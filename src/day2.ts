/* tslint:disable:no-console */

import loadData from "./data";

const data = loadData(__dirname + "/day2.txt");

let match2 = 0;
let match3 = 0;
const match: string[] = [];
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
    if (result.has(2) || result.has(3)) {
        match.push(row);
    }
});

console.log("CHECKSUM:", match2, "*", match3, "=", match2 * match3);
for (const a of match) {
    for (const b of match) {
        if (a === b) {
            continue;
        }
        let d = 0;
        let letters = "";
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                d++;
            } else {
                letters += a[i];
            }
        }
        if (d === 1) {
            console.log("Response", letters);
            process.exit(0);
        }
    }
}
