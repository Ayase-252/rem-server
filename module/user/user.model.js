/**
 * Model of User
 *
 *
 * @author    Ayase-252(bitdqy@hotmail.com)
 *
 * @requires  bcrypt
 * @requires  /common
 */

import bcrypt from 'bcrypt'
import { Schema, Connection } from '../../common'

const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  // Login Credential
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },

  // User information
  group: String,
  secureEmail: { type: String, required: true },
  contactEmail: String,
  firstName: String,
  lastName: String
})

/**
 * Hook of save method to encrypt user password
 *
 * Only document method save() is hooked.
 */

userSchema.pre('save', function (next) {
  const user = this
    // Nothing is modified
  if (!user.isModified('password')) {
    next()
  }

  bcrypt.hash(user.password, SALT_WORK_FACTOR, (error, hash) => {
    if (error) {
      next(error)
    } else {
      user.password = hash
      next()
    }
  })
})

/**
 * comparePassword - Compare candidate password with real password
 *
 * @param {String} candidatePassword
 * @param {Function} callback          error and isMatch will be passed into callback
 *
 */
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  const user = this
  bcrypt.compare(candidatePassword, user.password, (error, isMatch) => {
    if (error) {
      callback(error)
    }
    callback(null, isMatch)
  })
}

const UserModel = Connection.getConnection().model('User', userSchema)

export { UserModel }
