import express from 'express'
const router = express.Router()
const {
  getContacts,
  getContact,
  setContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getContacts).post(protect, setContact)
router.route('/:id').delete(protect, deleteContact).put(protect, updateContact).get(protect, getContact)

module.exports = router