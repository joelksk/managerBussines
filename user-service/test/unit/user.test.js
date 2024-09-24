import request from 'supertest';
import mongoose from 'mongoose'
import {app , server} from '../../src/app.js';

describe('User API', () => {

    afterAll(async () => {
        const collections = await mongoose.connection.db.collections();
  
        for (let collection of collections) {
            try {
            await collection.deleteMany({});
            } catch (error) {
            console.log(`Error to delete many elements of database ${collection.collectionName}:`, error);
            }
        }
    });

    afterAll(async () => {
        //Close Database
        await mongoose.connection.close();
    })

    afterAll((done) => {
        // Close the server when all tests have been finished
        server.close(done);
    });

    it('should register a user and create a business', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'password123',
                email: 'emailtest@gmail.com',
                businessName: 'Negocio Test',
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('business');
    });

    it('should login with valid credentials', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should return an error for user not found', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'nonexistentuser',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('User not found');
    });
});
