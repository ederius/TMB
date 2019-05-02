const UserClass = require('./Users')
const { validationResult } = require('express-validator/check')

exports.signin = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Users = new UserClass(req.body)
            const response = await Users.signin()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            const Users = new UserClass(req.body)
            const response = await Users.signup()
            res.status(200).send(response)
        }else{
            res.status(400).send({ code: 4, message: "Validation errors", error: errors.array() })
        }
    } catch (errors) {
        res.status(400).send(errors)
    }
}