const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const dbUri = 'mongodb://localhost:27017'
const dbName = 'Fuhrparkmanagementsystem'
var db;

// Express
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/requests', async (req, res) => {    
    const request = req.body;

    const collectionName = 'requests';
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(request);
    console.log(request._id);

    res.statusCode = 200;
    res.end();
});


app.get('/requests', async (req, res) => {   
    const collectionName = 'requests';
    const collection = db.collection(collectionName);
    const requests = await collection.find({}).toArray();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'Application/json')
    res.write(JSON.stringify(requests))    
    res.end();
});

async function main() {
    // MongoDB
    const client = new MongoClient(dbUri);
    try {
        await client.connect();     
        db = client.db(dbName)   
    } catch (error) {
        console.log(error);
        return;
    }

    app.listen(PORT, function (error) {
        if (error) {
            console.log(error);
        }
        console.log("Server is listening on PORT", PORT);
    });
}

main();