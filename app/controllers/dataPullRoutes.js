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

//Find all entries for the user
router.post('/api/entries/all', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({ uuid: req.body.token }).sort({ [req.body.sortColumn]: parseInt(req.body.sortOrder) }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find all applications where an interview is upcoming
router.post('/api/entries/outstanding', (req, res) => {
    console.log('outstanding routes hit')
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({ closure: 'Outstanding', uuid: req.body.token }).sort({ [req.body.sortColumn]: parseInt(req.body.sortOrder) }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find all applications where an interview is upcoming
router.post('/api/entries/interviews', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({ progress: 'Interview Offered', closure: 'Outstanding', uuid: req.body.token }).sort({ [req.body.sortColumn]: parseInt(req.body.sortOrder) }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find all concluded applications
router.post('/api/entries/concluded', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({ closure: { $ne: 'Outstanding' }, uuid: req.body.token }).sort({ [req.body.sortColumn]: parseInt(req.body.sortOrder) }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find all applications that are marked as never responded
router.post('/api/entries/neverresponded', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({ closure: 'Never Responded', uuid: req.body.token }).sort({ [req.body.sortColumn]: parseInt(req.body.sortOrder) }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

//Find an entry for the purpose of updating
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

//========================================================================================

function authorize(token) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var query = { uuid: token };
        console.log(query)
        console.log('AUTHORIZING********')
        dbo.collection('users').find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result)
            if (result.length === 0) {
                console.log('Returning false.')
                return false;
            } else {
                console.log('Returning true.')
                return true;
            }
        });
    });
}