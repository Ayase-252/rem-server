import { should, removeAllDocument } from '../../common'
import { UserModel } from '../../../module/user/user.model'
import { User } from '../../../module/user/user'
import assert from 'assert'

describe('/module/user/user.js User', function () {
  before('remove all documents', function (done) {
    removeAllDocument(UserModel, done)
  })

  describe('#_validatePassword(password)', function () {
    it('should validate a password whose length is more then or equal to ' +
      'MIN_PASSWORD_LENGTH',
      function () {
        const result = User._validatePassword('greatpassword')
        result.should.be.true()
      }
    )
    it('should invalidate a password whose length is less then ' +
      'MIN_PASSWORD_LENGTH',
      function () {
        const result = User._validatePassword('srtpwd')
        result.should.be.false()
      }
    )
    it('should throw an exception when password is not a string',
      function() {
        const testFunction = () => {
          User._validatePassword(['s'])
        }
        testFunction.should.throw(assert.AssertionError)
      }
  )
  })
})
