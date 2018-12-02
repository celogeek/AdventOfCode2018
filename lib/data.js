"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function loadData() {
    return fs_1.default.readFileSync("./input.txt").toString().split("\n").map(eval).filter((n) => n !== undefined);
}
exports.data = loadData();
exports.default = exports.data;
