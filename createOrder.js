const { MongoClient } = require('mongodb');

async function addOrderToMongoDB(orderData) {
  
  const uri = 'mongodb://localhost:27017';

  const dbName = 'Ecologistics'; 

  const collectionName = 'Orders'; 
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();

    const db = client.db(dbName);

    const ordersCollection = db.collection(collectionName);

    const result = await ordersCollection.insertOne(orderData);
    console.log(`Order added with ID: ${result.insertedId}`);
    
  } catch (error) {
    console.error('Error occurred while adding order to MongoDB:', error);
  } finally {
    await client.close();
  }
}
const orderData = {
        "TraderID": "54321",
        "orders": {
          "orderID2": {
            "from": "City C",
            "to": "City D",
            "weight": 200,
            "type": "Heavy",
            "status": "In Transit",
            "price": 300,
            "DeliveryDate": "2024-05-01",
            "deliveryTime": "09:00 AM",
            "deliveryLocation": "Warehouse ZYX",
            "paymentStatus": "Pending",
            "paymentAmount": 300,
            "paymentDescription": "Payment for orderID2",
            "productDetails": {
              "productID": "123456",
              "productName": "Product XYZ",
              "productDescription": "Description of Product XYZ",
              "quantity": 5,
              "unitPrice": 60,
              "totalPrice": 300,
              "productImage": "product.jpg"
            }
          }
        }
      
};


addOrderToMongoDB(orderData);


async function retrieveOrdersFromMongoDB() {
  const uri = 'mongodb://localhost:27017';
  const dbName = 'Ecologistics';
  const collectionName = 'Orders';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const ordersCollection = db.collection(collectionName);
    const cursor = ordersCollection.find({});
    const orders = await cursor.toArray();
    console.log('Retrieved Orders:', orders);
    return orders.orders;
  } catch (error) {
    console.error('Error occurred while retrieving orders from MongoDB:', error);
    return [];
  } finally {
    await client.close();
  }
}

retrieveOrdersFromMongoDB();
