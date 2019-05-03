const express = require('express')
const KPIsRoutes = express.Router()
// class
const KPIsControllers = require('./Controllers')
// validations
const validationsKPIs = require('./Validations')

// KPIs routes
KPIsRoutes
  .get('/api/v1/KPI/projects', validationsKPIs.validateKPIsProjects, KPIsControllers.KPIProjects)
  .get('/api/v1/KPI/users', validationsKPIs.validateKPIsUser, KPIsControllers.KPIUser)
  .get('/api/v1/KPI/usersByProject', validationsKPIs.validateKPIUserByProject, KPIsControllers.KPIUsersByProject)


  module.exports = KPIsRoutes