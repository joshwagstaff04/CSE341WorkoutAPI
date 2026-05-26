const Exercise = require('../models/exercise');

const validateExercise = (data) => {
  if (!data.name) return 'name is required';
  if (!data.muscleGroup) return 'muscleGroup is required';
  if (!data.sets || data.sets <= 0) return 'sets must be a positive number';
  if (!data.reps || data.reps <= 0) return 'reps must be a positive number';
  if (!data.weight || data.weight <= 0) return 'weight must be a positive number';
  if (!data.difficulty) return 'difficulty is required';
  return null;
};

const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSingleExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createExercise = async (req, res) => {
  try {
    const error = validateExercise(req.body);
    if (error) return res.status(400).json({ error });

    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateExercise = async (req, res) => {
  try {
    const error = validateExercise(req.body);
    if (error) return res.status(400).json({ error });

    const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllExercises, getSingleExercise, createExercise, updateExercise, deleteExercise };
