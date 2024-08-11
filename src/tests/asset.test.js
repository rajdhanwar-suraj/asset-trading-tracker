const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

let token;

beforeAll(async () => {
    const res = await request(app)
        .post('/auth/login')
        .send({
            username: 'testuser',
            password: 'password123'
        });
    token = res.body.token;
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Asset Tests', () => {
    it('should create a new asset', async () => {
        const res = await request(app)
            .post('/assets/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Asset',
                description: 'Test description',
                image: 'test.jpg'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('assetId');
    });

    it('should get user assets', async () => {
        const res = await request(app)
            .get('/assets')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
