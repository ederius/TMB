// packages
const { sign, verify } = require('jsonwebtoken')
const redis = require("redis")
const redisClient = redis.createClient()
const Messages = require('../constants/Messages')

exports.isRegisteredUser = async (req, res, next) => {
    try {
        req.token = await validateSendedToken(req)
        req.credentialId = await validateTokenSignin(req.token)
        req.user = await isRegisteredUser(req.credentialId)
        next()
    } catch (error) {
        res.status('401').send({ code: 3, auth: false, message: "Inauthorized", error: error })
    }
}

const validateSendedToken = req => {
    return new Promise((resolve, reject) => {
      let bearerHeader = req.headers["authorization"]
      if (typeof bearerHeader !== 'undefined') {
        let bearer = bearerHeader.split(" ")
        let bearerToken = bearer[1]
        resolve(bearerToken)
      } else {
        reject(Messages.auth.errors.tokenDontSended)
      }
    })
  }

  const validateTokenSignin = token => {
    return new Promise(async (resolve, reject) => {
      verify(token, process.env.CODE_CREDENTIALS, function (err, decoded) {
        if (!err) {
          let stringId = String(decoded._id)
          redisClient.hexists("sessions", stringId, function (err, rep) {
            if (err) {
              reject(Messages.signin.errors.invalidToken)
            }
            if (rep === 1) {
              if (!stringId) {
                reject(Messages.signin.errors.invalidToken)
              }
              resolve(stringId)
            } else {
              reject(Messages.signin.errors.invalidToken)
            }
          })
        } else {
          reject(Messages.signin.errors.invalidToken) 
        }
      })
    })
  }

  const isRegisteredUser = id => {
    return new Promise(async (resolve, reject) => {
      redisClient.hget("sessions", id, function (err, obj) {
        if (obj) {
            let user = JSON.parse(obj)
            resolve(user)
        } else {
          reject(err)
        }
      })
    })
  }