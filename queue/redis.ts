import { createClient } from 'redis';

import { QT, IQueue } from '../types';
import { REDIS_URL } from '../config';
import { sleep } from '../utils';

class RedisQueue implements IQueue {
    queueName = 'random';
    client = createClient({ url: REDIS_URL });

    async init() {
        await this.client.connect();
        await this.client.del(this.queueName);
    }

    destroy() {
        this.client.destroy();
    }

    async put(value: QT) {
        await this.client.lPush(this.queueName, String(value));
    }

    async get(): Promise<QT> {
        let value = await this.client.rPop(this.queueName);
        while (value === null) {
            await sleep();
            value = await this.client.rPop(this.queueName);
        }

        return Number(value);
    }
} 

export default RedisQueue;
