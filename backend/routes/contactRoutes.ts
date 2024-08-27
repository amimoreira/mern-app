import express from 'express'
const router = express.Router()
const {
  getContacts,
  setContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getContacts).post(protect, setContact)
router.route('/:id').delete(protect, deleteContact).put(protect, updateContact)

module.exports = router