const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const mockUser = {
  id: 'mock-id-123',
  email: 'user1',
  password: '1234',
  role: 'user',
};


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    const token = jwt.sign({ email, role: mockUser.role, userId: 'mock-id-123' }, // ✅ ใช้ id mock ไปก่อน
      'secret123',
      { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
});

module.exports = router;
