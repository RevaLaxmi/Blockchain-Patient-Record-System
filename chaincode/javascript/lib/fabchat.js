/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const {Contract} = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;
const crypto = require('crypto');


class FabChat extends Contract {

    async initLedger(ctx) {
        console.info('Initialized the ledger for the Patient Record System');
    }

    async registerPatient(ctx, patientName, phoneNumber, referringDoctor, illness, medication, password) {
        console.info('Registering a new patient');

        // Hash the password
        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

        // Store the patient record with password hash
        const patientRecord = {
            patientName,
            phoneNumber,
            referringDoctor,
            illness,
            medication,
            passwordHash      // Store the hashed password
        };

        await ctx.stub.putState(patientName, Buffer.from(JSON.stringify(patientRecord)));
        console.log(`Patient registered: ${patientName}`);
        return `Patient ${patientName} registered successfully`;
    }

    async accessPatientRecord(ctx, patientName, phoneNumber, password) {
        const patientRecordAsBytes = await ctx.stub.getState(patientName);
        if (!patientRecordAsBytes || patientRecordAsBytes.length === 0) {
            throw new Error(`Patient record for ${patientName} does not exist`);
        }
        const patientRecord = JSON.parse(patientRecordAsBytes.toString());

        // Hash the provided password
        const providedPasswordHash = crypto.createHash('sha256').update(password).digest('hex');

        // Verify phone number and password hash
        if (patientRecord.phoneNumber === phoneNumber && patientRecord.passwordHash === providedPasswordHash) {
            return patientRecord.patientData;
        } else {
            throw new Error('Unauthorized access: Incorrect phone number or password.');
        }
    }
}

module.exports = FabChat;