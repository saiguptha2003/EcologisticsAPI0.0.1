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
const request = require('request');
app.post('/TransporterRegister/:uuid/SendOTP', async (req, res) => {
    const { uuid, Phonenumber } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Replace 'YOUR_TWILIO_ACCOUNT_SID', 'YOUR_TWILIO_AUTH_TOKEN', and 'YOUR_TWILIO_PHONE_NUMBER' with your actual Twilio credentials
    const twilioOptions = {
        method: 'POST',
        url: 'https://api.twilio.com/2010-04-01/Accounts/YOUR_TWILIO_ACCOUNT_SID/Messages.json',
        auth: {
            user: 'AC1990b3ab5f9528c29e83794ef0a93801',
            pass: 'b9eb0a5b15b49dadfc32a9d990e8befd'
        },
        form: {
            To: Phonenumber,
            From: '8688670712',
            Body: `Use ${otp} as your OTP to Verify your phone number. OTP is Confidential and valid for 5 mins This SMS sent by Ecologistics accuated by ATG Solutions`
        }
    };

    request(twilioOptions, function (error, response, body) {
        if (error) {
            console.error('Error sending OTP:', error);
            res.status(500).send('Error sending OTP');
            return;
        }

        console.log('OTP sent successfully:', body);

        // Send response back to the client
        res.status(200).send('OTP sent successfully');
    });
});

app.post('/TransporterRegister/:uuid/VerifyOTP', async (req, res) => {
    const {uuid, Phonenumber} = req.body;

});
app.post('/TransporterRegister/:TransporterID/TransporterPersonalData', async (req, res) => {
    const { TransporterID, phoneNumber, adharCard, panCard, username, address } = req.body;
    console.log(req.body);username:
    try {
        const resultPrimary = await db.addTransporterSecondaryDetails(TransporterID, phoneNumber, adharCard, panCard, username, address );
        res.send(resultPrimary);
    } catch (error) {
        console.error('Error during registration:', error);
        res.send({ success: false, message: error });
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
