import { removeAllDocument } from '../../common'
import { UserModel as User } from '../../../module/user/user.model'

describe('/module/user UserModel', function () {
  beforeEach('clear database', function (done) {
    removeAllDocument(User, done)
  })

  describe('#save(callback)', function () {
    it('should not save the plain password in database', function (done) {
      const user = new User({
        username: 'user123',
        password: 'password123',
        secureEmail: 'helloworld@test.com'
      })
      user.save((error, result) => {
        (error === null).should.be.true
        result.password.should.not.be.equal('password123')
        done()
      })
    })

    it('should not save user whose username is identical to one in database', function (done) {
      const user = new User({
        username: 'user123',
        password: 'password123',
        secureEmail: 'helloworld@test.com'
      })
      user.save((error, result) => {
        (error === null).should.be.true
        const user2 = new User({
          username: 'user123',
          password: 'whatever'
        })
        user2.save((error, result) => {
          (error !== null).should.be.true
          done()
        })
      })
    })
  })

  describe('#comparePassword(candidatePassword, callback)', function () {
    const user = new User({
      username: 'user123',
      password: 'password123',
      secureEmail: 'helloworld@test.com'
    })
    before('set up an example user', function () {
      user.save()
    })

    it('should callback with matched when compared with right information', function (done) {
      user.comparePassword('password123', (error, isMatch) => {
        (error === null).should.be.true
        isMatch.should.be.true
        done()
      })
    })

    it('should callback with not matched when compare with wrong information', function (done) {
      user.comparePassword('password12', (error, isMatch) => {
        (error === null).should.be.true
        isMatch.should.be.false
        done()
      })
    })
  })
})
