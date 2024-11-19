import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Building2, 
  Wind, 
  Stethoscope, 
  Hospital
} from 'lucide-react';
import axios from 'axios';
import './Detail.css';
import Navbar from '../components/Navbar'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="stat-card">
    <div className="stat-card-content">
      <div className="stat-card-inner">
        <div className={`icon-container ${color}`}>
          <Icon className="stat-icon" />
        </div>
        <div className="stat-info">
          <p className="stat-label">{label}</p>
          <h3 className="stat-value">{value || 'N/A'}</h3>
        </div>
      </div>
    </div>
  </div>
);

const Detail = () => {
  const [bed, setBed] = useState(0);
  const [oxygenCapacity, setOxygenCapacity] = useState(0);
  const [ventilators, setVentilators] = useState(0);
  const [theater, setTheater] = useState(0);
  const [HName, setHname] = useState('');
  const { hospitalName } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/Bedavailability/fetchDetails/${hospitalName}`);
        if (response) {
          const data = response.data;
          setBed(data.beds);
          setVentilators(data.ventilators);
          setOxygenCapacity(data.oxygen);
          setTheater(data.theaters);
          setHname(data.username);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [hospitalName]);

  return (
    <>
    <Navbar/>
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">{HName || 'Hospital Details'}</h1>
          <p className="dashboard-subtitle">ICU Facility Information Dashboard</p>
        </div>
        
        <div className="stats-grid">
          <StatCard 
            icon={Building2}
            label="ICU Name"
            value={HName}
            color="bg-blue"
          />
          <StatCard 
            icon={Wind}
            label="Available CRRT"
            value={oxygenCapacity}
            color="bg-green"
          />
          <StatCard 
            icon={Stethoscope}
            label="Ventilators"
            value={ventilators}
            color="bg-purple"
          />
          <StatCard 
            icon={Hospital}
            label="Theaters"
            value={theater}
            color="bg-orange"
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Detail;