const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {type: String, required: true},
  project: { type: Schema.Types.ObjectId, ref: 'Project',required: true},
  assignedUser: [{ type: Schema.Types.ObjectId, ref: 'User', required: true}],
  deadline: [{ type: Date, required: true}],
  isItOver: {type: Boolean, default: false},
  message: {type: String},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;