import { Schema, connection } from './common'

const siteSchema = new Schema({
  site_meta: {
    title: String,
    panels: Array
  },
  about: {
    title: String,
    content: String
  }
})

siteSchema.methods.getSiteMeta = function () {
  const {
    title = '', panels = []
  } = this.site_meta
  return {
    title: title,
    panels: panels.length === 0 ? [] : panels.toObject()
  }
}

siteSchema.methods.getAbout = function () {
  const {
    title = '', content = ''
  } = this.about
  return {
    title: title,
    content: content
  }
}

siteSchema.statics.set = function (obj, callback) {
  let that = this
  this.find({}, function (error, docs) {
    if (error) {
      callback(error)
    }
    if (docs.length !== 1) {
      that.create(obj, function (error) {
        callback(error)
      })
    } else {
      let site = docs[0]
      Object.assign(site, obj)
      site.save(function (error) {
        if (error) {
          callback(error)
        }
        callback()
      })
    }
  })
}

let Site = connection.model('Site', siteSchema)

export { Site }
