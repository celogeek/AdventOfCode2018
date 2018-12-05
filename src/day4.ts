/* tslint:disable:no-console */
/* tslint:disable:interface-over-type-literal */

import loadData from "./data";

const data = loadData(__dirname + "/day4.txt").sort();

class Guard {
    public id: number;
    public minutes: number[];
    public total: number;
    public mostFrequentlyMinute: number;
    constructor(id: number) {
        this.id = id;
        this.total = 0;
        this.minutes = Array(60).fill(0);
        this.mostFrequentlyMinute = 0;
    }
    public add(fallsasleep: number, wakeup: number) {
        this.total += wakeup - fallsasleep;
        for (let i = fallsasleep; i < wakeup; i++) {
            this.minutes[i] += 1;
            if (this.minutes[i] > this.minutes[this.mostFrequentlyMinute]) {
                this.mostFrequentlyMinute = i;
            }
        }
    }
}

type Result = {
    [key: number]: Guard,
};

function compute(): Result {
    const results: Result = {};
    let guard: number;
    let fallsasleep: number;

    data.forEach((d) => {
        // console.log(d);
        if (d.indexOf("Guard") >= 0) {
            guard = parseInt(d.substr(26), 10);
        } else {
            if (d.indexOf("falls asleep") >= 0) {
                fallsasleep = parseInt(d.substr(15, 2), 10);
            } else {
                const wakeup = parseInt(d.substr(15, 2), 10);
                const dt = d.substr(6, 5);
                if (!results[guard]) {
                    results[guard] = new Guard(guard);
                }
                results[guard].add(fallsasleep, wakeup);
            }
        }
    });
    return results;
}

function strategy1(results: Result) {
    let bestGuard: Guard;
    for (const g in results) {
        if (!bestGuard || bestGuard.total < results[g].total) {
            bestGuard = results[g];
        }
    }
    let bestMinutes: number = 0;
    bestGuard.minutes.forEach((v, i) => {
        if (bestGuard.minutes[i] > bestGuard.minutes[bestMinutes]) {
            bestMinutes = i;
        }
    });
    console.log("Stragegy 1", bestGuard.id, "*", bestMinutes, "=", bestGuard.id * bestMinutes);
}

function strategy2(results: Result) {
    let bestGuard: Guard;
    for (const g in results) {
        if (!bestGuard ||
            bestGuard.minutes[bestGuard.mostFrequentlyMinute] < results[g].minutes[results[g].mostFrequentlyMinute]
        ) {
            bestGuard = results[g];
        }
    }
    console.log(
        "Stragegy 2", bestGuard.id, "*", bestGuard.mostFrequentlyMinute, "=",
        bestGuard.id * bestGuard.mostFrequentlyMinute,
    );

}

function run() {
    const results = compute();
    strategy1(results);
    strategy2(results);
}

run();
