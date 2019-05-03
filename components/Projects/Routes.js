const express = require('express')
const projectsRoutes = express.Router()
// class
const ProjectsControllers = require('./Controllers')
// validations
const validationsProjects = require('./Validations')

// projects routes
projectsRoutes
  .post('/api/v1/project', validationsProjects.validateCreate, ProjectsControllers.create)
  .get('/api/v1/projects', validationsProjects.validateList, ProjectsControllers.list)
  .put('/api/v1/project/:_id', ProjectsControllers.update)
  .delete('/api/v1/project/:_id', ProjectsControllers.delete)


  module.exports = projectsRoutes