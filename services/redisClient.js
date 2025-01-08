const Redis = require('ioredis');

let redisClient;

if (process.env.NODE_ENV === 'test') {
    const RedisClientMock = require('./redisClientMock');
    redisClient = new RedisClientMock();
} else {
    redisClient = new Redis(process.env.REDIS_URL);
    redisClient.on('error', (err) => console.error('Redis error:', err));
}

module.exports = redisClient;
