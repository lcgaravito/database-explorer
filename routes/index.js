const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://<user>:<password>@cluster0-twpse.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

// const Banio = require('../models/banios');

router.get('/', async(req, res) => {
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

module.exports = router;