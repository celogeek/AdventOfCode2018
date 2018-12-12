/* tslint:disable:no-console */
/* tslint:disable:interface-over-type-literal */

import loadData from "./data";

class Jobs {
    private tasks: {[key: string]: {
        dependencies: Set<string>,
        onReady: Set<string>,
    }};
    private ready: Set<string>;
    constructor() {
        this.tasks = {};
        this.ready = new Set();
    }

    public add(job: string, dependency: string) {
        [job, dependency].forEach((k) => {
            if (!this.tasks[k]) {
                this.tasks[k] = {
                    dependencies: new Set(),
                    onReady: new Set(),
                };
                this.ready.add(k);
            }
        });
        this.tasks[job].onReady.add(dependency);
        this.tasks[dependency].dependencies.add(job);
        this.ready.delete(dependency);
    }

    public results() {
        const r: string[][] = [];
        while (this.ready.size > 0) {
            const ready = [...this.ready];
            r.push(ready);
            for (const l of ready) {
                for (const d of this.tasks[l].onReady) {
                    this.tasks[d].dependencies.delete(l);
                    if (this.tasks[d].dependencies.size === 0) {
                        this.ready.add(d);
                    }
                }
                this.ready.delete(l);
            }
        }
        return r.map((vals) => vals.sort().join("")).join("");
    }
}

const jobs = new Jobs();

console.time();
loadData(__dirname + "/day7.txt").forEach((data) => {
    const job = data.substr(5, 1);
    const dependency = data.substr(36, 1);
    jobs.add(job, dependency);
});

console.log("Response:", jobs.results());
console.timeEnd();
