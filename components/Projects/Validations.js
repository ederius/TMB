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
    check('usersId')
      .isArray().withMessage(constants.validations.array)
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

exports.validateAddUser = [
  check('userId')
    .isString().withMessage(constants.validations.string)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
  check('projectId')
    .isString().withMessage(constants.validations.string)
    .exists().withMessage(constants.validations.exist)
    .not().withMessage(constants.validations.not),
]