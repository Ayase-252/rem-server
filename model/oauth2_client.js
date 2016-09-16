import { Schema, connection } from './common'

const clientSchema = new Schema({
  clientId: String,
  clientSecret: String,
  redirectUri: String
})

clientSchema.static.getClient = function (clientId, clientSecret, callback) {
  const params = { clientId }
  if (clientSecret != null) {
    params.clientSecret = clientSecret
  }
  this.findOne(params, callback)
}
