const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');

// In-memory store for codes (replace with DB or cache in production)
const codes = {};

// Send reset code
router.post('/request', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const code = crypto.randomInt(100000, 999999).toString();
  codes[email] = code;
  // TODO: Send code via email
  res.json({ message: 'Reset code sent to email.' });
});

// Verify code
router.post('/verify', (req, res) => {
  const { email, code } = req.body;
  if (codes[email] !== code) return res.status(400).json({ error: 'Invalid code.' });
  res.json({ message: 'Code verified.' });
});

// Reset password
router.post('/reset', async (req, res) => {
  const { email, newPassword, code } = req.body;
  if (codes[email] !== code) return res.status(400).json({ error: 'Invalid code.' });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.password = newPassword;
  await user.save();
  delete codes[email];
  res.json({ message: 'Password reset successful.' });
});

module.exports = router;
