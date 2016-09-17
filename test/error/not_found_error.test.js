import { should } from '../common'
import { NotFoundError } from '../../module/error/not_found_error'


describe('NotFoundError', function () {
  describe('.toString()', function () {
    it('should return string with model name and failed condition', function () {
      const newError = new NotFoundError('model', 'id', 1)
      newError.toString().should.be.equal(
        'Error Not Found Error: model with condition that id = 1 doesn\'t ' +
        'exist in database.')
    })
  })
})
