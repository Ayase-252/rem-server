require('babel-polyfill')

import mongoose from 'mongoose'

let connection = null

/**
 *
 * @deprecated
 */
const connect = function (url = 'mongodb://localhost:27017/rem-backend') {
  connection = mongoose.createConnection(url)
}

const makeConnection = function (url = 'mongodb://localhost:27017/rem-backend') {
  const connection = mongoose.createConnection(url)
  return connection
}
export { connection, connect, makeConnection }
