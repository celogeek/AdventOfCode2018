"use strict";
/* tslint:disable:no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const result = data_1.data.reduce((previous, next) => previous + next, 0);
console.log(result);
