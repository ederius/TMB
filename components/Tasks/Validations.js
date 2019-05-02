// package
const { check } = require('express-validator/check')
// Message constantss
const constants = require('../../constants/Messages')

exports.validateCreate = [
    check('name')
      .isString().withMessage(constants.validations.string)
      .exists().withMessage(constants.validations.exist)
      .not().withMessage(constants.validations.not),
    check('description')
      .isString().withMessage(constants.validations.string)
      .exists().withMessage(constants.validations.exist)
      .not().withMessage(constants.validations.not),
]

exports.validateList = [
  check('pageNumber')
    .isNumeric().withMessage(constants.validations.numeric)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
  check('elementsNumber')
    .isNumeric().withMessage(constants.validations.numeric)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
]

exports.validateStartTask = [
  check('taskId')
  .isString().withMessage(constants.validations.string)
  .exists().withMessage(constants.validations.exist)
  .not().withMessage(constants.validations.not),
check('start')
  .toDate().withMessage(constants.validations.numeric)
  .isISO8601().withMessage(constants.validations.ISODate)
  .exists().withMessage(constants.validations.exist)
  .not().withMessage(constants.validations.not),
]

exports.validateStopTask = [
  check('taskId')
    .isString().withMessage(constants.validations.string)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
  check('start')
    .toDate().withMessage(constants.validations.numeric)
    .isISO8601().withMessage(constants.validations.ISODate)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
  check('stop')
    .isString().withMessage(constants.validations.string)
    .isISO8601().withMessage(constants.validations.ISODate)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
]