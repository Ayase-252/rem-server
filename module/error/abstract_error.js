/**
 *  Abstract error class
 *
 *  @author       Ayase-252 (bitdqy@hotmail.com)
 *
 */

/**
 * AbstractError - Abstract base class for all errors
 *
 * @class
 */
class AbstractError {

  /**
   * constructor - Create a Abstract Error
   *
   * @param {String} name     Name of errors
   * @param {String} message  Message describing the error
   */
  constructor(name = 'Anstract Error', message = '') {
    this.name = name
    this.message = message
  }

  /**
   * toString - Return error represented in string
   *
   * @returns {String} errorString
   */
  toString() {
    return 'Error ' + this.name + ': ' + this.message
  }
}

export { AbstractError }
