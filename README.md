# Hyperledger Fabric Patient Record System

## Project Overview
Designed and implemented a blockchain-based patient record system utilizing Hyperledger Fabric. This system ensures secure, decentralized storage and management of patient data, enhancing privacy across healthcare providers.

## Project Proposal: File Encryption
**Author:** Reva Laxmi Chauhan

## Table of Contents
1. [Introduction](#introduction)
2. [Understanding the Project](#understanding-the-project)
3. [Why Use Blockchain and Hyperledger?](#why-use-blockchain-and-hyperledger)
4. [System Features](#system-features)
   - [Patient Login](#patient-login)
   - [Explanation](#explanation)
   - [Milestone 3 Code Implementation](#milestone-3-code-implementation)
5. [Project Links](#project-links)

## Introduction
The Patient Health Records System is an innovative and secure decentralized platform aimed at storing and managing patient health records in a tamper-proof and accessible manner for patients. Traditional methods relying on centralized systems like Excel sheets will be replaced by a system using blockchain technology, ensuring data integrity and accessibility.

## Understanding the Project
This project is a blockchain-based web application integrating a Node.js/Express backend with a frontend interface, focused on securely managing patient records using Hyperledger Fabric. It features smart contracts for secure transactions, user-friendly APIs for registration and data access, and security measures including password hashing and authentication. The frontend, likely built with web technologies like HTML, CSS, and JavaScript, provides an intuitive user interface for interacting with the blockchain backend. This setup ensures a secure, decentralized, and efficient management of sensitive healthcare data.

## Why Use Blockchain and Hyperledger?
We want an immutable system, especially in this case where we are relying on access controls. We also want transparency throughout this system. Hyperledger is like a secure system for storing patient health records. Only authorized people can access or change the information, making sure it stays private and tamper-proof. The code uses Hyperledger’s security to protect sensitive patient data and control who can see or modify it.

## System Features

### Patient Login
Patients can securely log in and input their details: Name, Age, Contact Information, Gender, Doctor’s Name, and Specific Illness. These details will be stored on the ledger.

### Explanation
#### Implemented Code:
1. **initLedger Function:** Initializes the ledger and logs an informational message.
2. **registerPatient Function:** Adds a new patient to the system, creating a unique ID and a secret key for encryption.
3. **generateUniqueOddId and generateUniqueEvenId Functions:** Generates unique IDs for patients and doctors.
4. **registerDoctor Function:** Adds a new doctor to the system with a unique ID.
5. **idExists Function:** Checks if an ID already exists in the system.
6. **getPatientDataBasedOnRequester Function:** Allows access to patient data for the patient or their doctor, ensuring data security.
7. **decryptPatientData Function:** Unlocks patient data using a secret key.

The system securely manages patient and doctor data, ensuring only authorized individuals can access sensitive information. The use of unique IDs and secret keys ensures all information is kept safe and private.

### Milestone 3 Code Implementation: New Code Explained
1. **Module and Class Dependencies:**
   - `fabric-contract-api`: APIs for developing smart contracts.
   - `fabric-shim`: Interacts with the blockchain ledger.
   - `ClientIdentity`: Identifies participants interacting with the contract.
   - `crypto`: Used for hashing passwords.

2. **Contract Class Definition:**
   - `FabChat` extends `Contract`, making it a smart contract deployable on a Hyperledger Fabric network.

3. **initLedger Function:**
   - Logs an informational message during ledger initialization.


(Please let me know if files need to be uploaded differently. I have uploaded files manually.)

---

Feel free to reach out if you have any questions or need further clarification on the project.
