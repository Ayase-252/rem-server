/**
 *  Abstract error class
 *
 *  @author       Ayase-252 (bitdqy@hotmail.com)
 *
 */

/**
 * Abstract base class for all errors.
 *
 * @class
 */
class AbstractError {

  /**
   * Create a Abstract Error
   *
   * @param {String} name     Name of errors
   * @param {String} message  Message describing the error
   */
  constructor(name = 'Abstract Error', message = '') {
    this.name = name
    this.message = message
  }

  /**
   * Return error represented in string
   *
   * @returns {String} errorString
   */
  toString() {
    return '[Error] ' + this.name + ': ' + this.message
  }
}

export { AbstractError }
