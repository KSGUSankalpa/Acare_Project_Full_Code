const express = require('express');
const Hospital = require('../models/Hospital_login');
const router = express.Router();
const authenticate = require('../config/authenticate');

// Route to update beds



// fetch details 
router.get('/fetchBed', async (req, res) => {
    try {
      const { name } = req.query;  // Retrieve name from query parameters
      const user = await Hospital.findOne({ username: name });
  
      if (!user) {
        return res.status(404).json({ error: 'Hospital not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

 router.post('/fetchDetails/:id', async (req, res) => {
    try {
      let id = req.params.id;
      const user = await Hospital.findOne({ hospitalId: id });
  
      if (!user) {
        return res.status(404).json({ error: 'hos not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'server error' });
    }
  });










router.put('/updatebeds', authenticate, async (req, res) => {
  const { username, beds } = req.body;

  // Validate bed count
  if (typeof beds !== 'number' || beds < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid bed count!' });
  }

  try {
      const hospital = await Hospital.findOneAndUpdate(
          { username: username },
          { beds: beds },
          { new: true }
      );

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      res.status(200).json({
          status: 'SUCCESS',
          message: 'Bed count updated successfully!',
          availablebeds: hospital.beds,
      });
  } catch (err) {
      console.error('Error updating beds:', err);
      res.status(500).json({
          status: 'FAILED',
          message: 'An error occurred while updating bed count!',
          error: err.message,
      });
  }
});

// Route to update oxygen
router.put('/updateoxygen', authenticate, async (req, res) => {
  const { username, oxygen } = req.body;

  // Validate oxygen count
  if (typeof oxygen !== 'number' || oxygen < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid oxygen count!' });
  }

  try {
      const hospital = await Hospital.findOneAndUpdate(
          { username: username },
          { oxygen: oxygen },
          { new: true }
      );

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      res.status(200).json({
          status: 'SUCCESS',
          message: 'Oxygen count updated successfully!',
          oxygen: hospital.oxygen,
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

// Route to update theater
router.put('/updatetheaters', authenticate, async (req, res) => {
  const { username, theaters } = req.body;

  // Validate theater count
  if (typeof theaters !== 'number' || theaters < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid theater count!' });
  }

  try {
      const hospital = await Hospital.findOneAndUpdate(
          { username: username },
          { theaters: theaters },
          { new: true }
      );

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      res.status(200).json({
          status: 'SUCCESS',
          message: 'Theater count updated successfully!',
          theaters: hospital.theaters,
      });
  } catch (err) {
      console.error('Error updating theaters:', err);
      res.status(500).json({
          status: 'FAILED',
          message: 'An error occurred while updating theater count!',
          error: err.message,
      });
  }
});

// Route to update ventilators
router.put('/updateventilators', authenticate, async (req, res) => {
  const { username, ventilators } = req.body;

  // Validate ventilator count
  if (typeof ventilators !== 'number' || ventilators < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid ventilator count!' });
  }

  try {
      const hospital = await Hospital.findOneAndUpdate(
          { username: username },
          { ventilators: ventilators },
          { new: true }
      );

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      res.status(200).json({
          status: 'SUCCESS',
          message: 'Ventilator count updated successfully!',
          ventilators: hospital.ventilators,
      });
  } catch (err) {
      console.error('Error updating ventilators:', err);
      res.status(500).json({
          status: 'FAILED',
          message: 'An error occurred while updating ventilator count!',
          error: err.message,
      });
  }
});

module.exports = router;
