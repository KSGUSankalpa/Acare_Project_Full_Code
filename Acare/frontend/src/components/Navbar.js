

import React, { useState } from 'react';
import './Navbar.css';
import { FaBell, FaCog, FaSignOutAlt, FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav>
        <div className="mobile-menu">
          <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        <div className={`nav-container ${isOpen ? 'active' : ''}`}>
          <div className='nav-links'>
            <ul>
              <li><a href="/Home" onClick={() => setIsOpen(false)}>Home</a></li>
              <li><a href="/ICU List" onClick={() => setIsOpen(false)}>ICU List</a></li>
              <li><a href="/ambulance" onClick={() => setIsOpen(false)}>Ambulance</a></li>
              <li><a href="/DriverTable" onClick={() => setIsOpen(false)}>Drivers</a></li>
              <li><a href="/location" onClick={() => setIsOpen(false)}>Live Location</a></li>
            </ul>
          </div>
          <div className='icons'>
          <a href="/NotificationsPage"><FaEnvelope /></a>
            <a href="/emergency-alerts"><FaBell /></a>
            <a href="/"><FaSignOutAlt /></a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;