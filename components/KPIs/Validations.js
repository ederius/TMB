// package
const { check } = require('express-validator/check')
// Message constantss
const constants = require('../../constants/Messages')

exports.validateKPIsProjects = [
    check('projectId')
      .isMongoId().withMessage(constants.validations.isMongoId)
      .exists().withMessage(constants.validations.exist)
      .not().withMessage(constants.validations.not)
]

exports.validateKPIsUser = [
  check('UserId')
      .isMongoId().withMessage(constants.validations.isMongoId)
      .exists().withMessage(constants.validations.exist)
      .not().withMessage(constants.validations.not)
]

exports.validateKPIUserByProject = [
  check('projectId')
      .isMongoId().withMessage(constants.validations.isMongoId)
      .exists().withMessage(constants.validations.exist)
      .not().withMessage(constants.validations.not),
    check('UserId')
      .isMongoId().withMessage(constants.validations.isMongoId)
      .exists().withMessage(constants.validations.exist)
      .not().withMessage(constants.validations.not)
]