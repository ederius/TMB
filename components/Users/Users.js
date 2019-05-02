// class
const DbsClass = require('./../Db/Db');
// services
const services = require('./Services');
// constantes
const Messages = require('../../constants/messages');
// packages
const ObjectID = require('mongodb').ObjectID;
const moment = require('moment-timezone');
const timestamp = moment().tz('America/Bogota');
const {verify} = require('jsonwebtoken');
const _ = require('lodash');
// utils
const Utils = require('../../utils/Utils');
// Database
const DbClass = require('../Db/Db')
const DbInstance = new DbClass()

module.exports = class Users {
  constructor(context) {
      this.context = context
      this.Db = DbInstance.Db
  }

  async signin() {
    try {
        let data = this.context
        let user = await this.Db.collection('users').findOne({
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
        const result = await Utils.insertOne(this.Db, 'users', data);
        return {code: 1, message: "Signup user success!!", user: result.ops[0]};
    } catch (errors) {
      console.log(errors);
      return {code: 0, message: Messages.serverError, errors};
    }
  }

  async signout() {
    try {
      try {
        const token = await services.validateSendedToken(context.request);
        const _id = await services.validateTokenSignin(token);
        const result = await services.deleteCredentialsRedisUser(_id);
        return {code: 1, message: Messages.signout.success};
      } catch (error) {
        return {code: 1, message: error};
      }
    } catch (errors) {
      console.log(errors);
      return {code: 0, message: Messages.serverError, errors};
    }
  }


  async emailOrUsernameDuplicate(parent, args, context) {
    try {
      const user = await this.Db.collection('users').findOne({$or: [{'email': args.search}, {username: args.search}]});
      return !!user;
    } catch (errors) {
      console.log(errors);
      return {code: 0, message: Messages.serverError, errors};
    }
  }
};
