/***
 * Model of Post
 *
 * @author
 *
 * @requires    mongoose-auto-increment
 * @requires    /common
 *
 */

import autoIncrement from 'mongoose-auto-increment'
import { Schema, Connection } from '../../common'

const getConnection = Connection.getConnection

autoIncrement.initialize(getConnection())

const postSchema = new Schema({
  title: String,
  postDate: { type: Date, default: Date.now },
  category: String,
  tags: Array,
  content: String,
  author: String,
  featured: Boolean
})

postSchema.plugin(autoIncrement.plugin, 'Post')

const PostModel = getConnection().model('Post', postSchema)

export { PostModel }
