import { should } from '../common'
import { AbstractError } from '../../module/error/abstract_error'

describe('AbstractError', function () {
  describe('.toString()', function () {
    it('should return formatted string', function () {
      const newError = new AbstractError('New Error', 'This is new error.')
      newError.toString().should.be.equal('Error New Error: This is new error.')
    })
  })
})
