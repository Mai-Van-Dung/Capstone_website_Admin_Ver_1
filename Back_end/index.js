const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routers/auth");
const devicesRoutes = require("./routers/devices"); // <-- add this

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// register routers
app.use("/api/auth", authRoutes);
app.use("/api/devices", devicesRoutes); // <-- add this

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
