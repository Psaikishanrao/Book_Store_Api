function createRedisClientMock() {
    const store = new Map();
    console.log('Mock Redis client initialized');

    return {
        async get(key) {
            return store.get(key) || null;
        },
        async set(key, value) {
            store.set(key, value);
        },
        async del(key) {
            store.delete(key);
        },
        async quit() {
            console.log('Mock Redis client quitting');
            return Promise.resolve();
        },
    };
}

module.exports = createRedisClientMock;
