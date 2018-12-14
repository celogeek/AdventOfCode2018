/* tslint:disable:no-console */
/* tslint:disable:interface-over-type-literal */
/* tslint:disable:max-classes-per-file */

import lodash from "lodash";
import loadData from "./data";

class Task {
    public name: string;
    public pending: Set<Task>;
    public next: Set<Task>;
    constructor(name: string) {
        this.name = name;
        this.pending = new Set();
        this.next = new Set();
    }

    public ready() {
        return this.pending.size === 0;
    }

    public isBefore(t: Task) {
        this.next.add(t);
        t.pending.add(this);
    }

    public done() {
        this.next.forEach((t) => {
            t.pending.delete(this);
        });
    }
}

class Jobs {
    private jobs: {[key: string]: Task};
    private results: string[][];
    constructor() {
        this.jobs = {};
        this.results = [];

        loadData(__dirname + "/day7.txt").forEach((data) => {
            const job = data.substr(5, 1);
            const next = data.substr(36, 1);
            [job, next].forEach((t) => {
                if (!this.jobs[t]) {
                    this.jobs[t] = new Task(t);
                }
            });
            this.jobs[job].isBefore(this.jobs[next]);
        });
    }

    public resolve() {
        const result: string[] = [];
        lodash.filter(lodash.values(this.jobs), (v: Task) => v.pending.size === 0).forEach((t) => {
            result.push(t.name);
            t.next.forEach((v) => {
                v.pending.delete(t);
            });
        });
        if (result.length > 0) {
            this.results.push(result);
            result.forEach((v) => delete this.jobs[v]);
            this.resolve();
        }
    }

    public solution() {
        return this.results.map((v) => v.sort().join("")).join("");
    }
}

const jobs = new Jobs();
jobs.resolve();

console.log("Part1:", jobs.solution());
