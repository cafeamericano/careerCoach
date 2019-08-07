const express = require('express');
var bodyParser = require('body-parser')
var handlebars = require('express-handlebars')
var path = require('path')
var app = express()
var mongo = require('mongodb');

//DEFINE DB================================================================

let databaseName = 'career_coach';
let entriesCollection = 'job_apps';

var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://localhost:27017/${databaseName}`;

//EXPRESS PUBLIC FOLDER================================================================

app.use(express.static(__dirname + '/public'));

//BODY PARSER MIDDLEWARE================================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//HANDLEBARS================================================================

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'standard' }))
app.set('view engine', 'handlebars');

// API (APPLICATION PROGRAMMING INTERFACE) FOR JSON RESPONSES //////////////////////////////////////

app.get('/api/entries', (req, res) => {
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

app.get('/api/entries/:sort/:order', (req, res) => {

    let sortField = req.params.sort
    let sortOrder;

    if (req.params.order === 'ascending') {
        sortOrder = 1
    } else if (req.params.order === 'descending') {
        sortOrder = -1
    }

    console.log(sortField)
    console.log(sortOrder)

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(entriesCollection).find({}).sort({ [sortField]: sortOrder }).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            return res.json({
                data: result
            })
        });
    })
});

app.get('/api/entries/:id', (req, res) => {
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

// HANDELBARS TEMPLATE SERVING /////////////////////////////////////////////////////////////////////////


app.get('/', (req, res) => {
    res.redirect('/viewall')
});

app.get('/viewall', (req, res) => {
    res.render('viewAll')
});

app.get('/add_prompt', (req, res) => {
    res.render('addPrompt')
});

app.post('/edit_prompt', (req, res) => {
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

app.get('/timelines', (req, res) => {
    res.render('timelines')
});

app.get('/statistics', (req, res) => {
    res.render('statistics')
});

// CREATING, UPDATING, AND DELETING /////////////////////////////////////////////////////////////////////////

app.post('/add/process', (req, res) => {
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

app.post('/edit/process', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        let incomingObject = req.body
        var myquery = { _id: mongo.ObjectID(incomingObject.id) };
        console.log(myquery)
        delete incomingObject._id
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

app.post('/delete/process', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var myquery = { _id: mongo.ObjectID(req.body.id) }
        console.log(myquery)
        dbo.collection(entriesCollection).deleteOne(myquery, function (err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
        });
    });
});

//START SERVER================================================================

app.listen(4000, function () {
    console.log('Server listening on Port 4000...')
})