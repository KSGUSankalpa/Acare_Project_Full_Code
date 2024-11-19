const express = require('express');
const router = express.Router();
const Ambulance = require('../models/Ambulance'); 

// Add Ambulance
router.post("/add", async (req, res) => {
  const { Ambulance_no, hospitalId} = req.body;

  try {
    // Check if ambulance already exists
    const existingAmbulance = await Ambulance.findOne({ Ambulance_no });
    if (existingAmbulance) {
      return res.status(400).json({ message: "Ambulance with this number already exists" });
    }

    // Create a new Ambulance with driverId included and isAvailable set to true
    const newAmbulance = new Ambulance({ 
      Ambulance_no, 
      hospitalId, 
      isAvailable: true // Set to available by default
    });
    
    await newAmbulance.save();
    return res.status(200).json({ message: "Ambulance added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error adding ambulance", error: err.message });
  }
});



// Get All Ambulances
// router.get("/", async (req, res) => {
//   try {
//     const ambulances = await Ambulance.find();
//     return res.status(200).json(ambulances);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Error fetching ambulances", error: err.message });
//   }
// });

// Route to get available ambulances for a specific hospital
router.get('/ambulance', async (req, res) => {
  try {
    const { hospitalId } = req.query;

    if (!hospitalId) {
      return res.status(400).json({ message: 'Hospital ID is required' });
    }

    // Find ambulances that are available and belong to the specified hospital
    const ambulances = await Ambulance.find({ hospitalId, isAvailable: true });

    res.status(200).json(ambulances);
  } catch (error) {
    console.error('Error fetching available ambulances:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Ambulance
router.put("/update/:id", async (req, res) => {
  const { Ambulance_no, hospitalId } = req.body;
  const ambulanceId = req.params.id;

  try {
    const updatedAmbulance = await Ambulance.findByIdAndUpdate(ambulanceId, { Ambulance_no, hospitalId }, { new: true });
    if (!updatedAmbulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    return res.status(200).json({ message: "Ambulance updated", data: updatedAmbulance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating ambulance", error: err.message });
  }
});

// Delete Ambulance
router.delete("/delete/:id", async (req, res) => {
  const ambulanceId = req.params.id;

  try {
    await Ambulance.findByIdAndDelete(ambulanceId);
    return res.status(200).json({ message: "Ambulance deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting ambulance", error: err.message });
  }
});

module.exports = router;
