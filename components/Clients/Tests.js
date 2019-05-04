let assert = require('assert');
let supertest = require("supertest");
let should = require("should");

var server = supertest.agent("http://localhost:3000");

// tests Signup
describe('Clients', () => {
    let data = {
        email: 'madurito@venezuela.com',
        password:'1234567890'
    }
    // calling home page api
    return server
        .post("/api/v1/signin")
        .send(data)
        .expect(200) // THis is HTTP response
        .then(function (resSignin) {
            // HTTP status should be 200
            
            // test client register
            describe('#Client register test', () => {
                it('should return "Create client successfully!!"', async () => {
                    // calling home page api
                    return server
                        .post("/api/v1/signup")
                        .set('Authorization', `Bearer ${resSignin.token}`)
                        .send({name: "Alvaro Uribe"})
                        .expect(200) // THis is HTTP response
                        .then(function (res) {
                            // HTTP status should be 200
                            res.status.should.equal(200);
                            // Error key should be false.
                            assert(res.body.message, 'Create client successfully!!');
                        })
                        .catch((err) => {
                            console.log(err);
                            
                        });
                });
              });


        });
});