const router = require("express").Router();
let Driver = require("../models/Driver");
let Ambulance = require("../models/Ambulance"); // Import the Ambulance model
let Notification = require("../models/Notification"); // Import the Notification model

// Add Driver
// Route to add a new driver with default availability
router.post('/add', async (req, res) => {
    try {
      const { userId, driver_name, hospitalId, contact_no } = req.body;
  
      // Create new driver with isAvailable set to true by default
      const newDriver = new Driver({
        userId,
        driver_name,
        hospitalId,
        contact_no,
        isAvailable: true, // Set to available by default
      });
  
      await newDriver.save();
      res.status(201).json({ message: 'Driver added successfully!' });
    } catch (error) {
      console.error('Error adding driver:', error);
      res.status(500).json({ message: 'Server error: could not add driver.' });
    }
  });
  

// Get All Drivers

router.route("/").get((req, res) => {
    Driver.find()
        .then((drivers) => res.json(drivers))
        .catch((err) => {
            console.log(err);
        });
});

router.get("/", async (req, res) => {
    const { hospitalId } = req.query; // Get hospitalId from query params
    try {
        const drivers = hospitalId 
            ? await Driver.find({ hospitalId }) // Find drivers for specific hospital
            : await Driver.find(); // Find all drivers if hospitalId is not provided
        res.json(drivers);
    } catch (err) {
        console.error("Error fetching drivers:", err);
        res.status(500).json({ message: "Error fetching drivers" });
    }
});

// Route to get available drivers
router.get('/drivers', async (req, res) => {
    try {
      // Find drivers who are available
      const drivers = await Driver.find({ isAvailable: true });
      res.json(drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


// Route to assign a job to a driver and create a notification
router.post('/assign-job', async (req, res) => {
  const { driverId, ambulanceId, destination, destinationLatitude, destinationLongitude, senderHospital, targetHospitalId } = req.body;

  if (!driverId || !ambulanceId || !destination || !destinationLatitude || !destinationLongitude || !senderHospital || !targetHospitalId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Find the driver to get their userId
    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    // Update the driver with assigned ambulance, mark as unavailable, and add destination
    await Driver.findByIdAndUpdate(driverId, {
      assignedAmbulance: ambulanceId,
      isAvailable: false,
      $push: {
        destinations: {
          hospitalName: destination,
          latitude: destinationLatitude,
          longitude: destinationLongitude,
        }
      }
    });

    // Mark the ambulance as unavailable
    await Ambulance.findByIdAndUpdate(ambulanceId, { isAvailable: false });

    // Create a notification for this job assignment with driver userId
    const notificationMessage = `Driver ${driver.userId} has been assigned to a new job at ${destination}.`;
    const newNotification = new Notification({
      message: notificationMessage,
      driverId: driver.userId,
      read: false,
      senderHospital, // Include sender hospital
      targetHospitalId, // Include target hospital
    });

    await newNotification.save();

    res.status(200).json({ message: 'Driver assigned to job and notification created successfully' });
  } catch (error) {
    console.error('Error assigning driver to job and creating notification:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



//update Driver



router.route("/update/:id").put(async (req, res) => {
    let driverId = req.params.id;
    const { userId, driver_name, hospitalId, contact_no } = req.body; //D structure

    const updateDriver = {
        //object
        userId,
        driver_name,
        hospitalId,
        contact_no,
    };

    const update = await Driver.findByIdAndUpdate(driverId, updateDriver)
        .then(() => {
            res.status(200).send({
                status: "Driver Updated",
            });
        })
        .catch((err) => {
            console.log(err.message); //goes to terminal
            res.status(500).send({
                status: "Error with updating data",
                error: err.message,
            }); //goes to front end
        });
});

//delete Driver
router.route("/delete/:id").delete(async (req, res) => {
    let driverId = req.params.id;

    await Driver.findByIdAndDelete(driverId)
        .then(() => {
            res.status(200).send({ status: "Driver Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with deleting data", error: err.message });
        });
});

//take data from one user
router.route("/get/:id").get(async (req, res) => {
    let driverId = req.params.id;
    await Driver.findById(driverId)
        .then((Driver) => {
            res.status(200).send({ status: "user fetched", Driver });
        })
        .catch(() => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with get user", error: err.message });
        });
});



module.exports = router;

