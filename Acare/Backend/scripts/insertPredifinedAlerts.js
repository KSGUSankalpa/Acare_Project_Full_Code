const mongoose = require('mongoose');
const PredefinedAlert = require('../models/PredefineAlert');
console.log("MongoDB URI:", process.env.MONGODB_URI);
require('dotenv').config();


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,            //options that handle deprecation warnings
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Predefined alerts data
const predefinedAlerts = [
  { alertMessage: 'Accident Alert' },
  { alertMessage: 'Medical Emergency' },
  { alertMessage: 'Vehicle Breakdown' },
  { alertMessage: 'Road Block' },
];

// Insert predefined alerts into the database
async function insertPredefinedAlerts() {
  try {
    await PredefinedAlert.insertMany(predefinedAlerts);
    console.log("Predefined alerts inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting predefined alerts:", error);
    mongoose.connection.close();
  }
}

insertPredefinedAlerts();