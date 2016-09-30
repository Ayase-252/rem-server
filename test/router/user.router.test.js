import request from 'supertest'
import btoa from 'btoa'
import { app } from '../../router/app'
import { removeAllDocument } from '../common'
import { UserModel } from '../../module/user/user.model'

describe('/api/user', function() {
  describe('GET /', function() {
    it('should list all avaliable operations on this resource', function(done) {
      request(app)
      .get('/api/user')
      .set('Accept', 'application/json')
      .expect(200)
      .expect([])
      .end((err, res) => {
        done(err)
      })
    })
  })

  describe('POST /', function() {
    before(function(done) {
      removeAllDocument(UserModel, done)
    })

    it('should reject request without username field.', function(done) {
      request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send({
        password: btoa('helloworld'),
        secureEmail: 'helloworld@123.com',
        firstName: 'Heloo',
        lastName: 'Test',
        contactEmail: 'contactme@456.js'
      })
      .expect(400, {
        error: 'Bad Request',
        describe: 'Miss essential field.'
      })
      .end((err) => {
        done(err)
      })
    })

    it('should reject request without username field.', function(done) {
      request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send({
        password: btoa('helloworld'),
        secureEmail: 'helloworld@123.com',
        firstName: 'Heloo',
        lastName: 'Test',
        contactEmail: 'contactme@456.js'
      })
      .expect(400, {
        error: 'Bad Request',
        describe: 'Miss essential field.'
      })
      .end((err) => {
        done(err)
      })
    })

    it('should reject request without password field.', function(done) {
      request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send({
        username: 'hello',
        secureEmail: 'helloworld@123.com',
        firstName: 'Heloo',
        lastName: 'Test',
        contactEmail: 'contactme@456.js'
      })
      .expect(400, {
        error: 'Bad Request',
        describe: 'Miss essential field.'
      })
      .end((err) => {
        done(err)
      })
    })

    it('should reject request without secureEmail field.', function(done) {
      request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send({
        username: 'hello',
        password: btoa('helloworld'),
        firstName: 'Heloo',
        lastName: 'Test',
        contactEmail: 'contactme@456.js'
      })
      .expect(400, {
        error: 'Bad Request',
        describe: 'Miss essential field.'
      })
      .end((err) => {
        done(err)
      })
    })

    it('should accept request without additional fields.', function(done) {
      request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send({
        username: 'hello',
        password: btoa('helloworld'),
        secureEmail: 'helloworld@123.com'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          done(err)
        }
        res.body.userId.should.match(/.+/g)
        res.body.userInfo.should.be.eql({})
        done()
      })
    })

    it('should accept request with all fields.', function(done) {
      request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send({
        username: 'hello1',
        password: btoa('helloworld'),
        secureEmail: 'helloworld@123.com',
        firstName: 'Heloo',
        lastName: 'Test',
        contactEmail: 'contactme@456.js'
      })
      .expect(201)
      .end((err, res) => {
        if (err) {
          console.log(res.body)
          done(err)
        }
        res.body.userId.should.match(/.+/g)
        res.body.userInfo.should.eql({
          firstName: 'Heloo',
          lastName: 'Test',
          contactEmail: 'contactme@456.js'
        })
        done()
      })
    })

    it('should reject request with password being too short', function (done) {
      request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send({
        username: 'hello',
        password: btoa('srtpwd'),
        secureEmail: 'helloworld@123.com',
        firstName: 'Heloo',
        lastName: 'Test',
        contactEmail: 'contactme@456.js'
      })
      .expect(400)
      .end((err, res) => {
        res.body.error.should.eql('Validation Error')
        done(err)
      })
    })

    it('should reject request with incorrect secure email', function (done) {
      request(app)
      .post('/api/user')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/json')
      .send({
        username: 'hello',
        password: btoa('helloworld'),
        secureEmail: 'hellowor',
        firstName: 'Heloo',
        lastName: 'Test',
        contactEmail: 'contactme@456.js'
      })
      .expect(400)
      .end((err, res) => {
        res.body.error.should.eql('Validation Error')
        done(err)
      })
    })

    it('should reject request if request do not accept json', function (done) {
      request(app)
      .post('/api/user')
      .set('Accept', 'text/plain')
      .set('Content-type', 'application/json')
      .send({
        username: 'hello',
        password: btoa('helloworld'),
        secureEmail: 'hellowor',
        firstName: 'Heloo',
        lastName: 'Test',
        contactEmail: 'contactme@456.js'
      })
      .expect(406)
      .end((err) => {
        done(err)
      })
    })
  })
})
