import React, { useState } from 'react';
import axios from 'axios';

function RegisterPatientForm() {
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referringDoctor, setReferringDoctor] = useState('');
  const [illness, setIllness] = useState('');
  const [medication, setMedication] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRegisterPatient = async () => {
    try {
      const response = await axios.post('http://localhost:5000/registerPatient', {
        patientName,
        phoneNumber,
        referringDoctor,
        illness,
        medication,
        password
      });
      console.log('Patient registered:', response.data);
      setMessage(`Patient ${patientName} registered successfully`);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error registering patient:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.error : error.message);
      setMessage(''); // Clear any previous messages
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
        type="text" 
        value={referringDoctor} 
        onChange={(e) => setReferringDoctor(e.target.value)} 
        placeholder="Referring Doctor" 
      />
      <input 
        type="text" 
        value={illness} 
        onChange={(e) => setIllness(e.target.value)} 
        placeholder="Illness" 
      />
      <input 
        type="text" 
        value={medication} 
        onChange={(e) => setMedication(e.target.value)} 
        placeholder="Medication" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button onClick={handleRegisterPatient}>Register Patient</button>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>

    
  );
}

export default RegisterPatientForm;
