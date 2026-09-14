const express = require('express');
const router = express.Router();
const { register, login, getProfile, getStudents, updateStudent } = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);

// Bonus Challenge: Role-based authorization routes
router.get('/students', authenticateToken, authorizeRoles('Faculty', 'Admin'), getStudents);
router.put('/students/:id', authenticateToken, authorizeRoles('Faculty', 'Admin'), updateStudent);

module.exports = router;