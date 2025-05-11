import { QT, IQueue } from '../types';

const sleep = () => new Promise(resolve => queueMicrotask(() => resolve(undefined)));

class MemoryQueue implements IQueue {
    head = 0; 
    tail = 0;
    heap = new Map<number, QT>();

    isEmpty() {
        return (this.head == this.tail);
    } 

    async init() {}

    destroy() {
        console.debug('heap.size', this.heap.size);
        this.head = this.tail = 0;
        this.heap.clear();
    }

    async put(value: QT) {
        this.heap.set(this.head++, value);
    }

    async get(): Promise<QT> {
        while (this.isEmpty()) {
            await sleep();
        }

        const res = this.heap.get(this.tail);
        this.heap.delete(this.tail++);
        return res;
    }
}

export default MemoryQueue;
