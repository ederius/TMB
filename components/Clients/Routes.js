const express = require('express')
const clientsRoutes = express.Router()
// class
const ClientsControllers = require('./Controllers')
// validations
const validationsClients = require('./Validations')

// Clients routes
clientsRoutes
  .post('/api/v1/client', validationsClients.validateCreate, ClientsControllers.create)
  .put('/api/v1/client/:_id', ClientsControllers.update)
  .get('/api/v1/clients', validationsClients.validateList, ClientsControllers.list)


  module.exports = clientsRoutes