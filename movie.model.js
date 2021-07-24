const mongoose = require('mongoose');

const Movie = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    synopsis: {
      type: String,
    },
    dateCreated: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', Movie);
