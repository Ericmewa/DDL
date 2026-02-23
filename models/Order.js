const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, required: true },
  items: { type: Object, required: true },
  fabricType: { type: String },
  stainTreatment: { type: Boolean },
  specialInstructions: { type: String },
  photos: [String],
  expressService: { type: Boolean },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
