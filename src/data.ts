import fs from "fs";

function loadData(filename: string): number[] {
    return fs.readFileSync(filename).toString().split("\n").map(eval).filter((n) => n !== undefined);
}

export default loadData;
