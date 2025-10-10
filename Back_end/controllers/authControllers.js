const connection = require("../config/database"); // Kết nối MySQL
const bcrypt = require("bcrypt");

// ================== LOGIN ==================
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    // So sánh mật khẩu đã hash
    bcrypt.compare(password, user.password, (compareErr, match) => {
      if (compareErr) {
        console.error("Bcrypt compare error:", compareErr);
        return res.status(500).json({ error: "Server error" });
      }
      if (!match) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Trả về thông tin user (không trả password)
      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        status: user.status,
      });
    });
  });
};

// ================== GET ALL USERS ==================
const getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const users = results.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      status: user.status,
    }));

    res.status(200).json(users);
  });
};

// ================== GET USER BY ID ==================
const getUserById = (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      status: user.status,
    });
  });
};

// ================== REGISTER ==================
const register = async (req, res) => {
  const { name, email, phoneNumber, password, status } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "name, email and password are required" });
  }

  try {
    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    const insertQuery = `INSERT INTO users (name, email, phoneNumber, password, status) VALUES (?, ?, ?, ?, ?)`;
    const userStatus = status || "Active";

    connection.query(
      insertQuery,
      [name, email, phoneNumber || null, hashed, userStatus],
      (err, result) => {
        if (err) {
          console.error("Database insert error:", err);
          return res.status(500).json({ error: "Database error" });
        }

        const newUser = {
          id: result.insertId,
          name,
          email,
          phoneNumber: phoneNumber || null,
          status: userStatus,
        };

        return res.status(201).json(newUser);
      }
    );
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { login, getAllUsers, getUserById, register };
