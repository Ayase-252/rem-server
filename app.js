require('babel-polyfill')

import mongoose from 'mongoose'

let connection = null

let connect = function (url = 'mongodb://localhost:27017/rem-backend') {
  connection = mongoose.createConnection(url)
}

export { connection, connect }
