import request from 'supertest'
import {
  app
} from '../../router/app'

describe('/api/', function () {
  describe('GET /', function () {
    it('should list all avaliable operations in this root.', function (done) {
      request(app)
        .get('/api/')
        .set('Accept', 'application/json')
        .expect(200)
        .expect([{
          url: '/api/user',
          desc: 'APIs for User Operations.'
        }])
        .end((err, res) => {
          done(err)
        })
    })

    it('should return 406, if request does not accept json.', function (done) {
      request(app)
        .get('/api/')
        .set('Accept', 'text/html')
        .expect(406)
        .end((err, res) => {
          done(err)
        })
    })
  })
})
