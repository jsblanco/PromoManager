const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phaseSchema = new Schema({
  name: {type: String, required: true},
  project: { type: Schema.Types.ObjectId, ref: 'Project',required: true},
  tasks: { type: Array},
  basicTasks: [{ type: Schema.Types.ObjectId, ref: 'Task'}],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Phase = mongoose.model('Phase', phaseSchema);

module.exports = Phase;