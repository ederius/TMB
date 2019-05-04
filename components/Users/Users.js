// class
const DbsClass = require('./../Db/Db');
// services
const services = require('./Services');
// constantes
const Messages = require('../../constants/Messages');
// packages
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment-timezone');
const timestamp = moment().tz('America/Bogota');
const {verify} = require('jsonwebtoken');
const _ = require('lodash');
// utils
const Utils = require('../../utils/utils');

module.exports = class Users {
  constructor(context) {
      this.context = context
  }

  async signin() {
    try {
        let data = this.context
        let user = await global.Db.collection('users').findOne({
            email: data.email
        }, {w: 'majority'});
        if (user) {
            const savePassword = verify(user.password, process.env.CODE_HASH_PASSWORD).value;
            if (savePassword === data.password) {
            const token = await services.generateTokenSignin(String(user._id));
            await services.saveSesion(user);
            return {code: 1, message: Messages.signin.success, token, user};
            } else {
            return {code: 2, message: Messages.signin.errors['1']};
            }
        } else {
            return {code: 2, message: Messages.signin.errors['1']};
        }
    } catch (errors) {
      console.log(errors);
      return {code: 0, message: Messages.serverError, errors};
    }
  }

  async signup() {
    try {
        let data = this.context
        data.password = await services.hashPassword(data.password);
        const result = await Utils.insertOne('users', data);
        return {code: 1, message: "Signup user successfully!!", user: result.ops[0]};
    } catch (errors) {
      console.log(errors);
      return {code: 0, message: Messages.serverError, errors};
    }
  }

};
