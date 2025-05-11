// Тип элементов очереди
export type QT = number;

// Интерфейс работы с очередью
export interface IQueue {
    init(): Promise<void>;
    destroy(): void;

    put(value: QT): Promise<void>;
    get(): Promise<QT>;
}
