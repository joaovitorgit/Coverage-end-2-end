const {describe, it} = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')


describe('API Suite test',()=>{
    describe('/contact', ()=>{
        it('Should return HTTP status 200 when requesting /contact', async()=>{
            const response = await request(app)
                                    .get('/contact')
                                    .expect(200)
            
            assert.deepStrictEqual(response.text, 'Contact us page')
        })
    })

    describe('/hello', ()=>{
        it('Should return Hello World when requesting /hello', async()=>{
            const response = await request(app)
                                    .get('/hello')
                                    .expect(200)
            
            assert.deepStrictEqual(response.text, 'Hello World!')
        })
    })

    describe('/login', ()=>{
        it('Should login successfully and return HTTP status 200', async()=>{
            const response = await request(app)
                                    .post('/login')
                                    .send({username: 'joaovitor', password:'root'})
                                    .expect(200)
            
            assert.deepStrictEqual(response.text, 'Logging has succeded!')
        })
    })
    describe('/login', ()=>{
        it('Should unauthirize a return HTTP status 401 when requesting with wrong credentials ', async()=>{
            const response = await request(app)
                                    .post('/login')
                                    .send({username: 'wrong', password:'root'})
                                    .expect(401)
            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Logging has failed')
        })
    })
})