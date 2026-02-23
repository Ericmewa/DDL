const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { userId, serviceType, items, fabricType, stainTreatment, specialInstructions, photos, expressService, total } = req.body;
    if (!userId || !serviceType || !items || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const order = new Order({
      user: userId,
      serviceType,
      items,
      fabricType,
      stainTreatment,
      specialInstructions,
      photos,
      expressService,
      total
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
