import { Schema, connection } from './common'

const groupSchema = new Schema({
  name: { type: String, unique: true, required: true },
  priviliges: Array
})

groupSchema.statics.priviliges = {
  canManageGroups: Symbol(),
  canAddPost: Symbol(),
  canDeleteAnyPost: Symbol(),
  canEditAnyPost: Symbol(),
  canManageUsers: Symbol(),
  canManageSite: Symbol()
}

const Group = connection.model('Group', groupSchema)

export { Group }
