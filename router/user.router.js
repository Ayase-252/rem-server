/**
 * Router for user API
 *
 * Deployed on /api/user
 *
 * @author Ayase-252(bitdqy@hotmail.com)
**/

import express from 'express'
import { User } from '../module/user/user'

const userRouter = express.Router()

/**
 * GET /api/user/
 *
 * It should return a list of avaliable APIs in user operation.
 *
 * If request don't accept 'application/json', server will response with 406
 * error.
 */
userRouter.get('/', (req, res) => {
  if (!req.accepts('application/json')) {
    res.sendStatus(406)
    return
  }
  const avaliableAPIs = []
  res.json(avaliableAPIs)
})

/**
 * POST /api/user/
 *
 * By requesting this URL by POST method. Server will try to register a new user.
 *
 * Request:
 * Incoming request is expected to carry registration infromation in json. It
 * should have following properties.
 * username: String
 * password: String(comply with password policy)
 * (Password should be encoded in base64 in transmission)
 * secureEmail: String
 *
 * Some additional info is optional, such as,
 * contactEmail: String
 * firstName: String
 * lastName: String
 * @see /module/user/user User
 *
 * Response:
 * If registration succeeds, response will carry user information.
 * If registration failed, server will response with status code
 *
 */
userRouter.post('/', (req, res) => {
  if (!req.accepts('application/json')) {
    return res.sendStatus(406)
  }

  if (!req.body.username | !req.body.password | !req.body.secureEmail) {
    return res.status(400).json({
      error: 'Bad Request',
      describe: 'Miss essential field.'
    })
  }

  let { username, password, secureEmail,
    firstName, lastName, contactEmail } = req.body
  password = Buffer.from(password, 'base64').toString('ascii')
  const userInfo = {firstName, lastName, contactEmail}
  User.register(username, password, secureEmail, userInfo)
  .then(
    // On success
    (newUser) => {
      const {userId, userInfo} = newUser
      res.status(201).json({userId, userInfo})
    },
    (err) => {
      res.status(400).json({
        error: 'Validation Error',
        describe: err.message
      })
    }
  )
})

export default userRouter
