import fs from "fs";

function loadData(): number[] {
    return fs.readFileSync("./input.txt").toString().split("\n").map(eval).filter((n) => n !== undefined);
}

export const data = loadData();

export default data;
