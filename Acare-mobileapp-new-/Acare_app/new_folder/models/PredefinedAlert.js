const mongoose = require('mongoose');

// Define the schema for predefined alerts
const predefinedalertSchema = new mongoose.Schema({
  alertMessage: { type: String, required: true }
});

// Create the model from the schema
const PredefinedAlert = mongoose.model('PredefinedAlert', predefinedalertSchema);

module.exports = PredefinedAlert;
