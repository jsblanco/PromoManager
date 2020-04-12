const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {type: String, required: true},
  assignedUser:[
  { type: String, enum: [ "Account", "Scientific", "Design", "Developer", "AV", "Administration"], required: true},
  { type: Schema.Types.ObjectId, ref: 'User'}],
  deadline: { type: Date},
  spentTime: {type: String},
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