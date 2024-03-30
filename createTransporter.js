const { MongoClient } = require('mongodb');

async function uploadTransporters() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('Ecologistics');
        const collection = db.collection('Transporter');

        // Your JSON document with 10 transporters
        const transportersData = {
                "transporterID":"eeb67bf5-3970-40ce-8d36-4821c5f3a706",
                "email": "transporter1@example.com",
                "phoneNumber": "+1234567890",
                "username": "transporter1",
                "address": "Transporter 1 Address",
                "orders": {
                    "orderID1": {
                        "from": "City A",
                        "to": "City B",
                        "weight": 100,
                        "type": "Heavy",
                        "status": "In Transit",
                        "price": 200,
                        "transporterID": "12345",
                        "TraderID": "54321",
                        "DeliveryDate": "2024-04-01",
                        "deliveryTime": "10:00 AM",
                        "deliveryLocation": "Warehouse XYZ",
                        "deliveryCost": 50,
                        "transporterRating": 4.5,
                        "customerRating": 4.2,
                        "transporterReview": "Good service",
                        "customerReview": "Satisfied with the delivery",
                        "timeTaken": "2 hours",
                        "license": "License123",
                        "vehicle": "Truck",
                        "vehicleNumber": "ABC123",
                        "vehicleType": "Heavy",
                        "vehicleCapacity": "1000 kg",
                        "vehicleImage": "vehicle.jpg",
                        "transporterImage": "transporter.jpg",
                        "packageImage": "package.jpg",
                        "paymentStatus": "Paid",
                        "paymentMode": "UPI",
                        "paymentID": "98765",
                        "paymentDate": "2024-04-01",
                        "paymentTime": "10:00 AM",
                        "paymentAmount": 200,
                        "paymentDescription": "Payment for order"
                    }
                },
                "settings": {
                    "notification": true,
                    "location": true,
                    "payment": true
                },
                "wallet": {
                    "balance": 500,
                    "credit": 300,
                    "debit": 200,
                    "upiDetails": {
                        "upiID": "upi@example.com",
                        "upiName": "Transporter UPI",
                        "upiBank": "Bank XYZ",
                        "upiIFSC": "IFSC123",
                        "upiImage": "upi.jpg",
                        "upiAddress": "UPI Address",
                        "upiCity": "City",
                        "upiState": "State",
                        "upiCountry": "Country",
                        "upiPincode": "12345"
                    },
                    "bankDetails": {
                        "bankName": "Bank XYZ",
                        "bankBranch": "Branch ABC",
                        "bankIFSC": "IFSC123",
                        "bankAccountNumber": "Account123",
                        "bankAccountName": "Transporter Account",
                        "bankAddress": "Bank Address",
                        "bankCity": "City",
                        "bankState": "State",
                        "bankCountry": "Country",
                        "bankPincode": "12345"
                    },
                    "walletImage": "wallet.jpg",
                    "transactions": {
                        "transactionID": {
                            "date": "2024-04-01",
                            "time": "10:00 AM",
                            "amount": 200,
                            "type": "Credit",
                            "status": "Completed",
                            "description": "Payment received",
                            "orderID": "98765"
                        }
                    }
                },
                "ProfileDetails": {
                    "PhotoUrl": "photo.jpg",
                    "name": "Transporter Name",
                    "dob": "1990-01-01",
                    "panCard": "PAN123",
                    "adharCard": "ADHAR123",
                    "license": "License123",
                    "vehicle": "Truck",
                    "vehicleNumber": "ABC123",
                    "vehicleType": "Heavy",
                    "vehicleCapacity": "1000 kg",
                    "vehicleImage": "vehicle.jpg",
                    "transporterImage": "transporter.jpg"
                }
        };

        // Insert the data into the collection
        await collection.insertOne(transportersData);
        console.log('Transporters data uploaded to MongoDB');

    } catch (error) {
        console.error('Error:', error.message);

    } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('MongoDB connection closed');
    }
}

uploadTransporters();
