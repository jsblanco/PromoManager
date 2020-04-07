const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String, required: true},
  budgetNumber: {type: String, required: true},
  client: {type: String, required: true},
  version: {type: Number},
  account: {type: String, 
  //Schema.Types.ObjectId, ref: 'User',
  required: true},
  scientific: { type: String
    //Schema.Types.ObjectId, ref: 'User' 
  },
  design: { type: Schema.Types.ObjectId, ref: 'User' },
  developer: { type: Schema.Types.ObjectId, ref: 'User' },
  av: { type: Schema.Types.ObjectId, ref: 'User' },
  type: {type: String, enum: [ "Leaflet", "Slidekit", "eDetailing", "Website", "Event", "Video"]},
  brief: { type: String },
  ongoingPhases:  [{ type: Schema.Types.ObjectId, ref: 'Phase' }],
  finishedPhases:  [{ type: Schema.Types.ObjectId, ref: 'Phase' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;