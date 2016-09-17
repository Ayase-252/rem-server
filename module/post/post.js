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
   *
   * @returns {Promise}
   * @resolves {Post} createdPost
   * @rejects {Error} error
   */
  static create(title, tags, content, author, featured) {
    const post = new Post(title, tags, content, author, featured)
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
      content = this.content,
      author = this.author,
      featured = this.featured
    }) {
    this.title = title
    this.tags = tags
    this.content = content
    this.author = author
    this.featured = featured
    return this._modify()
  }

  /**
   * remove - Remove the post from database
   *
   * @param {Function} callback
   */
  remove(callback) {
    return this._remove(callback)
  }
    /**
     * Callback function handling remove
     *
     * @callback removeCallBack
     *
     * @param
     */


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
   * @returns {Promise}
   * @resolves {Post} savedPost
   * @rejects {Error} error
   */
  save() {
    const post = new PostModel({
      title: this.title,
      tags: this.tags,
      content: this.content,
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
      PostModel.findOneAndUpdate(
        {
          _id: this.id
        }, {
          title: this.title,
          tags: this.tags,
          content: this.content,
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
        }
      )
    })
  }

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
