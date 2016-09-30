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

  describe('#_validateEmail(email)', function() {
    it('should throw an exception when email is not a string',
      function() {
        const testFunction = () => {
          User._validateEmail(123)
        }
        testFunction.should.throw(assert.AssertionError)
      }
    )

    it('should validate an email address when it seems to be a valid address',
      function() {
        (User._validateEmail('helloworld@whatever.org'))
        .should.be.true()
      }
    )

    it('should invalidate an email address which is clearly not valid',
      function() {
        (User._validateEmail('itcannotbeaemail'))
        .should.be.false()
      }
    )
  })

  describe('#.register(username, password, secureEmail, userInfo)', function() {
    it('should reject attempt with password which is too short', function(done) {
      User.register('whatever', 'srtpwd', 'validEmail@xxx.com', {
        firstName: 'hw',
        lastName: 'xo',
        contactEmail: 'validEmail2@xxx.com'
      }).catch((error) => {
        error.errorDesc.invalidField.should.be.equal('password')
        error.errorDesc.invalidValue.should.be.equal('srtpwd')
        //  No registered User
        UserModel.count({}, (error, count) => {
          (error === null).should.be.true()
          count.should.be.equal(0)
          done()
        })
      })
    })

    it('should reject attempt with invalid secure email', function(done) {
      User.register('whatever', 'hsixunfsw', 'invalidEmail', {
        firstName: 'hw',
        lastName: 'xo',
        contactEmail: 'validEmail2@xxx.com'
      }).catch((error) => {
        error.errorDesc.invalidField.should.be.equal('secureEmail')
        error.errorDesc.invalidValue.should.be.equal('invalidEmail')
        //  No registered User
        UserModel.count({}, (error, count) => {
          (error === null).should.be.true()
          count.should.be.equal(0)
          done()
        })
      })
    })

    it('should register for a valid attempt', function(done) {
      User.register('whatever', 'hsixunfsw', 'validEmail@xxx.com', {
        firstName: 'hw',
        lastName: 'xo',
        contactEmail: 'validEmail2@xxx.com'
      }).then((user) => {
        user.userInfo.should.be.eql({
          firstName: 'hw',
          lastName: 'xo',
          contactEmail: 'validEmail2@xxx.com'
        })
        done()
      })
    })

    it('should not register for users whose username is same', function(done) {
      User.register('whatever', 'hsixunfsw', 'validEmail@xxx.com', {
        firstName: 'hw',
        lastName: 'xo',
        contactEmail: 'validEmail2@xxx.com'
      }).then(() => {
        User.register('whatever', 'hsixunfsw', 'validEmail@xxx.com', {
          firstName: 'hw',
          lastName: 'xo',
          contactEmail: 'validEmail2@xxx.com'
        })
      }).catch((error) => {
        error.name.should.be.eql('MongoError')
        error.code.should.be.eql(11000)
        done()
      })
    })
  })
})
