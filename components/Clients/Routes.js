const express = require('express')
const clientsRoutes = express.Router()
// class
const ClientsControllers = require('./Controllers')
// validations
const validationsClients = require('./Validations')
const { isRegisteredUser } = require('../../utils/auth')

// Clients routes
clientsRoutes
  .post('/api/v1/client', isRegisteredUser, validationsClients.validateCreate, ClientsControllers.create)
  .put('/api/v1/client/:_id', isRegisteredUser, ClientsControllers.update)
  .get('/api/v1/clients', isRegisteredUser, validationsClients.validateList, ClientsControllers.list)


  module.exports = clientsRoutes