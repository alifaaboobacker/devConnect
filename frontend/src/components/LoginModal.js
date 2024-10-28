// src/components/LoginModal.js
import React, { useState } from 'react';
import '../styles/LoginModal.css';

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful login: close the modal or redirect
        console.log('Login successful');
        onClose();
      } else {
        // Handle invalid login response
        const errorText = await response.text();
        setErrorMessage(errorText);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button type="button" onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>

          <h2>Welcome Back!</h2>
          <div className="form-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>
            <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className='buttonGroup'>
            <button type="submit" className="login">Log In</button>
            {/* <button type="button" onClick={onClose} className="close-button">Close</button> */}
            </div>
          </form>
          </div>
        </div>
      </div>
    )
  );
}

export default LoginModal;
