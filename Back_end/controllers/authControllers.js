const connection = require('../config/database'); // Kết nối MySQL


const login = (req, res) => {
  const { email, password } = req.body;

  console.log('Email:', email); 
  console.log('Password:', password); 

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?'; 
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log chi tiết lỗi
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    // Đăng nhập thành công
    const user = results[0];
    res.status(200).json({ message: 'Login successful', user });
  });
};

module.exports = { login };