import express from 'express'
const router = express.Router()
const {
  getAbouts,
  setAbout,
  updateAbout,
  deleteAbout,
} = require('../controllers/aboutController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAbouts).post(protect, setAbout)
router.route('/:id').delete(protect, deleteAbout).put(protect, updateAbout)

module.exports = router