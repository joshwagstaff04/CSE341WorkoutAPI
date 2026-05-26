const express = require('express');
const router = express.Router();
const {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workouts');

router.get('/', getAllWorkouts);
router.get('/:id', getSingleWorkout);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;
