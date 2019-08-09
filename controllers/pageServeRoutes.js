// HANDELBARS TEMPLATE SERVING /////////////////////////////////////////////////////////////////////////

const express = require('express')
const router = express.Router();

//****************************************************
const dbImport = require('../config/database.js')
let mongo = dbImport.mongo
let databaseName = dbImport.databaseName
let entriesCollection = dbImport.entriesCollection
let MongoClient = dbImport.MongoClient
let url = dbImport.url
//****************************************************

router.get('/', (req, res) => {
    res.redirect('/viewall')
});

router.get('/viewall', (req, res) => {
    res.render('viewAll')
});

router.get('/add_prompt', (req, res) => {
    res.render('addPrompt')
});

router.post('/edit_prompt', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var query = { _id: mongo.ObjectID(req.body.id) };
        console.log(query)
        dbo.collection(entriesCollection).find(query).toArray(function (err, result) {
            if (err) throw err;
            res.render('editPrompt', {
                data: result
            })
        });
    });
});

module.exports = router;
