import React from 'react';
import './LocationModel.css';

const LocationModal = ({ isOpen, onClose, location, setLocation, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter Destination Location</h2>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="location-input"
        />
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-button" onClick={onSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;