// CREATING, UPDATING, AND DELETING /////////////////////////////////////////////////////////////////////////

const express = require('express')
const router = express.Router();

//****************************************************
var mongo = require('mongodb');
let databaseName = 'career_coach';
let entriesCollection = 'job_apps';
var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://localhost:27017/${databaseName}`;
//****************************************************

router.post('/add/process', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        console.log(req.body)
        var myobj = (req.body);
        dbo.collection(entriesCollection).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(myobj)
            db.close();
        });
        res.redirect('/viewall')
    });
});

router.post('/edit/process', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        let incomingObject = req.body
        var myquery = { _id: mongo.ObjectID(incomingObject.id) };
        console.log(myquery)
        delete incomingObject._id
        delete incomingObject.id
        var newvalues = { $set: req.body };
        console.log(newvalues)
        dbo.collection(entriesCollection).updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
    res.redirect('/viewall')
});

router.post('/delete/process', (req, res) => {
    console.log('DELETE REQUESTED ************')
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var myquery = { _id: mongo.ObjectID(req.body.id) }
        console.log('DELETE QUERY: ' + myquery)
        dbo.collection(entriesCollection).deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
    res.redirect('/viewall')
});

module.exports = router;
