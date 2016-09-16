import { Schema, connection } from './common'
import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  group: String,
  firstName: String,
  lastName: String,
  email: String
})

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    next()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
    if (error) {
      return next(error)
    }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error)
      }
      user.password = hash
      next()
    })
  })
})

/**
 * comparePassword - Compare candidate password with real password
 *
 * @param {String} candidatePassword
 * @param {Function} callback          error and isMatch will be passed into callback
 *
 * @returns {Undefined}
 */
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) {
      return callback(error)
    }
    callback(null, isMatch)
  })
}

const User = connection.model('User', userSchema)

export { User }
