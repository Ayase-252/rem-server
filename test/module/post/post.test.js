import { removeAllDocument } from '../../common'
import { Post } from '../../../module/post/post'
import { PostModel } from '../../../model/post'

describe('Post', function () {
  beforeEach('remove all documents in database', function (done) {
    removeAllDocument(PostModel, () => {
      const post = new PostModel()
      post.resetCount(() => {
        done()
      })
    })
  })

  describe('#create(title, tags, content, author, featured, callback)', function (done) {
    it('should create a new post in database', function (done) {
      Post.create('Hello world', ['tag1', 'tag2'],
        'This is the test post', 'testAuthor', false, (error, newPost) => {
          (error === null).should.be.true()
          newPost.id.should.be.equal(0)
          newPost.title.should.be.equal('Hello world')
          newPost.tags.toObject().should.be.eql(['tag1', 'tag2'])
          newPost.content.should.be.equal('This is the test post')
          newPost.author.should.be.equal('testAuthor')
          newPost.featured.should.be.false()
          done()
        })
    })
  })

  describe('update(newPost, callback)', function (done) {
    it('should update an existing post with new set', function (done) {
      Post.create('Hello world', ['tag1', 'tag2'],
        'This is the test post', 'testAuthor', false, (error, newPost) => {
          (error === null).should.be.true()
          const id = newPost.id
          newPost.update({
            title: 'New Post',
            tags: ['newtag1', 'newtag2'],
            content: 'Wow',
            author: 'New Author',
            featured: true
          }, (error, updatedPost) => {
            (error === null).should.be.true()
            updatedPost.id.should.be.equal(id)
            updatedPost.title.should.be.equal('New Post')
            updatedPost.tags.toObject().should.be.eql(['newtag1', 'newtag2'])
            updatedPost.content.should.be.equal('Wow')
            updatedPost.author.should.be.equal('New Author')
            updatedPost.featured.should.be.true()
            done()
          })
        })
    })
  })
})
