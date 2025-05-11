export const sleep = () => new Promise(resolve => queueMicrotask(() => resolve(undefined)));
