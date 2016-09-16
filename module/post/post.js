/**
 *  Wrapped the operation on post up
 *
 *  @author       Ayase-252 (bitdqy@hotmail.com)
 *
 *  @requires     assert
 *  @requires     /model/post
 */

import { PostModel } from '../../model/post'
import * as assert from 'assert'

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
   * @param {String} content    Content
   * @param {String} author     Author (Who will have full of privilege over
   *                                    the post)
   * @param {Boolean} featured  Whether the post is featured
   * @param {String} id         Id
   */
  constructor(title, tags, content, author, featured, id = '') {
    this.title = title
    this.tags = tags
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
   * @param {Function} callback Callback function
   */
  static create(title, tags, content, author, featured, callback) {
    const post = new Post(title, tags, content, author, featured)
    post.save(callback)
  }

  /**
   * Callback function handling create
   *
   * @callback createCallBack
   *
   * @param {Object | null} Error
   * @param {Post} createdPost
   */


  /**
   * update - Update an existing post
   *
   * @param {Object} newPost            New post in Object
   * @param {String} newPost.title      Title
   * @param {Array} newPost.tags        Tags
   * @param {String} newPost.content    Content
   * @param {String} newPost.author     Author
   * @param {Boolean} newPostfeatured   Whether the post is featured
   * @param {Function} callback
   *
   */
  update({
      title = this.title,
      tags = this.tags,
      content = this.content,
      author = this.author,
      featured = this.featured
    }, callback) {
    this.title = title
    this.tags = tags
    this.content = content
    this.author = author
    this.featured = featured
    return this._modify(callback)
  }
    /**
     * Callback function handling update
     *
     * @callback updateCallBack
     *
     * @param {Object | null} Error
     * @param {Post} updatedPost
     */

  /**
   * remove - Remove the post from database
   *
   * @returns {Boolean} result Result True for success, false for failure
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
   * @returns {Post} post Instance of result, null if post cannot be fetched
   */
  static getPostById(id) {
    PostModel.findById(id, (error, result) => {
      if (error) {
        console.log('Error occurred during query ' + error)
        return null
      }
      return Post._convertPostModelToPost(result)
    })
  }

  /**
   * save - Save the post
   *
   * @param {Function} callback
   *
   */
  save(callback) {
    const post = new PostModel({
      title: this.title,
      tags: this.tags,
      content: this.content,
      author: this.author,
      featured: this.featured
    })
    post.save((error, result) => {
      if (error) {
        console.log('Error occurred during saving ' + error)
        if (typeof callback === 'function') {
          callback(error)
        }
        return
      }
      if (typeof callback === 'function') {
        callback(null, Post._convertPostModelToPost(result))
      }
    })
  }
  /**
   * Callback function handling save
   *
   * @callback saveCallBack
   *
   * @param {Object | null} Error
   * @param {Post} savedPost
   */

  /**
   * _modify - Modify an existing post by revised Post
   *
   * @private
   * @desc This function will query database by id property in caller.
   *
   * @param {Function} callback
   * @throws AssertionError  If id is ''
   */
  _modify(callback) {
    assert.notStrictEqual(this.id, '', 'id property is undefined.')
    PostModel.findOneAndUpdate({ _id: this.id }, {
      title: this.title,
      tags: this.tags,
      content: this.content,
      author: this.author,
      featured: this.featured
    }, { new: true }, (error, result) => {
      if (error) {
        console.log('Error occurred during modification ' + error)
        if (typeof callback === 'function') {
          callback(error)
        }
        return
      }
      if (typeof callback === 'function') {
        callback(null, Post._convertPostModelToPost(result))
      }
    })
  }

  /**
   * Callback function handling _modify
   *
   * @callback modifyCallBack
   *
   * @param {Object | null} Error
   * @param {Post} modifiedPost
   */


  /**
   * _remove - Remove caller from database
   *
   * @private
   *
   * @returns {Boolean} result True for success, false for failure
   * @throws AssertionError  If id is ''
   */
  _remove() {
    assert.notStrictEqual(this.id, '', 'id property is undefined.')
    PostModel.findOneAndRemove({ _id: this.id }, (error) => {
      if (error) {
        console.log('Error occurred during removing' + error)
        return false
      }
      return true
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
      author,
      featured
    } = postModel
    return new Post(title, tags, content, author, featured, id)
  }
}

export { Post }
