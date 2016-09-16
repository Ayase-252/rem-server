const should = require('should')
const assert = require('assert')
import { connect } from '../app'

const url = 'mongodb://localhost:27017/rem-test'

connect(url)

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

exports.should = should
exports.removeAllDocument = removeAllDocument
