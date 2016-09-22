/**
 * Common library of rem-backend
 *
 * @author  Ayase-252(bitdqy@hotmail.com)
 *
 * @requires  mongoose
 * @requires  assert
 * @requires  /app
 */


import mongoose from 'mongoose'
import assert from 'assert'
import { makeConnection } from './app'

/**
 * Connection - Wrap class of connection
 *
 * @class
 */
class Connection {

  /**
   * setConnection - Set database connection
   *
   * @static
   * @desc  In prodution environment, url should be set to
   *        mongodb://localhost:27017/rem-backend
   * @param {String} url      Database URL
   *
   */
  static setConnection(url) {
    Connection.connection = mongoose.createConnection(url)
  }

  /**
   * getConnection - Get database connection
   *
   * @static
   *
   * @returns {Mongoose.Connection} Connection object
   * @throws  AssertionError  If Connection.connection is not defined
   */
  static getConnection() {
    assert.notStrictEqual(typeof Connection.connection, 'undefined',
      'Connection is not specified.')
    return Connection.connection
  }
}

const Schema = mongoose.Schema

export { Schema, makeConnection, Connection }
