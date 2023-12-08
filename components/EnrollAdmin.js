import React, { useState } from 'react';
import axios from 'axios';

function EnrollAdmin() {
  const [adminName, setAdminName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEnroll = async () => {
    try {
      const response = await axios.post('http://localhost:5000/enrollAdmin', { adminName });
      console.log('Admin enrolled:', response.data);
      setMessage(`Admin ${adminName} enrolled successfully`);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error enrolling admin:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : error.message);
      setMessage(''); // Clear any previous messages
    }
  };

  return (
    <div className="form-group">
    <input 
        type="text" 
        value={adminName} 
        onChange={(e) => setAdminName(e.target.value)} 
        placeholder="Enter admin name" 
        className="text-input"
    />
    <button onClick={handleEnroll} className="submit-button">Enroll Admin</button>
    {message && <div className="message">{message}</div>}
    {error && <div className="error">{error}</div>}
    </div>

  );
}

export default EnrollAdmin;