import express from 'express'
const router = express.Router();

const {
  registerUser,
  loginUsers,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUsers)
router.get('/me', protect, getMe)

module.exports = router