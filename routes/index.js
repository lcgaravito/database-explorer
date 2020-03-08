const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = "mongodb+srv://<user>:<password>@cluster0-twpse.mongodb.net/test?retryWrites=true&w=majority";

// const Banio = require('../models/banios');

router.get('/', async(req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // Connect
    client
        .connect()
        .then(client =>
            client
            .db()
            .admin()
            .listDatabases()
        )
        .then(dbs => {
            res.render('index', {
                databases: dbs.databases
            });
        })
        .finally(() => client.close());
});

router.post('/collections', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const dbName = req.body.dbName;

    client
        .connect()
        .then(
            client =>
            client
            .db(dbName)
            .listCollections()
            .toArray() // Returns a promise that will resolve to the list of the collections
        )
        .then(cols => {
            res.send(cols);
        })
        .finally(() => client.close());
});

router.post('/records', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const dbName = req.body.dbName;
    const dbCollection = req.body.dbCollection;

    client
        .connect()
        .then(
            client =>
            client
            .db(dbName)
            .collection(dbCollection)
            .find({})
            .sort({ _id: -1 })
            .limit(20)
            .toArray() // Returns a promise that will resolve to the list of the collections
        )
        .then(docs => {
            res.send(docs);
        })
        .finally(() => client.close());
});

router.delete('/records', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const dbName = req.body.dbName;
    const dbCollection = req.body.dbCollection;
    const _id = req.body._id;

    client
        .connect()
        .then(
            client =>
            client
            .db(dbName)
            .collection(dbCollection)
            .deleteOne({ _id: new ObjectID(_id) }, (err, r) => {
                if (err) {
                    res.send(err);
                    console.log(err);
                } else
                    res.send(r);
                client.close();
            })
        );
});

module.exports = router;