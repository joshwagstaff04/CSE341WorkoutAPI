const Workout = require('../models/workout');

const validateWorkout = (data) => {
  if (!data.workoutName) return 'workoutName is required';
  if (!data.date) return 'date is required';
  if (!data.muscleGroup) return 'muscleGroup is required';
  if (!data.durationMinutes || data.durationMinutes <= 0) return 'durationMinutes must be a positive number';
  if (!data.intensity) return 'intensity is required';
  if (data.completed === undefined) return 'completed is required';
  return null;
};

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createWorkout = async (req, res) => {
  try {
    const error = validateWorkout(req.body);
    if (error) return res.status(400).json({ error });

    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const error = validateWorkout(req.body);
    if (error) return res.status(400).json({ error });

    const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllWorkouts, getSingleWorkout, createWorkout, updateWorkout, deleteWorkout };
