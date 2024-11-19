const express = require('express');
const Hospital = require('../models/Hospital_login');
const router = express.Router();
const authenticate = require('../config/authenticate');

// Route to update oxygen
router.put('/updateoxygen', authenticate, async (req, res) => {
  const { username, oxygenCapacity } = req.body;

  console.log('Received request to update oxygen:', { username, oxygenCapacity });

  // Validate oxygen count
  if (typeof oxygenCapacity !== 'number' || oxygenCapacity < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid oxygen count!' });
  }

  try {
      // Update hospital record using findOneAndUpdate
      const hospital = await Hospital.findOneAndUpdate(
          { username: username },
          { oxygenCapacity: oxygenCapacity},
          { new: true } // Return the updated document
      );

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      console.log('Updated oxygen count:', hospital.oxygenCapacity);

      res.status(200).json({
          status: 'SUCCESS',
          message: 'oxygen count updated successfully!',
          oxygenCapacity: hospital.oxygenCapacity,
      });
  } catch (err) {
      console.error('Error updating oxygen:', err);
      res.status(500).json({
          status: 'FAILED',
          message: 'An error occurred while updating oxygen count!',
          error: err.message,
      });
  }
});

module.exports = router;
