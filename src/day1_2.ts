/* tslint:disable:no-console */

import loadData from "./data";

const data = loadData(__dirname + "/day1.txt");
const results: Set<number> = new Set();
let r = 0;
while ( true ) {
    data.forEach((d) => {
        r += d;
        if (results.has(r)) {
            console.log(r);
            process.exit(0);
        }
        results.add(r);
    });
}
