const express = require('express')
const projectsRoutes = express.Router()
// class
const ProjectsControllers = require('./Controllers')
// validations
const validationsProjects = require('./Validations')
const { isRegisteredUser } = require('../../utils/auth')

// projects routes
projectsRoutes
  .post('/api/v1/project', isRegisteredUser, validationsProjects.validateCreate, ProjectsControllers.create)
  .get('/api/v1/projects', isRegisteredUser, validationsProjects.validateList, ProjectsControllers.list)
  .put('/api/v1/project/:_id', isRegisteredUser, ProjectsControllers.update)
  .delete('/api/v1/project/:_id', isRegisteredUser, ProjectsControllers.delete)


  module.exports = projectsRoutes