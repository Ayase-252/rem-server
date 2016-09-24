import { ValidationError } from '../../module/error/validation_error'

describe('module/error/validation_error.js ValidationError', function() {
  describe('.toString()', function() {
    it('should return formatted message', function() {
      const newError = new ValidationError('name', 'rem', 'reserved name (joke).')
      newError.toString().should.be.eql('[Error] Validation Error: name ' +
      'with value rem is failed to validate. Because reserved name (joke).')
    })
  })
})
