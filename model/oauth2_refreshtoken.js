import { Schema, connection } from './common'

const refreshTokenScheme = new Schema({
  refreshToken: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  clientId: String,
  expires: Date
})

const RefreshToken = connection.model('oath_refreshToken', refreshTokenScheme)

/**
 * saveRefreshToken - Save refresh token
 *
 * @param {String} refreshToken Refresh token assigned to user
 * @param {String} clientId     Client ID
 * @param {Date} expires        Expire time of refresh token
 * @param {String} userId       User authorising the token
 * @param {Function} callback   Param error, result
 *
 */
const saveRefreshToken = (refreshToken, clientId, expires, userId, callback) => {
  if (userId.id) {
    userId = userId.id
  }
  const refreshTokenObj = new RefreshToken({
    refreshToken: refreshToken,
    clientId: clientId,
    userId: userId,
    expires: expires
  })
  refreshTokenObj.save(callback)
}

/**
 * getRefreshToken - Get refresh token
 *
 * @param {String} refreshToken   Refresh token
 * @param {Function} callback     Param error, token
 *
 */
const getRefreshToken = (refreshToken, callback) => {
  RefreshToken.findOne({ refreshToken: refreshToken }, (error, token) => {
    if (token) {
      token.user = token.userId
    }
    callback(error, token)
  })
}


export { saveRefreshToken, getRefreshToken }
