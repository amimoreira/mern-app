import express from 'express'
const router = express.Router()
const {
  getExps,
  getExp,
  setExp,
  updateExp,
  deleteExp,
} = require('../controllers/expController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getExps).post(protect, setExp)
router.route('/:id').delete(protect, deleteExp).put(protect, updateExp).get(protect, getExp)

module.exports = router