const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String, required: true},
  budgetNumber: {type: String, required: true},
  client: {type: String, required: true},
  description: {type: String, required: true},
  version: {type: Number},
  teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User'}],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      comments: String
    }
  ],
  type: {type: String, enum: [ "Leaflet", "Slidekit", "eDetailing", "Website", "Event", "Video"]},
  phases:  [{ type: Schema.Types.ObjectId, ref: 'Phase' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;