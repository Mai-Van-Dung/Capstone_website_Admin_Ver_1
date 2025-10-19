const express = require("express");
const router = express.Router();
const {
  login,
  getAllUsers,
  getUserById,
  register,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/authControllers");

// Route đăng nhập
router.post("/login", login);

// Route lấy tất cả user
router.get("/users", getAllUsers);

// Route lấy 1 user theo id
router.get("/users/:id", getUserById);

// Route đăng ký (public)
router.post("/register", register);

// New: admin/frontend CRUD
router.post("/users", createUser);         // POST /api/auth/users
router.put("/users/:id", updateUser);      // PUT /api/auth/users/:id
router.delete("/users/:id", deleteUser);   // DELETE /api/auth/users/:id

module.exports = router;
