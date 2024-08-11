const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Tests', () => {
    it('should signup a new user', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                username: 'testuser',
                email: 'testuser@test.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
