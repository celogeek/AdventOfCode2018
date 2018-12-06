/* tslint:disable:no-console */
/* tslint:disable:interface-over-type-literal */

import loadData from "./data";

const data = loadData(__dirname + "/day5.txt")[0];

const letters = "abcdefghijklmnopqrstuvwxyz";
const reactChain = new Set<string>();
for (const l of letters) {
    reactChain.add(l + l.toUpperCase());
    reactChain.add(l.toUpperCase() + l);
}

function react(polymer: string) {
    const result: string[] = [];
    for (const l of polymer) {
        if (!result.length || !reactChain.has(result[result.length - 1] + l)) {
            result.push(l);
        } else {
            result.pop();
        }
    }
    return result.length;
}

let smallest: number = react(data);
console.log("Current:", smallest);
for (const l of letters) {
    const r = react(data.replace(new RegExp(l, "gi"), ""));
    console.log(l, r);
    if (r < smallest) {
        smallest = r;
    }
}
console.log("Smallest:", smallest);
