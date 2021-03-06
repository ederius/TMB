const ProjectsClass = require('./Projects')
const { validationResult } = require('express-validator/check')

exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Projects = new ProjectsClass(req)
            const response = await Projects.create()
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
            const Projects = new ProjectsClass(req)
            const response = await Projects.update()
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
            const Projects = new ProjectsClass(req)
            const response = await Projects.list()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Projects = new ProjectsClass(req)
            const response = await Projects.delete()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}