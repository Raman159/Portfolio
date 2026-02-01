import express from 'express';
import Admin from '../models/Admin.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/change-password', async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const admin = await Admin.findOne({ username, password: oldPassword });
    if (admin) {
      admin.password = newPassword;
      await admin.save();
      res.json({ success: true, message: 'Password changed' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
