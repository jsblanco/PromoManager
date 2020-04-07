const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String, required: true},
  budgetnumber: {type: String, required: true},
  client: {type: String, required: true},
  version: {type: Number},
  account: { type: Schema.Types.ObjectId, ref: 'User',required: true},
  scientific: { type: Schema.Types.ObjectId, ref: 'User' },
  design: { type: Schema.Types.ObjectId, ref: 'User' },
  developer: { type: Schema.Types.ObjectId, ref: 'User' },
  av: { type: Schema.Types.ObjectId, ref: 'User' },
  type: {type: String, enum: [ "Leaflet", "Slidekit", "eDetailing", "Website", "Event", "Video"]},
  brief: { type: String },
  ongoingRounds:  [{ type: Schema.Types.ObjectId, ref: 'Round' }],
  finishedRounds:  [{ type: Schema.Types.ObjectId, ref: 'Round' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;