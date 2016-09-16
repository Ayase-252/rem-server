require('babel-polyfill')

import { removeAllDocument } from '../common'
import { PostModel } from '../../model/post'

describe('PostModel', function () {
  describe('#save(callback)', function () {
    beforeEach('remove all documents in database', function (done) {
      removeAllDocument(PostModel, () => {
        const post = new PostModel()
        post.resetCount(() => {
          done()
        })
      })
    })

    it("should save the object in database if object isn't in database", function (done) {
      const timeNow = Date.now()
      const post = new PostModel({
        title: 'Test post',
        postDate: timeNow,
        tags: ['tag1', 'tag2'],
        content: 'Hello world'
      })
      post.save((error, result) => {
        (error === null).should.be.true
        result._id.should.be.equal(0)
        result.title.should.be.equal('Test post')
        //  result.postDate.should.be.eql(timeNow)
        result.tags.toObject().should.be.eql(['tag1', 'tag2'])
        result.content.should.be.equal('Hello world')
        done()
      })
    })

    it('should update the document in database if object is in database', function (done) {
      const timeNow = Date.now()
      const post = new PostModel({
        title: 'Test post',
        postDate: timeNow,
        tags: ['tag1', 'tag2'],
        content: 'Hello world'
      })
      post.save((error, result) => {
        (error === null).should.be.true
        result.title = 'Modified post'
        result.save((error, result) => {
          (error === null).should.be.true
          result._id.should.be.equal(0)
          result.title.should.be.equal('Modified post')
          //  result.postDate.should.be.eql(timeNow.toString())
          result.tags.toObject().should.be.eql(['tag1', 'tag2'])
          result.content.should.be.equal('Hello world')
          done()
        })
      })
    })

    it('should increase id automatically', function (done) {
      const timeNow1 = Date.now()
      const post1 = new PostModel({
        title: 'Test post1',
        postDate: timeNow1,
        tags: ['tag1', 'tag2'],
        content: 'Hello world'
      })
      const timeNow2 = Date.now()
      const post2 = new PostModel({
        title: 'Test post2',
        postDate: timeNow2,
        tags: ['tag1'],
        content: 'Hello world2'
      })
      post1.save((error, result) => {
        (error === null).should.be.true
        result._id.should.be.equal(0)
        result.title.should.be.equal('Test post1')
        //  result.postDate.should.be.eql(timeNow1)
        result.tags.toObject().should.be.eql(['tag1', 'tag2'])
        result.content.should.be.equal('Hello world')
        post2.save((error, result) => {
          (error === null).should.be.true
          result._id.should.be.equal(1)
          result.title.should.be.equal('Test post2')
          //  result.postDate.should.be.eql(timeNow2)
          result.tags.toObject().should.be.eql(['tag1'])
          result.content.should.be.equal('Hello world2')
          done()
        })
      })
    })
  })
})
