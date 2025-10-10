const express = require("express");
const router = express.Router();
const {
  login,
  getAllUsers,
  getUserById,
  register,
} = require("../controllers/authControllers");

// Route đăng nhập
router.post("/login", login);

// Route lấy tất cả user
router.get("/users", getAllUsers);

// Route lấy 1 user theo id
router.get("/users/:id", getUserById);

// Route đăng ký
router.post("/register", register);

module.exports = router;
