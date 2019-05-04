const express = require('express')
const KPIsRoutes = express.Router()
// class
const KPIsControllers = require('./Controllers')
// validations
const validationsKPIs = require('./Validations')
const { isRegisteredUser } = require('../../utils/auth')

// KPIs routes
KPIsRoutes
  .get('/api/v1/KPI/projects', isRegisteredUser, KPIsControllers.KPIProjects)
  .get('/api/v1/KPI/users', isRegisteredUser, KPIsControllers.KPIUser)
  .get('/api/v1/KPI/userByProject', isRegisteredUser, validationsKPIs.validateKPIUserByProject, KPIsControllers.KPIUsersByProject)

module.exports = KPIsRoutes