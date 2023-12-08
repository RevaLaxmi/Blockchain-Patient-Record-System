import React, { useState } from 'react';
import axios from 'axios';

function AccessPatientRecordForm() {
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [patientData, setPatientData] = useState('');
  const [error, setError] = useState('');

  const handleAccessRecord = async () => {
    try {
      const response = await axios.post('http://localhost:5000/accessPatientRecord', { 
        patientName, 
        phoneNumber, 
        password 
      });
      setPatientData(response.data.patientData);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error accessing patient record:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : error.message);
      setPatientData(''); // Clear any previous data
    }
  };

  return (
    <div className="form-container">
      <input 
        type="text" 
        value={patientName} 
        onChange={(e) => setPatientName(e.target.value)} 
        placeholder="Patient Name" 
      />
      <input 
        type="text" 
        value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)} 
        placeholder="Phone Number" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleAccessRecord}>Access Patient Record</button>
      {patientData && <div><strong>Patient Data:</strong> {patientData}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default AccessPatientRecordForm;