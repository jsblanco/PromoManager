const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {type: String, required: true},
  brands: [{type: String}],
  ongoingProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
//  pendingTasks: [{ type: Schema.Types.ObjectId, ref: 'Phase' }],
  finishedProjects:  [{ type: Schema.Types.ObjectId, ref: 'Project' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;