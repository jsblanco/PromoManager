const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, enum: [ "Account", "Scientific", "Design", "Developer", "AV", "Administration"] },
  ongoingprojects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  finishedprojects:  [{ type: Schema.Types.ObjectId, ref: 'Project' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;