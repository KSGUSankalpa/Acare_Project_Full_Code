const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  }
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
