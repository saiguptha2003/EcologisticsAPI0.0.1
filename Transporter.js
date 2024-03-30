const { MongoClient, ObjectId } = require('mongodb');

async function findTransporter(transporterID) {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('Ecologistics');
        const collection = db.collection('Transporter');

        // Find the transporter with the given transporterID
        const transporter = await collection.findOne({ transporterID: transporterID });
        if (transporter) {
            console.log('Transporter found:', transporter);
        } else {
            console.log('Transporter not found');
        }

    } catch (error) {
        console.error('Error:', error.message);

    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

findTransporter("eeb67bf5-3970-40ce-8d36-4821c5f3a706");

async function getAllTransporters() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('Ecologistics');
        const collection = db.collection('Transporter');

        // Find all documents in the collection
        const transporters = await collection.find().toArray();
        console.log('Transporters:', transporters);

    } catch (error) {
        console.error('Error:', error.message);

    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

getAllTransporters();
