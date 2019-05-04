// package
const { check } = require('express-validator/check')
// Message constantss
const constants = require('../../constants/Messages')

exports.validateKPIUserByProject = [
  check('projectId')
      .isMongoId().withMessage(constants.validations.isMongoId)
      .exists().withMessage(constants.validations.exist)
      .not().withMessage(constants.validations.not),
    check('userId')
      .isMongoId().withMessage(constants.validations.isMongoId)
      .exists().withMessage(constants.validations.exist)
      .not().withMessage(constants.validations.not)
]