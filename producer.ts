import { PRODUCERS, RANGE_MIN, RANGE_MAX } from './config';
import queue from './queue';

let isRunning = false;

async function produce() {
    while (isRunning) {
        const value = Math.round(Math.random() * (RANGE_MAX - RANGE_MIN)) + RANGE_MIN;
        await queue.put(value);
    }
}

export async function startProducers() {
    isRunning = true;
    const prods: Promise<void>[] = [];
    for (let i = 0; i < PRODUCERS; i++) {
        prods.push(produce());
    }

    await Promise.all(prods);
}

export function stopProducers() {
    isRunning = false;
}
