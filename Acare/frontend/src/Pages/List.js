import React, { useEffect, useState } from 'react';
import './List.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function List() {
  const [icuData, setIcuData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchICUData = async () => {
      const hospitalId = localStorage.getItem('hospitalId');  // Get logged-in hospital ID
      console.log('Logged-in hospital ID:', hospitalId);

      try {
        const response = await axios.get('http://localhost:5000/api/icu', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Include token
          },
        });

        // Filter out ICU data for the current logged-in hospital
        const filteredData = response.data.filter(icu => icu.name !== hospitalId);
        
        setIcuData(filteredData);
        console.log('Filtered ICU data:', filteredData);
      } catch (error) {
        console.error('Error fetching ICU data:', error);
      }
    };

    fetchICUData();
  }, []);

  const handleRequestBed = async (hospitalId) => {
    const loggedInHospitalName = localStorage.getItem('username'); // Get logged-in hospital name
    console.log('Requesting bed for hospital:', loggedInHospitalName);
    try {
      await axios.post('http://localhost:5000/api/Notification/send', {
        loggedInHospitalName,
        targetHospitalId: hospitalId,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Include token
        },
      });

      // Update the state to reflect decreased bed count
      setIcuData(prevIcus => {
        return prevIcus.map(icu => {
          if (icu.name === hospitalId) {
            return { ...icu, availableBeds: icu.availableBeds - 1 };
          }
          return icu;
        });
      });

      // Display success message
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Bed request sent successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

    } catch (error) {
      console.error('Error requesting bed:', error);

      // Display error message
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to send bed request. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
        
  const handleViewMore = (hospitalName) => {
    navigate(`/Detail/${hospitalName}`);
  };

  return (
    <>
      <Navbar />
      <div className="animated-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
      </div>
      <div className="icu-list">
        {icuData.map((icu, index) => (
          <div key={index} className="icu-box">
            <h2>{icu.location}</h2>
            <div className="icu-header">
              <h3>{icu.availableBeds}</h3>
              
              <button 
                className="view-more-button"  
                onClick={() => handleViewMore(icu.name)}
              >
                View More Info
              </button>
            </div>
            <p><strong>Location:</strong> {icu.location}</p>
            <p><strong>Contact:</strong> {icu.contact}</p>
            <table>
              <thead>
                <tr>
                  <th>ICU Name</th>
                  <th>Available Beds</th>
                  <th>Request Bed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{icu.name}</td>
                  <td>{icu.availableBeds}</td>
                  <td>
                    <button 
                      className="request-bed-button"
                      onClick={() => handleRequestBed(icu.name)}
                      disabled={icu.availableBeds === 0}
                    >
                      Request Bed
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}
