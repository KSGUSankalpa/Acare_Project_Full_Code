const express = require('express');
const Hospital = require('../models/Hospital_login');
const router = express.Router();
const authenticate = require('../config/authenticate');

// Route to update theater
router.put('/updatetheaters', authenticate, async (req, res) => {
  const { username, theaters } = req.body;

  console.log('Received request to update theater:', { username, theaters });

  // Validate theater count
  if (typeof theaters !== 'number' || theaters < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid theater count!' });
  }

  try {
      // Update hospital record using findOneAndUpdate
      const hospital = await Hospital.findOneAndUpdate(
          { username: username },
          { theaters: theaters },
          { new: true } // Return the updated document
      );

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      console.log('Updated theater count:', hospital.theaters);

      res.status(200).json({
          status: 'SUCCESS',
          message: 'Theater count updated successfully!',
          availableventilators: hospital.theater,
      });
  } catch (err) {
      console.error('Error updating theater:', err);
      res.status(500).json({
          status: 'FAILED',
          message: 'An error occurred while updating Theater count!',
          error: err.message,
      });
  }
});

module.exports = router;
