require('babel-polyfill')

import express from 'express'
import bodyParser from 'body-parser'
import user from './user.router'
import api from './api_root.router'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/api', api)
app.use('/api/user', user)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


export { app }
