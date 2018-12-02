/* tslint:disable:no-console */

import loadData from "./data";

const data = loadData(__dirname + "/day1.txt");
const result = data.reduce((previous, next) => previous + next, 0);

console.log(result);
