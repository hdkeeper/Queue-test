import * as fs from 'fs/promises';
import queue from './queue';
import { startProducers, stopProducers } from './producer';
import { startConsumer, Stats } from './consumer';

async function saveStats(timeSpent: number, numbersGenerated: Stats) {
    await fs.appendFile(
        'result.json',
        JSON.stringify({ timeSpent, numbersGenerated }, null, 2),
        { flag: 'w' }
    );
}

async function main() {
    await queue.init();
    const startAt = new Date();

    const producers = startProducers();
    const stats = await startConsumer();
    stopProducers();
    await producers;
    queue.destroy();

    const finishAt = new Date();    
    await saveStats(Number(finishAt) - Number(startAt), stats);
}

main();
