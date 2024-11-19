import React, { useState } from 'react';
import './SignupPage.css';
import { FaUser, FaEnvelope, FaLock, FaHospital, FaBed, FaPhone } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [beds, setBeds] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const requestData = { username, hospitalId, contact, email, password, beds };
      console.log('Sending registration data:', requestData);

      const response = await axios.post('http://localhost:5000/api/Hospital_login/signup', requestData);
      
      if (response.data.status === 'FAILED') {
        // Set the error message from the backend
        setErrorMessage(response.data.message);
      } else {
        console.log(response.data);
        navigate('/ICU List'); // Navigate only on success
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className='wrapper'>
      <div className='signup-container'>
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className='input-box'>
            <FaUser className='icon' />
            <input 
              type='text' 
              placeholder='Username' 
              required 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className='input-box'>
            <FaHospital className='icon' />
            <input 
              type='text' 
              placeholder='Hospital ID' 
              required 
              value={hospitalId} 
              onChange={(e) => setHospitalId(e.target.value)} 
            />
          </div>
          
          <div className='input-box'>
            <FaPhone className='icon' />
            <input 
              type='text' 
              placeholder='Phone Number' 
              required 
              value={contact} 
              onChange={(e) => setContact(e.target.value)} 
            />
          </div>

          <div className='input-box'>
            <FaEnvelope className='icon' />
            <input 
              type='email' 
              placeholder='Email' 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className='input-box'>
            <FaLock className='icon' />
            <input 
              type='password' 
              placeholder='Password' 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <div className='input-box'>
            <FaLock className='icon' />
            <input 
              type='password' 
              placeholder='Confirm Password' 
              required 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>

          <div className='input-box'>
            <FaBed className='icon' />
            <input 
              type='number' 
              placeholder='Number of Beds' 
              required 
              value={beds} 
              onChange={(e) => setBeds(e.target.value)} 
            />
          </div>

          <button type='submit'>Sign Up</button>
          
        </form>

        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <div className='login-link'>
          <p>Already have an account? <a href='/'>Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
