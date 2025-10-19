const express = require("express");
const router = express.Router();
const {
  listDevices,
  getDevice,
  updateDevice,
  deleteDevice,
} = require("../controllers/deviceControllers");

router.get("/", listDevices); // GET /api/devices
router.get("/:id", getDevice); // GET /api/devices/:id
router.put("/:id", updateDevice); // PUT /api/devices/:id
router.delete("/:id", deleteDevice); // DELETE /api/devices/:id  <-- added

module.exports = router;
