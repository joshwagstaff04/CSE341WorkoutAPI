const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  difficulty: { type: String, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
