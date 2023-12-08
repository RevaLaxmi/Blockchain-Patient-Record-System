'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const crypto = require('crypto');


async function main() {
    let choice = process.argv[2];
    let patientName = process.argv[3];
    let phoneNumber, referringDoctor, illness, medication, password;

    try {

        // Load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Wallet and gateway setup
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Checking if identity exists in the wallet
        const identityExists = await wallet.get(patientName);
        if (!identityExists) {
            console.error(`An identity for the name "${patientName}" does not exist in the wallet`);
            return;
        }

        
        // Create a new gateway for connecting to the peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: patientName, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) and contract
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('fabchat');

        // Invoke chaincode functions based on the provided choice
        switch (choice) {
            case 'registerPatient':
                phoneNumber = process.argv[4];
                referringDoctor = process.argv[5];
                illness = process.argv[6];
                medication = process.argv[7];
                password = process.argv[8];
                const response = await contract.submitTransaction('registerPatient', patientName, phoneNumber, referringDoctor, illness, medication, password);
                console.log(`Response: ${response.toString()}`);
                break;

            case 'accessPatientRecord':
                phoneNumber = process.argv[4];
                password = process.argv[5];
                const patientRecord = await contract.evaluateTransaction('accessPatientRecord', patientName, phoneNumber, password);
                if (patientRecord && patientRecord.length > 0) {
                    console.log(`Patient Record: ${patientRecord.toString()}`);
                } else {
                    console.log("Incorrect phone number, password, or no data found");
                }
                break;
        }

        // Disconnect from the gateway
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();