    
// package
const { check } = require('express-validator/check')
// Message constantss
const constants = require('../../constants/Messages')

exports.validateCreate = [
  check('name')
    .isString().withMessage(constants.validations.string)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
  check('email')
    .isEmail().withMessage(constants.validations.email)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
  check('password')
    .isLength({ min: 6 }).withMessage(constants.validations.length.min['6'])
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not)
]

exports.validateSignin = [
  check('email')
    .isEmail().withMessage(constants.validations.numeric)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
  check('password')
    .isLength({ min: 6 }).withMessage(constants.validations.length.min['6'])
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not)
]
