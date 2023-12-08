import React from 'react';
import '../App.css'; // Ensure this is the correct path to your CSS

const About = () => {
  return (
    <div className="about-page">
      <div className="scrollable-content">
        <div className="text-section">
          <h2>About This Project</h2>
          <p>This project is a Hyperledger Fabric client application that allows users to interact with a blockchain network for managing patient records securely.</p>
        </div>

        <div className="text-section">
          <h3>Project Overview</h3>
          <strong>Title:</strong>
          <p>Patient Record System on Hyperledger Fabric</p>
          <strong>Purpose:</strong>
          <p>The primary objective of this project is to create a secure, immutable, and efficient system for handling patient records using blockchain technology. Hyperledger Fabric is chosen for its enterprise-grade capabilities, such as privacy, scalability, and modularity.</p>
        </div>

        <div className="text-section">
          <h3>Core Functionalities</h3>
          <ul>
            <li>
              <strong>initLedger(ctx)</strong>
              <p><em>Purpose:</em> Initializes the ledger for the patient record system.</p>
              <p><em>Process:</em> This function is called when the contract is deployed, setting up the necessary state on the blockchain for further transactions.</p>
            </li>
            <li>
              <strong>registerPatient(ctx, patientName, phoneNumber, referringDoctor, illness, medication, password)</strong>
              <p><em>Purpose:</em> Registers a new patient in the system.</p>
              <p><em>Process:</em> Hashes the patient's password using SHA-256 for security and stores the record on the blockchain using the patient's name as the key.</p>
            </li>
            <li>
              <strong>accessPatientRecord(ctx, patientName, phoneNumber, password)</strong>
              <p><em>Purpose:</em> Provides access to a patient's record.</p>
              <p><em>Process:</em> Retrieves and validates the patient record from the blockchain.</p>
            </li>
          </ul>
        </div>

        <div className="text-section">
          <h3>Why Hyperledger Fabric?</h3>
          <p>Hyperledger Fabric offers privacy, scalability, modularity, and operates in a permissioned network, making it ideal for managing sensitive health data.</p>
        </div>

        <div className="text-section">
          <h3>Conclusion</h3>
          <p>The use of Hyperledger Fabric in this project offers a robust and secure platform for managing patient records. It ensures data integrity, security, and accessibility, addressing privacy concerns and potentially transforming healthcare data management.</p>
        </div>
      </div>
    </div>
  );
};

export default About;

