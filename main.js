const express = require('express');
const bodyParser = require('body-parser');
const db = require('./QueryDb');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(session({
    secret: 'Ecologistics', // Change this to a secure random string
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post('/TransporterRegister', async (req, res) => {
    const { email, password, secureKey } = req.body;
    console.log(req.body);
    // Check if any required parameter is undefined
    if (!email || !password || !secureKey) {
        res.status(400).send('Missing required parameters');
        return;
    }

    try {
        const resultPrimary = await db.addTransporterPrimaryDetails(email, password, secureKey);
        res.send(resultPrimary);
        console.log(resultPrimary);
    } catch (error) {
        console.log(error);
        console.error('Error during registration:', resultPrimary.message);
        res.status(500).send('Error during registration');
    }
});

app.post('/TransporterRegister/TransporterPersonalData', async (req, res) => {
    const { TransporterID, Phonenumber, AdharCard, PanCard, Username, Address } = req.body;
    try {
        const resultPrimary = await db.addTransporterSecondaryDetails(TransporterID, Phonenumber, AdharCard, PanCard, Username, Address);
        res.send(resultPrimary);
    } catch (error) {
        console.error('Error during registration:', error);
        res.send(error);
    }
});

app.post('/TransporterLogin', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const resultPrimary = await db.checkTransporter(email, password);
        if (resultPrimary.success) {
            console.log(resultPrimary);
            req.session.transporterId = resultPrimary.transporterid;
            req.session.email = resultPrimary.email;
            res.send({ success: true, transporterId:resultPrimary['transporter']['TransporterID'], email: resultPrimary.email });
        } else {
            res.send(resultPrimary);
        }
    } catch (error) {
        console.log({ success: false, error: error });
    }
});

app.get('/TransporterLogout', (req, res) => {
    req.session.destroy();
    res.send({ success: true });
});

app.post('/Transporter/:uuid/findOrders', async (req, res) => {
    const { uuid } = req.params;
    const { from, to, weight, type } = req.body;
    try {
        const result = await db.findOrders(uuid, from, to, weight, type);
        res.send({ success: true, orders: result, uuid: uuid, from: from, to: to, weight: weight, type: type });
    } catch (error) {
        console.log({ success: false, error: error, uuid: uuid, from: from, to: to, weight: weight, type: type });
    }
});

app.get('/Transporter/:uuid/otp', async (req, res) => {
    const { uuid } = req.params;
    try {
        const result = await db.getOTP(uuid);
        res.send({ success: true, otp: result, uuid: uuid });
    } catch (error) {
        console.log({ success: false, error: error, uuid: uuid });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log(`http://localhost:${port}`);
});
