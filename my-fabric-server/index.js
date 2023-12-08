const express = require('express');
const cors = require('cors');
const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');
// Load connection profile
const ccpPath = path.resolve(__dirname, '..', '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint for enrolling admin
app.post('/enrollAdmin', async (req, res) => {
    try {
      const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
      const ca = new FabricCAServices(caURL);
  
      const walletPath = '/home/revalaxmi/new2/fabric-samples/fabchat/javascript/wallet'; // Use the absolute path
      const wallet = await Wallets.newFileSystemWallet(walletPath);
  
      const adminExists = await wallet.get('admin');
      if (adminExists) {
        return res.status(400).json({ error: 'Admin already enrolled' });
      }
  
      const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
      const x509Identity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
      };
      await wallet.put('admin', x509Identity);
  
      res.status(201).json({ success: 'Admin enrolled successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Endpoint for register User
app.post('/registerUser', async (req, res) => {
    const { userName } = req.body;
  
    try {
      const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
      const ca = new FabricCAServices(caURL);
  
      const walletPath = '/home/revalaxmi/new2/fabric-samples/fabchat/javascript/wallet'; // Use the absolute path

      const wallet = await Wallets.newFileSystemWallet(walletPath);
  
      // Check if the user already exists
      const userExists = await wallet.get(userName);
      if (userExists) {
        return res.status(400).json({ error: `User ${userName} already exists` });
      }
  
      // Check if admin identity exists
      const adminIdentity = await wallet.get('admin');
      if (!adminIdentity) {
        throw new Error('An identity for the admin user does not exist in the wallet');
      }
  
      // Build a user object for authenticating with the CA
      const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
      const adminUser = await provider.getUserContext(adminIdentity, 'admin');
  
      // Register the user and enroll the user, and import the new identity into the wallet.
      const secret = await ca.register({
        enrollmentID: userName,
        role: 'client'
      }, adminUser);
  
      const enrollment = await ca.enroll({
        enrollmentID: userName,
        enrollmentSecret: secret,
      });
  
      const userIdentity = {
        credentials: {
          certificate: enrollment.certificate,
          privateKey: enrollment.key.toBytes(),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
      };
  
      await wallet.put(userName, userIdentity);
  
      res.status(201).json({ success: `User ${userName} registered successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Endpoint for registering a patient
app.post('/registerPatient', async (req, res) => {
    const { patientName, phoneNumber, referringDoctor, illness, medication, password } = req.body;
  
    try {
      // Setup connection to Fabric network
      const walletPath = '/home/revalaxmi/new2/fabric-samples/fabchat/javascript/wallet'; // Use the absolute path
      const wallet = await Wallets.newFileSystemWallet(walletPath);
  
      // Check for existing user identity in the wallet
      const userExists = await wallet.get('admin'); // Replace with appropriate user
      if (!userExists) {
        throw new Error('An identity for the user does not exist in the wallet');
      }
  
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: 'admin', // Replace with appropriate user
        discovery: { "enabled": true, "asLocalhost": true }
      });
  
      // Connect to our local fabric
      const network = await gateway.getNetwork('mychannel'); // Replace with your channel name
      const contract = network.getContract('fabchat'); // Replace with your chaincode name
  
      // Submit the transaction to the smart contract
      //added all the missing paramaters
      await contract.submitTransaction('registerPatient', patientName, phoneNumber, referringDoctor, illness, medication, password);
  
      // Disconnect from the gateway
      await gateway.disconnect();
  
      res.status(201).json({ success: `Patient ${patientName} registered successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Endpoint for accessing patient record
app.post('/accessPatientRecord', async (req, res) => {
    const { patientName, phoneNumber, password } = req.body;
  
    try {
      // Setup connection to Fabric network
      const walletPath = '/home/revalaxmi/new2/fabric-samples/fabchat/javascript/wallet'; // Use the absolute path

      const wallet = await Wallets.newFileSystemWallet(walletPath);
  
      // Check for existing user identity in the wallet
      const userExists = await wallet.get('admin'); // Replace with appropriate user
      if (!userExists) {
        throw new Error('An identity for the user does not exist in the wallet');
      }
  
      const gateway = new Gateway();
      await gateway.connect(ccp, {
        wallet,
        identity: 'admin', // Replace with appropriate user
        discovery: { "enabled": true, "asLocalhost": true }
      });
  
      // Connect to the channel and smart contract
      const network = await gateway.getNetwork('mychannel'); // Replace with your channel name
      const contract = network.getContract('fabchat'); // Replace with your chaincode name
  
      // Evaluate the specified transaction (query the ledger)
      const result = await contract.evaluateTransaction('accessPatientRecord', patientName, phoneNumber, password);
      
      // Disconnect from the gateway
      await gateway.disconnect();
  
      res.status(200).json({ patientData: result.toString() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
