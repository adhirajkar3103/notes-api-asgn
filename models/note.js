// models/note.js

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the 'updatedAt' timestamp before saving the document
noteSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
