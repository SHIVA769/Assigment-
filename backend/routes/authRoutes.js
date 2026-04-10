const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Register Admin (First time setup)
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Admin
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid username or password' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    res.json({ token, username: admin.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
