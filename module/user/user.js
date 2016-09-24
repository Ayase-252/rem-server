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
 */

import assert from 'assert'
import { UserModel } from './user.model'


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
   * @param {String} username                 Username
   * @param {Object} userInfo                 An object about user information such as name
   * @param {String} userInfo.firstName       First name of user
   * @param {String} userInfo.lastName        Last name of user
   * @param {String} userInfo.contactEmail    Email address to contect user
   *
   */
  constructor(username, userInfo) {

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
    //
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
   * @resolves  {}
   * @rejects   {}
   */
  static regist(username, password, secureEmail, userInfo) {

  }

  static authenticate() {

  }
}

export { User }
