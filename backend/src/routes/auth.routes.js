const express = require('express');
const authController = require('../controllers/AuthController');
const { protect } = require('../middlewares/auth');
const { validateRequest } = require('../middlewares/validate');
const { registerValidator, loginValidator } = require('../validators/auth.validator');

const router = express.Router();

router.post('/register', registerValidator, validateRequest, authController.register);
router.post('/login', loginValidator, validateRequest, authController.login);
router.get('/profile', protect, authController.getProfile);

module.exports = router;
