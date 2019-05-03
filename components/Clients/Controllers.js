const ClientsClass = require('./Clients')
const { validationResult } = require('express-validator/check')

exports.create = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Clients = new ClientsClass(req)
            const response = await Clients.create()
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
            const Clients = new ClientsClass(req)
            const response = await Clients.update()
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
            const Clients = new ClientsClass(req)
            const response = await Clients.list()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}
