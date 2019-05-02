const express = require('express')
const usersRoutes = express.Router()
// class
const ProjectsClass = require('./Projects')
const Projects = new ProjectsClass()
// validations
const validationsProjects = require('./Validations')

// projects routes
usersRoutes
  .post('/api/v1/user', validationsProjects.validateCreate, Projects.create)


  module.exports = usersRoutes