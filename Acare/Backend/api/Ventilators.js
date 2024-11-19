const express = require('express');
const Hospital = require('../models/Hospital_login');
const router = express.Router();
const authenticate = require('../config/authenticate');

// Route to update ventilators
router.put('/updateventilators', authenticate, async (req, res) => {
  const { username, ventilators } = req.body;

  console.log('Received request to update ventilators:', { username, ventilators });

  // Validate ventilators count
  if (typeof ventilators !== 'number' || ventilators < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid ventilators count!' });
  }

  try {
      // Update hospital record using findOneAndUpdate
      const hospital = await Hospital.findOneAndUpdate(
          { username: username },
          { ventilators: ventilators },
          { new: true } // Return the updated document
      );

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      console.log('Updated ventilators count:', hospital.ventilators);

      res.status(200).json({
          status: 'SUCCESS',
          message: 'ventilators count updated successfully!',
          availableventilators: hospital.ventilators,
      });
  } catch (err) {
      console.error('Error updating ventilators:', err);
      res.status(500).json({
          status: 'FAILED',
          message: 'An error occurred while updating ventilators count!',
          error: err.message,
      });
  }
});

module.exports = router;
