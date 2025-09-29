const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routers/auth');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Sử dụng route
app.use('/api/auth', authRoutes);

// app.get("/users", (req, res) => {
//   // Ví dụ: lấy tất cả user
//   res.json([
//     { email: "user1@gmail.com", password: "123456" },
//     { email: "user2@gmail.com", password: "abcdef" }
//   ]);
// });

app.get('/', (req, res) => {
  res.send('Server is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
