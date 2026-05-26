const express = require('express');
const router = express.Router();
const {
  getAllExercises,
  getSingleExercise,
  createExercise,
  updateExercise,
  deleteExercise
} = require('../controllers/exercises');

router.get('/', getAllExercises);
router.get('/:id', getSingleExercise);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

module.exports = router;
