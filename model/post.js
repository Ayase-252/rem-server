import { Schema, connection } from './common'
import autoIncrement from 'mongoose-auto-increment'

autoIncrement.initialize(connection)

const postSchema = new Schema({
  title: String,
  postDate: { type: Date, default: Date.now },
  tags: Array,
  content: String,
  author: String,
  featured: Boolean
})

postSchema.plugin(autoIncrement.plugin, 'Post')

const PostModel = connection.model('Post', postSchema)

export { PostModel }
