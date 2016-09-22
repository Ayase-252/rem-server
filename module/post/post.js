/**
 * Wrapped the operation on post up
 *
 * @author       Ayase-252 (bitdqy@hotmail.com)
 *
 * @requires     assert
 * @requires     /model/post
 * @requires     /module/error/not_found_error
 */

import * as assert from 'assert'
import { PostModel } from './post.model'
import { NotFoundError } from '../error/not_found_error'


/**
 * Post - Representing a post
 *
 * @class
 */
class Post {

  /**
   * constructor - Create a post instance
   *
   * @param {String} title      Title
   * @param {Array} tags        Tags
   * @param {String} category   Category
   * @param {String} content    Content
   * @param {String} author     Author (Who will have full of privilege over
   *                                    the post)
   * @param {Boolean} featured  Whether the post is featured
   * @param {String} id         Id
   */
  constructor(title, tags, category, content, author, featured, id = '') {
    this.title = title
    this.tags = tags
    this.category = category
    this.content = content
    this.author = author
    this.featured = featured
    this.id = id
  }


  /**
   * create - Create a post in database
   *
   * @static @public
   * @param {String} title      Title
   * @param {Array} tags        Tags
   * @param {String} content    Content
   * @param {String} author     Author (Who will have full of privilege over
   *                                    the post)
   * @param {Boolean} featured  Whether the post is featured
   *
   * @returns {Promise}
   * @resolves {Post} createdPost
   * @rejects {Error} error
   */
  static create(title, tags, category, content, author, featured) {
    const post = new Post(title, tags, category, content, author, featured)
    return post.save()
  }


  /**
   * update - Update an existing post
   *
   * @param {Object} newPost            New post in Object
   * @param {String} newPost.title      Title
   * @param {Array} newPost.tags        Tags
   * @param {String} newPost.content    Content
   * @param {String} newPost.author     Author
   * @param {Boolean} newPostfeatured   Whether the post is featured
   *
   * @returns {Promise}
   * @resolves {Post} modifiedPost
   * @rejects {Error} error
   */
  update({
    title = this.title,
    tags = this.tags,
    category = this.category,
    content = this.content,
    author = this.author,
    featured = this.featured
  }) {
    this.title = title
    this.tags = tags
    this.content = content
    this.category = category
    this.author = author
    this.featured = featured
    return this._modify()
  }

  /**
   * remove - Remove the post from database
   *
   * @returns {Promise}
   * @resolves {Post} removedPost
   * @reject {Error} error
   */
  remove() {
    return this._remove()
  }

  /**
   * getPostById - Get post by ID
   *
   * @static @public
   * @param {String} id id of post
   *
   * @returns {Promise}
   * @resolves {Post} post Instance of result, null if post cannot be fetched
   * @rejects {Error} error
   */
  static getPostById(id) {
    return new Promise((resolve, reject) => {
      PostModel.findById(id, (error, result) => {
        if (error) {
          console.log('Error occurred during query ' + error)
          reject(error)
        } else if (result === null) {
          const newNotFoundError = new NotFoundError('Post', 'id', id)
          reject(newNotFoundError)
        } else {
          resolve(Post._convertPostModelToPost(result))
        }
      })
    })
  }

  /**
   * save - Save the post
   *
   * @returns {Promise}
   * @resolves {Post} savedPost
   * @rejects {Error} error
   */
  save() {
    const post = new PostModel({
      title: this.title,
      tags: this.tags,
      content: this.content,
      category: this.category,
      author: this.author,
      featured: this.featured
    })

    return new Promise((resolve, reject) => {
      post.save((error, result) => {
        if (error) {
          console.log('Error occurred during saving' + error)
          reject(error)
        } else {
          resolve(Post._convertPostModelToPost(result))
        }
      })
    })
  }

  /**
   * _modify - Modify an existing post by revised Post
   *
   * @private
   * @desc This function will query database by id property in caller.
   *
   * @returns {Promise}
   * @resolves {Post} modifiedPost
   * @rejects {Error} error
   * @throws AssertionError  If id is ''
   */
  _modify() {
    assert.notStrictEqual(this.id, '', 'id property is undefined.')
    return new Promise((resolve, reject) => {
      PostModel.findOneAndUpdate({
        _id: this.id
      }, {
        title: this.title,
        tags: this.tags,
        content: this.content,
        category: this.category,
        author: this.author,
        featured: this.featured
      }, {
        new: true
      }, (error, result) => {
        if (error) {
          console.log('Error occurred during modification ' + error)
          reject(error)
        } else {
          resolve(Post._convertPostModelToPost(result))
        }
      })
    })
  }

  /**
   * _remove - Remove caller from database
   *
   * @private
   *
   * @returns {Promise}
   * @resolves {Post} removedPost
   * @reject {Error} error
   * @throws AssertionError  If id is ''
   */
  _remove() {
    assert.notStrictEqual(this.id, '', 'id property is undefined.')
    return new Promise((resolve, reject) => {
      PostModel.findByIdAndRemove(this.id, (error, product) => {
        if (error) {
          console.log('Error occurred during removing' + error)
          reject(error)
        } else {
          resolve(Post._convertPostModelToPost(product))
        }
      })
    })
  }

  /**
   * _convertPostModelToPost - Convert raw PostModel to Post
   *
   * @static @private
   * @param {PostModel} postModel Raw PostModel
   *
   * @returns {Post} post Post whose data are equivalent to PostModel
   */
  static _convertPostModelToPost(postModel) {
    const id = postModel._id
    const {
      title,
      tags,
      content,
      category,
      author,
      featured
    } = postModel
    return new Post(title, tags, category, content, author, featured, id)
  }
}

export { Post }
