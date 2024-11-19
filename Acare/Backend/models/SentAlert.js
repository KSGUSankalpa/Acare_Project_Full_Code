// web-backend/models/SentAlert.js
const mongoose = require('mongoose');

const sentAlertSchema = new mongoose.Schema({
  alertMessage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const SentAlert = mongoose.model('SentAlert', sentAlertSchema);
module.exports = SentAlert;