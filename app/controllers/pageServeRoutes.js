// HANDELBARS TEMPLATE SERVING /////////////////////////////////////////////////////////////////////////

const express = require('express')
const router = express.Router();
var uuid = require('uuid');
const uuidv4 = require('uuid/v4');

//****************************************************
const dbImport = require('../config/database.js')
let mongo = dbImport.mongo
let databaseName = dbImport.databaseName
let entriesCollection = dbImport.entriesCollection
let MongoClient = dbImport.MongoClient
let url = dbImport.url
//****************************************************

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/../public' })
});

router.get('/viewall', (req, res) => {
    res.render('viewAll')
});

router.get('/add_prompt', (req, res) => {
    res.render('addPrompt')
});

module.exports = router;

router.post('/insertmany', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var myobj = req.body; //Where req.body is an array of objects
        dbo.collection(entriesCollection).insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            db.close();
            res.send('Documents added')
        });
    });
});