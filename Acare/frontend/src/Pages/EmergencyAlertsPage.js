import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alertSound from '../Assets/alert.wav';
import './EmergencyAlertsPage.css';
import Navbar from '../components/Navbar';
import { 
  FaExclamationTriangle, 
  FaBell, 
  FaUser, 
  FaClock,
  FaExclamationCircle 
} from 'react-icons/fa';

const SOCKET_ENDPOINT = 'http://localhost:5000';
const ALERTS_ENDPOINT = `${SOCKET_ENDPOINT}/getSentAlerts`;

function EmergencyAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
    
    const socket = io(SOCKET_ENDPOINT, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on('newAlert', (alert) => {
      setAlerts((prevAlerts) => [alert, ...prevAlerts]);
      showNotification(alert);
      playAlertSound();
    });

    socket.on('connect_error', () => {
      console.error('Connection error. Retrying...');
    });

    socket.on('reconnect', (attempt) => {
      console.log(`Reconnected after ${attempt} attempts`);
    });

    return () => socket.disconnect();
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch(ALERTS_ENDPOINT);
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      toast.error('Failed to fetch alerts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (alert) => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Emergency Alert', { 
            body: `${alert.alertMessage} (Driver ID: ${alert.driver_id})`
          });
        }
      });
    }

    toast.error(
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaExclamationCircle />
        <div>
          <div>{alert.alertMessage}</div>
          <div style={{ fontSize: '0.8em', opacity: 0.8 }}>
            Driver ID: {alert.driver_id}
          </div>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const playAlertSound = () => {
    const audio = new Audio(alertSound);
    audio.play().catch(error => console.error('Failed to play sound:', error));
  };

  if (loading) {
    return (
      <div className='Header'>
        <Navbar />
        <div className="emergency-alerts-page">
          <div className="alerts-header">
            <h1>Emergency Alerts</h1>
          </div>
          <div className="alert-list">
            {[1, 2, 3].map((index) => (
              <div key={index} className="alert-item skeleton" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='Header'>
      <Navbar />
      <div className="animated-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      <div className="emergency-alerts-page">
        <div className="alerts-header">
          <FaBell className="alert-icon" />
          <h1>Emergency Alerts</h1>
        </div>
        <div className="alert-list">
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div key={index} className="alert-item">
                <div className="alert-content">
                  <div className="alert-icon-wrapper">
                    <FaExclamationTriangle />
                  </div>
                  <div className="alert-details">
                    <h3>
                      <FaExclamationCircle />
                      {alert.alertMessage}
                    </h3>
                    <p>
                      <FaUser />
                      <strong>Driver ID:</strong> {alert.driver_id}
                    </p>
                    <div className="timestamp">
                      <FaClock />
                      {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-alerts">
              <FaBell className="no-alerts-icon" />
              <p>No alerts at the moment.</p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EmergencyAlertsPage;