const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authControllers');

// Route xử lý đăng nhập
router.post('/login', login);

module.exports = router;