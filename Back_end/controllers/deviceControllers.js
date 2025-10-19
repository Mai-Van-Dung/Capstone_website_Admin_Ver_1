const connection = require("../config/database");

// List devices
const listDevices = (req, res) => {
  const sql = `
    SELECT d.device_id, d.device_type, d.serial_number, d.owner_user_id, d.requested_by_user_id,
           d.status as device_status, d.created_at, d.updated_at,
           da.location, da.assigned_at
    FROM DEVICEs d
    LEFT JOIN DEVICE_ASSIGNMENTs da
      ON da.device_id = d.device_id AND da.active_device = 1
    ORDER BY d.created_at DESC
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("DB listDevices error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    const devices = (results || []).map((r) => ({
      id: r.device_id,
      serial: r.serial_number,
      type: r.device_type,
      owner_user_id: r.owner_user_id,
      status: r.device_status,
      location: r.location,
      assigned_at: r.assigned_at,
      created_at: r.created_at,
      updated_at: r.updated_at,
    }));
    res.json(devices);
  });
};

const getDevice = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT d.device_id, d.device_type, d.serial_number, d.owner_user_id, d.status as device_status,
           da.location, da.assigned_at
    FROM DEVICEs d
    LEFT JOIN DEVICE_ASSIGNMENTs da
      ON da.device_id = d.device_id AND da.active_device = 1
    WHERE d.device_id = ? LIMIT 1
  `;
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.error("DB getDevice error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (!results || results.length === 0)
      return res.status(404).json({ error: "Device not found" });
    const r = results[0];
    res.json({
      id: r.device_id,
      serial: r.serial_number,
      type: r.device_type,
      owner_user_id: r.owner_user_id,
      status: r.device_status,
      location: r.location,
      assigned_at: r.assigned_at,
    });
  });
};

const updateDevice = (req, res) => {
  const { id } = req.params;
  const { serial, status } = req.body;
  const sql = `UPDATE DEVICEs SET serial_number = COALESCE(?, serial_number), status = COALESCE(?, status) WHERE device_id = ?`;
  connection.query(sql, [serial || null, status || null, id], (err, result) => {
    if (err) {
      console.error("DB updateDevice error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    return res.json({ ok: true, affected: result.affectedRows });
  });
};

const deleteDevice = (req, res) => {
  const { id } = req.params;
  // First try to delete assignments referencing device (if your FK restricts)
  // Here we'll attempt single DELETE on DEVICEs; adjust if you need cascade or checks.
  const sql = "DELETE FROM DEVICEs WHERE device_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("DB deleteDevice error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Device not found" });
    return res.json({ ok: true, deletedId: id });
  });
};

module.exports = {
  listDevices,
  getDevice,
  updateDevice,
  deleteDevice,
};
