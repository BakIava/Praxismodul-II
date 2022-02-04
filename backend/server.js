const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const { MongoClient } = require('mongodb');

const dbUri = 'mongodb://localhost:27017'
const dbName = 'Fuhrparkmanagementsystem'
var db;

// Express
const app = express();
const PORT = 3000;

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/requests', async (req, res) => {
    var request = req.body;

    let guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1).toUpperCase();
        }
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        return s4() + '-' + s4() + '-' + s4();
    }

    request.id = guid();

    const collectionName = 'requests';
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(request);
    console.log("new request generated " + request.id);

    res.statusCode = 200;
    res.write(JSON.stringify(request.id));
    res.end();
});

app.get('/request', async (req, res) => {
    var token = req.headers['authorization'];

    console.log(token);
    const collectionName = 'requests';
    const collection = db.collection(collectionName);
    var request = await collection.find({employee: token}).toArray();
    console.log(request);
    res.write(JSON.stringify(request[0]))
    res.statusCode = 200;
    res.end();
})

app.post('/offer', async (req, res) => {
    debugger;
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let offer = req.files.offer;

            const collectionName = 'requests';
            const collection = db.collection(collectionName);
            const requests = await collection.find({ id: req.body.id }).toArray();

            update = {
                _id: requests[0]._id,
                $set: { offer: 'offer' }
            }

            const result = await collection.updateOne({_id: requests[0]._id}, { $set: { offer: offer } });

            // offer.mv('./uploads/' + offer.name);



            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: offer.name,
                    mimetype: offer.mimetype,
                    size: offer.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
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