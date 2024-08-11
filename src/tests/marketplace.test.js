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

describe('Marketplace Tests', () => {
    it('should get all published assets', async () => {
        const res = await request(app).get('/marketplace');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('should request to buy an asset', async () => {
        const res = await request(app)
            .post('/marketplace/request/assetId')
            .set('Authorization', `Bearer ${token}`)
            .send({
                proposedPrice: 500
            });
        expect(res.statusCode).toEqual(201);
    });
});
