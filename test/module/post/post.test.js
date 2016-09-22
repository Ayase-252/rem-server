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

  describe('#create(title, tags, category, content, author, featured)', function (done) {
    it('should create a new post in database', function (done) {
      Post.create('Hello world', ['tag1', 'tag2'], 'category1',
          'This is the test post', 'testAuthor', false)
        .then((newPost) => {
          newPost.id.should.be.equal(0)
          newPost.title.should.be.equal('Hello world')
          newPost.category.should.be.equal('category1')
          newPost.tags.toObject().should.be.eql(['tag1', 'tag2'])
          newPost.content.should.be.equal('This is the test post')
          newPost.author.should.be.equal('testAuthor')
          newPost.featured.should.be.false()
          done()
        })
    })
  })

  describe('.update(newPost)', function (done) {
    it('should update an existing post with new set', function (done) {
      Post.create('Hello world', ['tag1', 'tag2'], 'category1',
          'This is the test post', 'testAuthor', false)
        .then((newPost) => {
          return newPost.update({
            title: 'New Post',
            tags: ['newtag1', 'newtag2'],
            category: 'newCategory',
            content: 'Wow',
            author: 'New Author',
            featured: true
          })
        })
        .then((updatedPost) => {
          updatedPost.title.should.be.equal('New Post')
          updatedPost.tags.toObject().should.be.eql(['newtag1', 'newtag2'])
          updatedPost.category.should.be.equal('newCategory')
          updatedPost.content.should.be.equal('Wow')
          updatedPost.author.should.be.equal('New Author')
          updatedPost.featured.should.be.true()
          done()
        })
    })
  })

  describe('.remove()', function (done) {
    it('should remove the caller from the database', function (done) {
      Post.create('Hello world', ['tag1', 'tag2'], 'category',
          'This is the test post', 'testAuthor', false)
        .then((newPost) => {
          return newPost.remove()
        })
        .then(() => {
          PostModel.count({}, (error, count) => {
            (error === null).should.be.true()
            count.should.be.equal(0)
            done()
          })
        })
    })
  })

  describe('#getPostById(id)', function (done) {
    it('should return a Post object if post exists', function (done) {
      Post.create('Hello world', ['tag1', 'tag2'], 'category',
          'This is the test post', 'testAuthor', false)
        .then(() => {
          return Post.getPostById(0)
        })
        .then((post) => {
          post.id.should.be.equal(0)
          post.title.should.be.equal('Hello world')
          post.tags.toObject().should.be.eql(['tag1', 'tag2'])
          post.category.should.be.equal('category')
          post.content.should.be.equal('This is the test post')
          post.author.should.be.equal('testAuthor')
          post.featured.should.be.false()
          done()
        })
    })

    it('should reject with NotFoundError if post does not exist',
      function (done) {
        // Impossible id
        Post.getPostById(10000)
          .catch((error) => {
            error.name.should.be.equal('Not Found Error')
            error.errorDesc.modelName.should.be.equal('Post')
            error.errorDesc.conditionName.should.be.equal('id')
            error.errorDesc.conditionValue.should.be.equal(10000)
            done()
          })
      })
  })
})
