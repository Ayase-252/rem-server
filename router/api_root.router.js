/**
 * Router of API root
 *
 * Deployed on /api/
 *
 * @author Ayase-252(bitdqy@hotmail.com)
 **/

import express from 'express'

const apiRoot = express.Router()

apiRoot.get('/', (req, res) => {
  const avaliableAPIs = [{
    url: '/api/user',
    desc: 'APIs for User Operations.'
  }]
  if (!req.accepts('application/json')) {
    res.sendStatus(406)
    return
  }
  res.json(avaliableAPIs)
})

export default apiRoot
