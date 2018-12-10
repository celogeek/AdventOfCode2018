/* tslint:disable:no-console */
/* tslint:disable:interface-over-type-literal */

import lodash from "lodash";
import loadData from "./data";

const result: {
    [key: string]: Set<string>,
} = {};

loadData(__dirname + "/day7.txt").forEach((data) => {
    const letter = data.substr(5, 1);
    const nextLetter = data.substr(36, 1);
    if (!result[letter]) {
        result[letter] = new Set();
    }
    if (!result[nextLetter]) {
        result[nextLetter] = new Set();
    }
    result[nextLetter].add(letter);
});

let finalOrder: string = "";
while (lodash.values(result).length) {
    const nextLetters = lodash.entries(result).filter((x) => x[1].size === 0).map((v) => v[0])
    const nextLetter = nextLetters.sort()[0];
    finalOrder += nextLetter;
    lodash.values(result).forEach((r) => r.delete(nextLetter));
    delete result[nextLetter];

    // console.log(finalOrder);
    // console.log(result);
}

console.log(finalOrder);
