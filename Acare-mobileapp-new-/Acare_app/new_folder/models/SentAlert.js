// mobile-backend/models/SentAlert.js
const mongoose = require('mongoose');

const sentAlertSchema = new mongoose.Schema({
  alertMessage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  driver_id: { type: String, required: true } // Add driver_id as a required field
});

const SentAlert = mongoose.model('SentAlert', sentAlertSchema);
module.exports = SentAlert;
