// API (APPLICATION PROGRAMMING INTERFACE) FOR JSON RESPONSES //////////////////////////////////////

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

//Find all entries
router.get('/api/entries', (req, res) => {
    console.log(req.body)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({}).sort({ applicationSubmissionDate: -1 }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find all entries that meet a specific filter or sort criteria
router.post('/api/entries', (req, res) => {
    console.log(req.body)
    let filterControl = []
    if (req.body.filterBy !== null && req.body.filterBy !== undefined && req.body.filterBy !== '') {
        filterControl = { closure: req.body.filterBy }
    } else {
        filterControl = {}
    }
    console.log(filterControl)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find(filterControl).sort({ [req.body.sortBy]: parseInt(req.body.orderBy) }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find all applications where an interview is upcoming
router.get('/api/entries/outstanding', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({ closure: 'Outstanding' }).sort({ applicationSubmissionDate: -1 }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find all applications where an interview is upcoming
router.get('/api/entries/interviews', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({ progress: 'Interview Offered', closure: 'Outstanding' }).sort({ applicationSubmissionDate: -1 }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find all concluded applications
router.get('/api/entries/concluded', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({ closure: { $ne: 'Outstanding' } }).sort({ applicationSubmissionDate: -1 }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find all applications that are marked as never responded
router.get('/api/entries/neverresponded', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({ closure: 'Never Responded' }).sort({ applicationSubmissionDate: -1 }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find an application by its Mongo ID (specifically for editing a record)
router.get('/api/entries/:id', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var query = { _id: mongo.ObjectID(req.params.id) };
        console.log(query)
        dbo.collection(entriesCollection).find(query).toArray(function (err, result) {
            if (err) throw err;
            return res.json({
                data: result[0]
            })
        });
    });
});

module.exports = router;
