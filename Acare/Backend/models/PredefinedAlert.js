const mongoose = require('mongoose');

const predefinedAlertSchema = new mongoose.Schema({
  alertMessage: { type: String, required: true }
});

const PredefinedAlert = mongoose.model('PredefinedAlert', predefinedAlertSchema);
module.exports = PredefinedAlert;