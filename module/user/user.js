/**
 * User module
 *
 * @desc      Actions over user i.e. authentication and authorization, are
 *            implemented here.
 *
 * @author    Ayase-252(bitdqy@hotmail.com)
 *
 * @requires  /module/user/user.model
 */

import { UserModel } from './user.model'


/**
 * User - Representation of a user
 *
 * @desc  This class encapsulates methods over authentication, authorization,
 *        registration and so on.
 */
class User {
  constructor(username, password, secureEmail, firstName, lastName,
    contactEmail) {

  }

  /**
   * _validatePassword - Validate whether password follows given rules.
   *
   * @private
   *
   * @returns    {Promise}
   * @resolves  {}
   * @rejects   {ValidationError}
   */
  _validatePassword() {

  }

  /**
   * regist - Register user
   *
   * @returns   {Promise}
   * @resolves  {}
   * @rejects   {}
   */
  regist() {

  }
}
