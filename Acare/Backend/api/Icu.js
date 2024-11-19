const express = require('express');
const Hospital = require('../models/Hospital_login');
const router = express.Router();



// Get ICU data
router.get('/', async (req, res) => {
  try {
    const icuData = await Hospital.find({}, 'hospitalId username contact beds');
    const formattedData = icuData.map(icu => ({
      name: icu.hospitalId,
      location: icu.username,
      contact: icu.contact,
      availableBeds: icu.beds,
    }));
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// Request bed (update available beds)
router.put('/api/icu/request-bed/:hospitalId', async (req, res) => {
  const { hospitalId } = req.params;
  try {
    const hospital = await Hospital.findOne({ hospitalId: hospitalId });
    if (!hospital || hospital.beds <= 0) {
      return res.status(404).json({ message: 'Hospital not found or no beds available' });
    }

    hospital.beds -= 1; // Decrease available beds
    await hospital.save();

    res.json({ message: 'Bed requested successfully', availableBeds: hospital.beds });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
