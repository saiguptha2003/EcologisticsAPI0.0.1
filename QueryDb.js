const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

const saltRounds = 10;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'Pandusai@2003',
    database: 'Ecologistics'
});

async function addTransporterPrimaryDetails(email, passwordHash, securityKey) {
    try {
        console.log(email,passwordHash,securityKey);
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM Transporter WHERE Email = ?', [email]);
        if (rows.length > 0) {
            connection.release();
            return { success: false, error: 2, message: 'User already exists' };
        }
        const transporterID = uuidv4();
        await connection.execute('INSERT INTO Transporter (TransporterID, Email, PasswordHash, SECURITY_KEY) VALUES (?, ?, ?, ?)',
            [transporterID, email, passwordHash, securityKey]);
        connection.release();
        return { success: true, uuid: transporterID, email: email };
    } catch (error) {
        console.error('Error adding transporter details:', error);
        return { success: false, error: 2, message: 'Error adding transporter details' };
    }
}

async function addTransporterSecondaryDetails(transporterID, phoneNumber, adharCard, panCard, username, address) {
    try {
        const connection = await pool.getConnection();
        const [panCardResults, fields1] = await connection.execute('SELECT COUNT(*) AS count FROM TransporterUserData WHERE PanCard = ?', [panCard]);
        if (panCardResults[0].count > 0) {
            connection.release();
            return { success: false, error: 1, message: 'Pan Card is Already Exists' };
        }
        const [adharCardResults, fields2] = await connection.execute('SELECT COUNT(*) AS count FROM TransporterUserData WHERE AdharCard = ?', [adharCard]);
        if (adharCardResults[0].count > 0) {
            connection.release();
            return { success: false, error: 2, message: 'Aadhar Card is already exists' };
        }
        const [usernameResults, fields3] = await connection.execute('SELECT COUNT(*) AS count FROM TransporterUserData WHERE Username = ?', [username]);
        if (usernameResults[0].count > 0) {
            connection.release();
            return { success: false, error: 3, message: 'Username is already exists' };
        }
        await connection.execute('INSERT INTO TransporterUserData (TransporterId, Phonenumber, AdharCard, PanCard, Username, Address) VALUES (?, ?, ?, ?, ?, ?)',
            [transporterID, phoneNumber, adharCard, panCard, username, address]);
        connection.release();
        return { success: true, uuid: transporterID };
    } catch (error) {
        return { success: false, error: 2, message: 'Error adding transporter secondary details' };
    }
}
async function checkTransporter(email, password) {
    try {
        const connection = await pool.getConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM Transporter WHERE Email = ?', [email]);
        connection.release();
        
        if (rows.length === 0) {
            return { success: false, message: 'Invalid email or password' };
        }

        const transporter = rows[0];
        if (transporter.PasswordHash === password) {
            return { success: true, transporter: transporter };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    } catch (error) {
        return { success: false, message: 'Internal server error' };
    }
}

async function checkDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        await connection.query('SELECT 1');
        connection.release();
        return { success: true, message: 'Database is connected' };
    } catch (error) {
        return { success: false, message: 'Database connection failed' };
    }
}

module.exports = {
    addTransporterPrimaryDetails,
    addTransporterSecondaryDetails,
    checkTransporter,
    checkDatabaseConnection
};

