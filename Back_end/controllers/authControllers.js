const connection = require("../config/database"); // Kết nối MySQL
const bcrypt = require("bcrypt");
const { randomUUID } = require("crypto");

// ================== LOGIN ==================
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const query = "SELECT * FROM `USERs` WHERE email = ? LIMIT 1";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!results || results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    // password_hash may come as Buffer (VARBINARY) or string.
    const storedHashRaw = user.password_hash;
    if (!storedHashRaw) {
      console.error("No password hash for user:", user.user_id);
      return res.status(500).json({ error: "Server error" });
    }

    // Ensure we pass a string to bcrypt.compare
    let storedHash;
    try {
      if (Buffer.isBuffer(storedHashRaw)) {
        storedHash = storedHashRaw.toString("utf8");
      } else if (typeof storedHashRaw === "object" && storedHashRaw.toString) {
        // MySQL may return Uint8Array-like
        storedHash = Buffer.from(storedHashRaw).toString("utf8");
      } else {
        storedHash = String(storedHashRaw);
      }
    } catch (convErr) {
      console.error("Hash conversion error:", convErr, storedHashRaw);
      return res.status(500).json({ error: "Server error" });
    }

    bcrypt.compare(password, storedHash, (compareErr, match) => {
      if (compareErr) {
        console.error("Bcrypt compare error:", compareErr);
        return res.status(500).json({ error: "Server error" });
      }
      if (!match) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Optionally, check status (only allow 'active')
      if (user.status && user.status !== "active") {
        return res
          .status(403)
          .json({ error: `Account status is '${user.status}'` });
      }

      return res.status(200).json({
        id: user.user_id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        status: user.status,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
    });
  });
};

// ================== GET ALL USERS ==================
const getAllUsers = (req, res) => {
  const query =
    "SELECT user_id, full_name, phone, email, status, created_at, updated_at FROM `USERs`";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const users = (results || []).map((u) => ({
      id: u.user_id,
      name: u.full_name,
      email: u.email,
      phone: u.phone,
      status: u.status,
      created_at: u.created_at,
      updated_at: u.updated_at,
    }));

    res.status(200).json(users);
  });
};

// ================== GET USER BY ID ==================
const getUserById = (req, res) => {
  const { id } = req.params;

  const query =
    "SELECT user_id, full_name, phone, email, status, created_at, updated_at FROM `USERs` WHERE user_id = ? LIMIT 1";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];
    res.status(200).json({
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  });
};

// ================== REGISTER ==================
const register = async (req, res) => {
  // Accept both `phone` and `phoneNumber` from frontend
  const { name, email, phone, phoneNumber, password, status } = req.body;
  const phoneVal = phone || phoneNumber || null;

  // Because DB schema requires phone NOT NULL, require a phone value here
  if (!name || !email || !password || !phoneVal) {
    return res
      .status(400)
      .json({ error: "name, email, phone and password are required" });
  }

  try {
    // Hash password (bcrypt returns a string)
    const hashed = await bcrypt.hash(password, 10);
    const userId = randomUUID();
    const userStatus = status || "active"; // default per schema

    const insertQuery =
      "INSERT INTO `USERs` (user_id, full_name, phone, email, password_hash, status) VALUES (?, ?, ?, ?, ?, ?)";
    // store password_hash as binary to match VARBINARY column
    const passwordBuffer = Buffer.from(hashed, "utf8");

    connection.query(
      insertQuery,
      [userId, name, phoneVal, email, passwordBuffer, userStatus],
      (err) => {
        if (err) {
          console.error("Database insert error:", err, err?.sqlMessage);
          // Handle duplicate phone/email
          if (err.code === "ER_DUP_ENTRY") {
            const dupField =
              /for key '([^']+)'/.exec(err.sqlMessage || "")?.[1] || "";
            const message =
              dupField.includes("email") ||
              dupField.toLowerCase().includes("email")
                ? "Email already exists"
                : dupField.includes("phone") ||
                  dupField.toLowerCase().includes("phone")
                ? "Phone already exists"
                : "Duplicate entry";
            return res.status(409).json({ error: message });
          }
          return res.status(500).json({ error: "Database error" });
        }

        const newUser = {
          id: userId,
          name,
          email,
          phone: phoneVal,
          status: userStatus,
          created_at: new Date().toISOString(),
        };

        return res.status(201).json(newUser);
      }
    );
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// -------------------- CREATE USER (admin / frontend add) --------------------
const createUser = async (req, res) => {
  const { name, email, phone, password, status } = req.body;
  if (!name || !email || !phone || !password) {
    return res
      .status(400)
      .json({ error: "name, email, phone and password are required" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10); // string
    const userId = randomUUID();
    const userStatus = status || "inactive";

    const insertQuery =
      "INSERT INTO `USERs` (user_id, full_name, phone, email, password_hash, status) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(
      insertQuery,
      [userId, name, phone, email, hashed, userStatus],
      (err) => {
        if (err) {
          console.error("createUser DB error:", err, err?.sqlMessage);
          if (err.code === "ER_DUP_ENTRY") {
            const dupField =
              /for key '([^']+)'/.exec(err.sqlMessage || "")?.[1] || "";
            const message = dupField.toLowerCase().includes("email")
              ? "Email already exists"
              : dupField.toLowerCase().includes("phone")
              ? "Phone already exists"
              : "Duplicate entry";
            return res.status(409).json({ error: message });
          }
          return res.status(500).json({ error: "Database error" });
        }

        return res
          .status(201)
          .json({ id: userId, name, email, phone, status: userStatus });
      }
    );
  } catch (err) {
    console.error("createUser error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// -------------------- UPDATE USER --------------------
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password, status } = req.body;

  try {
    // If password provided, hash it
    let hashed = null;
    if (password) {
      hashed = await bcrypt.hash(password, 10);
    }

    // Build query: update only provided fields via COALESCE
    const sql = `
      UPDATE USERs
      SET full_name = COALESCE(?, full_name),
          phone = COALESCE(?, phone),
          email = COALESCE(?, email),
          password_hash = COALESCE(?, password_hash),
          status = COALESCE(?, status),
          updated_at = CURRENT_TIMESTAMP(3)
      WHERE user_id = ?
    `;
    connection.query(
      sql,
      [
        name || null,
        phone || null,
        email || null,
        hashed || null,
        status || null,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("updateUser DB error:", err, err?.sqlMessage);
          if (err.code === "ER_DUP_ENTRY") {
            const dupField =
              /for key '([^']+)'/.exec(err.sqlMessage || "")?.[1] || "";
            const message = dupField.toLowerCase().includes("email")
              ? "Email already exists"
              : dupField.toLowerCase().includes("phone")
              ? "Phone already exists"
              : "Duplicate entry";
            return res.status(409).json({ error: message });
          }
          return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0)
          return res.status(404).json({ error: "User not found" });
        return res.json({ ok: true, affected: result.affectedRows });
      }
    );
  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// -------------------- DELETE USER --------------------
const deleteUser = (req, res) => {
  const { id } = req.params;
  // Because foreign keys use ON DELETE CASCADE for some tables, a single DELETE should remove related rows.
  const sql = "DELETE FROM USERs WHERE user_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("deleteUser DB error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });
    return res.json({ ok: true, deletedId: id });
  });
};

module.exports = {
  login,
  getAllUsers,
  getUserById,
  register,
  createUser,
  updateUser,
  deleteUser,
};
