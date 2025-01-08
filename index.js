require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authMiddleware = require('./middlewares/authMiddleware');
const bookRoutes = require('./Routes/bookRoutes');
const connectDB = require('./db');
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis').default;
const Redis = require('ioredis');

const app = express();
const PORT = process.env.PORT || 3000;


const isTestEnv = process.env.NODE_ENV === 'test';
const redisClient = isTestEnv ? null : new Redis(process.env.REDIS_URL);

connectDB();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(authMiddleware);

const limiter = isTestEnv
    ? (req, res, next) => next() 
    : rateLimit({
          store: new RedisStore({
              sendCommand: (...args) => redisClient.call(...args),
          }),
          keyGenerator: (req) => req.headers['x-user-id'],
          windowMs: 60 * 1000, 
          max: 10,
          standardHeaders: true,
          legacyHeaders: false,
          message: {
              status: 429,
              error: 'Too many requests. Please try again later.',
          },
      });

app.use(limiter);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome to the Book Store API',
    });
});
app.use((req, res) => {
    res.status(404).json({
        status: 404,
        error: 'Resource not found',
    });
});

let server;
if (!isTestEnv) {
    server = app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = { app, server, redisClient };
