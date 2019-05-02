// packages
const {sign, verify} = require('jsonwebtoken');
const redis = require('redis');
// constants
const Messages = require('../../constants/messages');
const redisClient = redis.createClient();
const expireJwtSignin = {expiresIn: '24hr'};


exports.generateTokenSignin = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await sign({_id}, process.env.CODE_CREDENTIALS, expireJwtSignin);
      resolve(token);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

exports.saveSesion = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const _id = String(data._id);
      data = JSON.stringify(data);
      const save = await redisClient.hset('sessions', _id, data, redis.print);
      resolve(save);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

exports.validateSendedToken = (req) => {
  return new Promise((resolve, reject) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      resolve(bearerToken);
    } else {
      reject(Messages.auth.errors.tokenDontSended);
    }
  });
};

exports.validateTokenSignin = (token) => {
  return new Promise(async (resolve, reject) => {
    verify(token, process.env.CODE_CREDENTIALS, function(err, decoded) {
      if (!err) {
        const stringId = String(decoded._id);
        redisClient.hexists('sessions', stringId, function(err, rep) {
          if (err) {
            reject(Messages.signin.errors.invalidToken);
          }
          if (rep === 1) {
            if (!stringId) {
              reject(Messages.signin.errors.invalidToken);
            }
            resolve(stringId);
          } else {
            reject(Messages.signin.errors.invalidToken);
          }
        });
      } else {
        reject(Messages.signin.errors.invalidToken); // enviar code: 2 ccuando el token sea invalido, 3 cuando el token expiro
      }
    });
  });
};

exports.deleteCredentialsRedisUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await redisClient.del('sessions', id);
      resolve(result);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

exports.hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newPassword = await sign({value: password}, process.env.CODE_HASH_PASSWORD);
      resolve(newPassword);
    } catch (error) {
      reject(error);
    }
  });
};


