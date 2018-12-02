import fs from "fs";

function loadData(filename: string): string[] {
    return fs.readFileSync(filename).toString().split("\n").filter((n) => n.length);
}

export default loadData;
