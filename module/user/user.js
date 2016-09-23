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
   * The rule is TODO.
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
   * Register new user.
   *
   * @returns   {Promise}
   * @resolves  {}
   * @rejects   {}
   */
  static regist() {

  }

  static authenticate() {

  }
}

export { User }
