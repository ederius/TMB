let assert = require('assert');
let supertest = require("supertest");
let should = require("should");

var server = supertest.agent("http://localhost:3000");

// tests Signup
describe('Users', () => {
  describe('#Signup test', () => {
    it('should return "Signup user successfully!!"', async () => {
        let data = {
            name: 'Nicolas Maduro',
            email: 'madurito@venezuela.com',
            password:'1234567890'
        }
        // calling home page api
        return server
            .post("/api/v1/signup")
            .send(data)
            .expect(200) // THis is HTTP response
            .then(function (res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                assert(res.body.message, 'Signup user successfully!!');
            });
    });
  });
  describe('#Signin test', () => {
    it('should return "Success sign in"', async () => {
        let data = {
            email: 'madurito@venezuela.com',
            password:'1234567890'
        }
        // calling home page api
        return server
            .post("/api/v1/signin")
            .send(data)
            .expect(200) // THis is HTTP response
            .then(function (res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                assert(res.body.message, 'Success sign in');
            });
    });
  });
});