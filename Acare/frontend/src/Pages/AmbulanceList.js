import React, { useState, useEffect } from 'react';
import './AmbulanceList.css';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2'; // Import SweetAlert
import pic from '../Assets/pic.png';

const AmbulanceIcon = () => (
  <img src={pic} alt="Ambulance" className='ambulance-icon' />
);

const hospitalLocations = {
  "National Hospital of Sri Lanka": { latitude: 6.9271, longitude: 79.8612 },
  "Kandy General Hospital": { latitude: 7.2906, longitude: 80.6337 },
  "Colombo South Teaching Hospital": { latitude: 6.8296, longitude: 79.8806 },
  "Lady Ridgeway Hospital": { latitude: 6.9275, longitude: 79.8692 },
  "Jaffna Teaching Hospital": { latitude: 9.6615, longitude: 80.0255 },
};

const AmbulanceList = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedAmbulance, setSelectedAmbulance] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  const fetchResources = async () => {
    const hospitalId = localStorage.getItem('hospitalId');
    console.log("Retrieved hospitalId from localStorage:", hospitalId);

    if (!hospitalId) {
      console.warn("No hospitalId found in localStorage.");
      return;
    }

    try {
      const ambulanceResponse = await fetch(`http://localhost:5000/api/Ambulance/ambulance?hospitalId=${hospitalId}`);
      const ambulanceData = await ambulanceResponse.json();
      setAmbulances(ambulanceData);

      const driverResponse = await fetch('http://localhost:5000/api/Driver/drivers');
      const driverData = await driverResponse.json();
      setDrivers(driverData);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  useEffect(() => {
    fetchResources(); // Fetch ambulances and drivers on mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const hospitalId = localStorage.getItem('hospitalId');
    const selectedDriverData = drivers.find((driver) => driver._id === selectedDriver);
    const selectedAmbulanceData = ambulances.find((ambulance) => ambulance._id === selectedAmbulance);
    const destinationCoords = hospitalLocations[selectedDestination];
  
    if (!hospitalId || !selectedDriverData || !selectedAmbulanceData || !destinationCoords) {
      Swal.fire("Error", "Please select valid driver, ambulance, and destination options.", "error");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/Driver/assign-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driverId: selectedDriverData._id,
          ambulanceId: selectedAmbulanceData._id,
          destination: selectedDestination,
          destinationLatitude: destinationCoords.latitude,
          destinationLongitude: destinationCoords.longitude,
          senderHospital: hospitalId, // Attach sender hospital ID
          targetHospitalId: destinationCoords.hospitalId || selectedDestination, // Attach target hospital ID
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Swal.fire(
          "Request Sent Successfully",
          `Driver: ${selectedDriverData.driver_name} ${selectedDriverData.userId}\nAmbulance: ${selectedAmbulanceData.Ambulance_no}\nDestination: ${selectedDestination}`,
          "success"
        );
        setSelectedDriver('');
        setSelectedAmbulance('');
        setSelectedDestination('');
        fetchResources(); // Refresh lists after successful assignment
      } else {
        Swal.fire("Failed to Send Request", result.message, "error");
      }
    } catch (error) {
      console.error('Error sending request:', error);
      Swal.fire("Error", "An error occurred while sending the request. Please try again.", "error");
    }
  };
  
  
  return (
    <>
      <Navbar />
      <div className="animated-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">Request Ambulance</h2>

          {/* Driver Selection */}
          <div className="form-group">
            <label htmlFor="driver" className="form-label">Select Driver</label>
            <select
              id="driver"
              className="form-select"
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              required
            >
              <option value="">Choose a driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {`${driver.driver_name} ${driver.userId}`}
                </option>
              ))}
            </select>
          </div>

          {/* Ambulance Selection */}
          <div className="form-group">
            <label htmlFor="ambulance" className="form-label">Select Ambulance</label>
            <select
              id="ambulance"
              className="form-select"
              value={selectedAmbulance}
              onChange={(e) => setSelectedAmbulance(e.target.value)}
              required
            >
              <option value="">Choose an ambulance</option>
              {ambulances && ambulances.length > 0 ? (
                ambulances.map((ambulance) => (
                  <option key={ambulance._id} value={ambulance._id}>
                    {ambulance.Ambulance_no}
                  </option>
                ))
              ) : (
                <option disabled>No ambulances available</option>
              )}
            </select>
          </div>

          {/* Destination Hospital Selection */}
          <div className="form-group">
            <label htmlFor="destination" className="form-label">Destination Hospital</label>
            <select
              id="destination"
              className="form-select"
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              required
            >
              <option value="">Choose a hospital</option>
              {Object.keys(hospitalLocations).map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="form-submit">Send Request</button>
        </form>
      </div>
    </>
  );
};

export default AmbulanceList;
