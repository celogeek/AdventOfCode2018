/* tslint:disable:no-console */

import {data} from "./data";

const result = data.reduce((previous, next) => previous + next, 0);

console.log(result);
