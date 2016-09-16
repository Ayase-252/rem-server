import { Schema, connection } from './common'

const accessTokenScheme = new Schema({
  accessToken: { type: String, required: true, unique: true },
  clientId: String,
  userId: { type: String, required: true },
  expires: Date
})

const AccessToken = connection.model('oath_accesstoken', accessTokenScheme)

/**
 * getAccessToken - Get aceess token donated by token submitted by client
 *
 * @param {String} bearerToken   Client Access Token
 * @param {Function} callback    param error, document
 *
 */
const getAccessToken = (bearerToken, callback) => {
  AccessToken.findOne({ accessToken: bearerToken }, callback)
}

/**
 * saveAccessToken - Save access token
 *
 * @param {String} accessToken Token issued to client
 * @param {String} clientId    Client ID issued by server
 * @param {Date} expires       Time when the token expires
 * @param {String} userId      User authorising token
 * @param {Function} callback  param error
 *
 */
const saveAccessToken = (accessToken, clientId, expires, userId, callback) => {
  const fields = {
    clientId: clientId,
    userId: userId,
    expires: expires
  }

  AccessToken.update({ accessToken: accessToken },
    fields, { upsert: true },
    (error) => {
      callback(error)
    })
}

export { getAccessToken, saveAccessToken }
