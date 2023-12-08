import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/enroll-admin" className="nav-link">Enroll Admin</Link>
      <Link to="/register-user" className="nav-link">Register User</Link>
      <Link to="/register-patient" className="nav-link">Register Patient</Link>
      <Link to="/access-patient-record" className="nav-link">Access Patient Record</Link>
      <Link to="/about" className="nav-link">About Project</Link>
    </nav>
  );
};

export default Navbar;
