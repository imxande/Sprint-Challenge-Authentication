// importing data base config
const db = require('../database/dbConfig.js');

// importing supertest, calling it "request" is a common practice 
const request = require('supertest');

// importing server
const server = require('../api/server.js')

describe('POST /register', () => {
    beforeEach(async() => {
        await db('users')
            .truncate();
    })

    it('should create new user', async () => {
         // do a get request to our api (server.js) and inspect the response        
        const user = await request(server).post('/api/auth/register')
            .send({ username: 'Sarah Kerrigan', password: 'Queen-of-Blades' })
            expect(user.body.username).toMatch(/Sarah Kerrigan/)

    })

    it('should return a status of 201', async () => {
        const response = await request(server).post('/api/auth/register')
        .send({ username: 'Sarah Kerrigan', password: 'Queen-of-Blades' })
        expect(response.status).toBe(201)
    })

})
