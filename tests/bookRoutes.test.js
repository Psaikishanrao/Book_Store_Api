require('dotenv').config();
jest.mock('../services/redisClient', () => require('../services/redisClientMock')());

const mongoose = require('mongoose');
const { app, server, redisClient } = require('../index');
const request = require('supertest');
const Book = require('../models/book');

describe('Book Store API Tests with Redis Mock', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
    });

    afterAll(async () => {
        if (redisClient) {
            await redisClient.quit();
        }

        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log('MongoDB disconnected successfully!');
        }

        if (server && server.close) {
            await new Promise((resolve, reject) => {
                server.close((err) => (err ? reject(err) : resolve()));
            });
        }
    });
    beforeEach(async () => {
        await Book.deleteMany({});
        console.log('Relevant test data cleaned up.');
    });

    afterEach(async () => {
        await Book.deleteMany({});
        console.log('Post-test cleanup done.');
    });

    it('GET /books - should fetch books (database and cache)', async () => {
        const firstRes = await request(app)
            .get('/books')
            .set('x-user-id', 'user1')
            .set('x-role', 'Admin');
        expect(firstRes.status).toBe(200);

        const secondRes = await request(app)
            .get('/books')
            .set('x-user-id', 'user1')
            .set('x-role', 'Admin');
        expect(secondRes.status).toBe(200);
    });

    it('POST /books - should allow Admin and block User', async () => {
        const adminRes = await request(app)
            .post('/books')
            .send({ title: 'Test Book', author: 'Author' })
            .set('x-user-id', 'admin1')
            .set('x-role', 'Admin');
        expect(adminRes.status).toBe(201);

        const userRes = await request(app)
            .post('/books')
            .send({ title: 'User Book', author: 'Author' })
            .set('x-user-id', 'user1')
            .set('x-role', 'User');
        expect(userRes.status).toBe(403);
    });
});