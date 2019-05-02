const TasksClass = require('./Tasks')
const { validationResult } = require('express-validator/check')

exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Tasks = new TasksClass(req)
            const response = await Tasks.create()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}

exports.update = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Tasks = new TasksClass(req)
            const response = await Tasks.update()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}

exports.list = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Tasks = new TasksClass(req)
            const response = await Tasks.list()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}


exports.startTask = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Tasks = new TasksClass(req)
            const response = await Tasks.startTask()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}

exports.stopTask = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Tasks = new TasksClass(req)
            const response = await Tasks.stopTask()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}