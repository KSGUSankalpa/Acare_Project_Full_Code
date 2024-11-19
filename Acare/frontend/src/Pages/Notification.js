import React, { useEffect, useState } from 'react';
import './Notification.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Bell, Hospital, Clock, AlertCircle } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const hospitalId = localStorage.getItem('hospitalId');
      if (!hospitalId) {
        console.error('Hospital ID not found in localStorage');
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/Notification?targetHospitalId=${hospitalId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        const sortedNotifications = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-page">
      <div className="header">
        <Navbar />
      </div>
      <div className="animated-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
      <div className="notifications-wrapper">
      <div className="notification-header">
          <Bell className="bell-icon" />
          <h1>Notifications</h1>
      </div>

        <div className="notifications-container">
          {notifications.length === 0 ? (
            <div className="empty-notifications">
              <AlertCircle className="alert-icon" />
              <p>No notifications available</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div key={notification._id} className="notification-card">
                <div className="notification-content">
                  <div className="hospital-icon-wrapper">
                    <Hospital className="hospital-icon" />
                  </div>
                  <div className="notification-details">
                    <h3 className="hospital-name">
                      From: {notification.senderHospital} Hospital
                    </h3>
                    <p className="notification-message">{notification.message}</p>
                    <div className="notification-time">
                      <Clock className="clock-icon" />
                      <span>{new Date(notification.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;