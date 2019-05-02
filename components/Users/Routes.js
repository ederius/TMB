const express = require('express')
let UsersRoutes = express.Router()
const UserValidation = require('./Validations')
const UserController =  require('./Controllers')

// users routes
UsersRoutes
  .post('/api/v1/signin', UserValidation.validateSignin, UserController.signin)
  .post('/api/v1/signup', UserValidation.validateCreate, UserController.signup)

module.exports = UsersRoutes