// // models/Notification.js
// const mongoose = require('mongoose');

// const notificationSchema = new mongoose.Schema({
//   message: {
//     type: String,
//     required: true,
//   },
//   read: {
//     type: Boolean,
//     default: false,
//   }, 
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
//   driverId: {
//     type: String,
//     ref: 'Driver',
//   },
//   // Optionally include any additional fields you need
// });

// module.exports = mongoose.model('Notification', notificationSchema);
// models/Notification.js
const mongoose = require('mongoose');

const notificationtableSchema = new mongoose.Schema({
  senderHospital: { type: String, required: true },
  targetHospitalId: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notifications', notificationtableSchema);
