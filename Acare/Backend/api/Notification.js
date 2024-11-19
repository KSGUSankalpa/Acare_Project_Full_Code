/*const express = require('express');
const router = express.Router();
const Notificationtable = require('../models/Notificationtable');

// Create a new notification
router.post('/', async (req, res) => {
  const { hospitalName, location } = req.body;

  const newNotification = new Notificationtable({
    hospitalName,
    location,
    message: `${hospitalName} has booked an ICU bed`
  });

  await newNotification.save();
  res.status(201).json(newNotification);
});

// Get all notifications
router.get('/', async (req, res) => {
  const notifications = await Notificationtable.find();
  res.status(200).json(notifications);
});

module.exports = router;*/
// routes/notification.js
const express = require('express');
const router = express.Router();
const Notificationtable = require('../models/Notification'); // Import your Notificationtable model

// POST route to send a notification
router.post('/send', async (req, res) => {
  const { loggedInHospitalName, targetHospitalId } = req.body; // Extract data from request body

  console.log('Received notification request:', req.body); // Debugging line

  try {
    // Check if the required fields are provided
    if (!loggedInHospitalName || !targetHospitalId) {
      return res.status(400).json({ error: 'Hospital name and target hospital ID are required.' });
    }

    // Create a new notification
    const notification = new Notificationtable({
      senderHospital: loggedInHospitalName,
      targetHospitalId: targetHospitalId,
      message: `${loggedInHospitalName} hospital has requested a bed.`,
    });

    // Save the notification to the database
    await notification.save();

    // Respond with success
    res.status(201).json({ message: 'Notificationtable sent successfully', notification });
  } catch (error) {
    console.error('Error sending notification:', error); // Log the error
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all notifications
// Get notifications for a specific hospital
router.get('/', async (req, res) => {
  
  const targetHospitalId = req.query.targetHospitalId;
  console.log('Received notification request for hospital:', targetHospitalId);
  try {
    // Filter notifications by the targetHospitalId
    const notifications = await Notificationtable.find({ targetHospitalId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});


module.exports = router;
