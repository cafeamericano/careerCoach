const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
var app = express()
var mongo = require('mongodb');

//DEFINE DB================================================================

let databaseName = 'career_coach';
let entriesCollection = 'job_apps';

var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://localhost:27017/${databaseName}`;

//MIDDLEWARE================================================================

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES================================================================
app.get('/entries', (req, res) => {
    showAllEntries(req, res)
});

app.post('/add', (req, res) => {
    console.log('add route hit')
    addNewEntry(req, res)
});

app.get('/delete', (req, res) => {
    deleteEntry(req, res)
});

//START SERVER================================================================

app.listen(4000, function () {
    console.log('Server listening on Port 4000...')
})

//FUNCTIONS BY ACTION////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Show All Entries
function showAllEntries(req, res){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            console.log(result)
            return res.json({
                data: result
            })
        });
    })
}

//Add New Entry
function addNewEntry(req, res){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        console.log(req)
        console.log(req.body)
        var myobj = (req.body);
        dbo.collection(entriesCollection).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(myobj)
            db.close();
        });
    });
}

//Delete an Entry
function deleteEntry(req, res){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var myquery = { _id: mongo.ObjectID(req.query.id)}
        console.log(myquery)
        dbo.collection(entriesCollection).deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
}