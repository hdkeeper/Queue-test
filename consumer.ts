import { RANGE_MIN, RANGE_MAX } from './config';
import { QT } from './types';
import queue from './queue';

export type Stats = {
    value: QT;
    date: Date;
}[];

const MAX_ENTRIRS = RANGE_MAX - RANGE_MIN + 1;

export async function startConsumer(): Promise<Stats> {
    const stats: Stats = [];
    const seen = new Set<QT>();

    while (seen.size < MAX_ENTRIRS) {
        const value = await queue.get();
        if (!seen.has(value)) {
            seen.add(value);
            stats.push({ value, date: new Date() });
        }
    }

    return stats;
}
