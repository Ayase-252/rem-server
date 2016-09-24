/**
 * Validation error
 *
 * @desc      Validation Error are thrown when the form user submit does not
 *            comply with validation rules.
 *
 * @author    Ayase-252
 *
 * @requires  /module/error/abstract_error
 */

import { AbstractError } from './abstract_error'

/**
 *  Validation Error are thrown when the form user submit does not
 *  comply with validation rules.
 *
 * @class
 *
 * @extends AbstractError
 */
class ValidationError extends AbstractError {
  /**
   * Create an ValidationError.
   *
   * @constructor
   *
   * @param {String} invalidField   Field name which caused ValidationError
   * @param {String} invalidValue   Value which caused ValidationError
   * @param {String} invalidReason  Why the value is invalidated
   */
  constructor(invalidField, invalidValue, invalidReason) {
    const message = invalidField + ' with value ' + invalidValue +
      ' is failed to validate. Because ' + invalidReason
    super('Validation Error', message)
    this.errorDesc = {
      invalidField: invalidField,
      invalidValue: invalidValue,
      invalidReason: invalidReason
    }
  }
}

export { ValidationError }
