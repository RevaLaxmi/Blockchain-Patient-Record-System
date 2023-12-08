import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import EnrollAdmin from './EnrollAdmin';
import RegisterUser from './RegisterUser';
import RegisterPatient from './RegisterPatient';
import AccessPatientRecord from './AccessPatientRecord';
import About from './About';
import Home from './Home'; // Import the Home component
import Footer from './Footer'; // Import the Footer component
import '../App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Corrected the Route for Home */}
            <Route path="/enroll-admin" element={<EnrollAdmin />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/register-patient" element={<RegisterPatient />} />
            <Route path="/access-patient-record" element={<AccessPatientRecord />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
