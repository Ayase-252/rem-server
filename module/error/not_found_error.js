/**
 * Not found error
 *
 * @author       Ayase-252 (bitdqy@hotmail.com)
 *
 * @requires     /module/error/abstract_error
 */

import { AbstractError } from './abstract_error'

/**
 * NotFoundError - Not found error
 *
 * @class
 *
 * @desc This error indicates that the document you want to find does not in
 *       database.
 */
class NotFoundError extends AbstractError {

  /**
   * constructor - Created a NotFoundError
   *
   * @param {String} modelName      Model name you queried
   * @param {String} conditionName  Property name you used to query
   * @param {String} conditionValue Property value you used to query
   *
   */
  constructor(modelName, conditionName, conditionValue) {
    const message = modelName + ' with condition that ' + conditionName +
                    ' = ' + conditionValue + ' doesn\'t exist in database.'
    super('Not Found Error', message)
    this.errorDesc = {
      modelName: modelName,
      conditionName: conditionName,
      conditionValue: conditionValue
    }
  }
}

export { NotFoundError }
