const express = require('express');
const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', protect, admin, getUsers);
// ismein protect check confirm krega ki user jb properly login ho tabhi vo othet details or data access kr paye

module.exports = router;
