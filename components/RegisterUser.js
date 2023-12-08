import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/registerUser', { userName });
      console.log('User registered:', response.data);
      setMessage(`User ${userName} registered successfully`);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error registering user:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : error.message);
      setMessage(''); // Clear any previous messages
    }
  };

  return (
    <div className="form-container"> {/* Use the new class here */}
      <input 
        type="text" 
        value={userName} 
        onChange={(e) => setUserName(e.target.value)} 
        placeholder="Enter user name" 
        className="text-input" // Apply the text input style
      />
      <button onClick={handleRegister} className="submit-button">Register User</button>
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default RegisterUser;