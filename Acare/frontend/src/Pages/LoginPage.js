import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { FaUser, FaLock } from "react-icons/fa";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to authenticate user
      const response = await axios.post('http://localhost:5000/api/Hospital_login/signin', {
        username,
        password,
      });
  
      if (response.data.status === 'SUCCESS') {
        // Save token, username, and hospitalId in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('hospitalId', response.data.hospitalId);
  
        // Handle 'Remember Me' functionality
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }
  
        // Navigate to the home page
        navigate('/Home');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during sign in. Please try again.');
    }
  };
  
  return (
    <div className='wrapper'>
      <div className='login-container'>
        <h1>Welcome</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-box'>
            <FaUser className='icon' />
            <input 
              type='text' 
              placeholder='Hospital name' 
              required 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
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
          <div className='remember-forget'>
            <label>
              <input 
                type='checkbox' 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href='#'>Forgot password?</a>
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <div className='register-link'>
          <p>Don't have an account? <a href='./SignupPage'>Register</a></p>
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
