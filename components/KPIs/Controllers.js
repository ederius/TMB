const KPIsClass = require('./KPIs')
const { validationResult } = require('express-validator/check')

exports.KPIProjects = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Clients = new KPIsClass(req)
            const response = await Clients.KPIProjects()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}

exports.KPIUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Clients = new KPIsClass(req)
            const response = await Clients.KPIUser()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}

exports.KPIUsersByProject = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Clients = new KPIsClass(req.query)
            const response = await Clients.KPIUsersByProject()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}
