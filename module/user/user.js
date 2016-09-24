/**
 * User module
 *
 * @desc      Actions over user i.e. authentication and authorization, are
 *            implemented here.
 *
 * @author    Ayase-252(bitdqy@hotmail.com)
 *
 * @requires  assert
 * @requires  /module/user/user.model
 * @requires  /module/error/validation_error
 */

import assert from 'assert'
import { UserModel } from './user.model'
import { ValidationError } from '../error/validation_error'


const MIN_PASSWORD_LENGTH = 7

/**
 * Representation of a user
 *
 * @class
 */
class User {
  /**
   * Create an instance of User.
   * User code is forbidden to create a User instance directly.
   *
   * @constructor
   *
   * @param {String} userId                   User ID
   * @param {Object} userInfo                 An object about user information such as name
   * @param {String} userInfo.firstName       First name of user
   * @param {String} userInfo.lastName        Last name of user
   * @param {String} userInfo.contactEmail    Email address to contect user
   *
   */
  constructor(userId, userInfo) {
    Object.assign(this, { userId, userInfo })
  }

  /**
   * Validate whether password follows given rules.
   * The rules:
   * (1) The length of password must be equal or more than MIN_PASSWORD_LENGTH.
   *
   * @static
   * @private
   *
   * @param {String}    password    Password you wish to validate
   *
   * @returns {Boolean}             True if password is enforced in given rule.
   *                                False if not.
   * @throws {AssertionError}       If password is not a string, AssertionError will
   *                                be thrown.
   */
  static _validatePassword(password) {
    assert.strictEqual(typeof password, 'string')
    return password.length >= MIN_PASSWORD_LENGTH
  }

  /**
   * Validate whether email is a valid email address.
   *
   * @static
   * @private
   *
   * @param {String}    email       Email address
   *
   * @returns {Boolean}             True if email address is valid. False if not
   * @throws {AssertionError}       If email is not a string, AssertionError will
   *                                be thrown.
   */
  static _validateEmail(email) {
    assert.strictEqual(typeof email, 'string')
    return /^\w+@\w+\.\w+$/g.test(email)
  }

  /**
   * Register new user.
   *
   * @param {String} username                 Username
   * @param {String} password                 Password
   * @param {String} secureEmail              Email address to receive mail
   *                                          about account secure service
   * @param {Object} userInfo                 An object about user information
   *                                          such as name
   * @param {String} userInfo.firstName       First name of user
   * @param {String} userInfo.lastName        Last name of user
   * @param {String} userInfo.contactEmail    Email address to contect user
   *
   * @returns   {Promise}
   * @resolves  {User}
   * @rejects   {ValidationError} If any validation rule is violated,
   *                              ValidationError will be thrown.
   */
  static register(username, password, secureEmail, userInfo) {
    // Validate all field
    return new Promise(function (resolve, reject) {
      if (!User._validatePassword(password)) {
        reject(new ValidationError('password', password, 'Password does not ' +
          'comply with current policy.'))
        return
      }
      if (!User._validateEmail(secureEmail)) {
        reject(new ValidationError('secureEmail', secureEmail, 'Address is not ' +
          'formatted in correct format.'))
        return
      }

      const { firstName, lastName, contactEmail } = userInfo
      const user = new UserModel({
        username,
        password,
        secureEmail,
        firstName,
        lastName,
        contactEmail
      })

      user.save((error, doc) => {
        if (error) {
          reject(error)
        } else {
          const userId = doc._id
          const { firstName, lastName, contactEmail } = doc
          const userInfo = {
            firstName,
            lastName,
            contactEmail
          }
          const newUser = new User(userId, userInfo)
          resolve(newUser)
        }
      })
    })
  }

  static authenticate() {

  }
}

export { User }
