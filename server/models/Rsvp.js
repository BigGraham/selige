/*
 |--------------------------------------
 | Rsvp Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auditSchema = new Schema({
  userId: { type: String, required: false },
  name: { type: String, required: false },
  eventId: { type: String, required: false },
  comments: { type: String, required: false },
  commentType: { type: String, required: false },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CheckAppHistory', auditSchema , 'CheckAppHist');
