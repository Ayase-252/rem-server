// const should = require('should')
// const assert = require('assert')
import * as should from 'should'
import * as assert from 'assert'
import { connect } from '../app'
import { Connection } from '../common'

const url = 'mongodb://localhost:27017/rem-test'

connect(url)

Connection.setConnection(url)

const removeAllDocument = function (model, done) {
  model.find({}, function (error, docs) {
    assert.equal(null, error)
    let counter = docs.length
    docs.map(record => {
      record.remove(function (err) {
        assert.equal(null, err)
        counter--
        if (counter === 0) {
          done()
        }
      })
    })
    if (counter === 0) {
      done()
    }
  })
}

export { should, removeAllDocument }
