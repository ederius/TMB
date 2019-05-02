const express = require('express')
const tasksRoutes = express.Router()
// controllers
const TasksController = require('./Controllers')
// validations
const tasksValidations = require('./Validations')
const { isRegisteredUser } = require('../../utils/auth')

// projects routes
tasksRoutes
  .post('/api/v1/task', isRegisteredUser, tasksValidations.validateCreate, TasksController.create)
  .put('/api/v1/task/:_id', isRegisteredUser, TasksController.update)
  .get('/api/v1/tasks', isRegisteredUser, tasksValidations.validateList, TasksController.list)
  .post('/api/v1/task/start', isRegisteredUser, tasksValidations.validateStartTask, TasksController.startTask)
  .post('/api/v1/task/stop', isRegisteredUser, tasksValidations.validateStopTask, TasksController.stopTask)

  module.exports = tasksRoutes