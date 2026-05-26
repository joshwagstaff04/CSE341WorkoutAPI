const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  workoutName: { type: String, required: true },
  date: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true },
  completed: { type: Boolean, required: true },
  notes: { type: String }
});

module.exports = mongoose.model('Workout', workoutSchema);
