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
    res.sendFile('index.html')
});

router.get('/createaccount_prompt', (req, res) => {
    res.sendFile('createaccount.html', { root: __dirname + '/../public' })
});

router.post('/createaccount_process', (req, response) => {
    console.log('#########################################')
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var query = { username: req.body.username };
        console.log(query)
        console.log(req.body)
        //Make sure no other users have this username
        dbo.collection('users').find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result)
            if (req.body.username.length < 6) {
                response.send('Invalid username')
            }
            else if (result.length !== 0) {
                //Notify requestor that this username is taken
                response.send('Username taken')
            } 
            else if (req.body.password === undefined || req.body.password.length < 6) {
                response.send('Invalid password')
            }
            else if (req.body.firstName === undefined || req.body.firstName.length < 1) {
                response.send('Invalid first name')
            }
            else if (req.body.lastName === undefined || req.body.lastName.length < 1) {
                response.send('Invalid last name')
            }
            else if (req.body.email === undefined || req.body.email.length < 8) {
                response.send('Invalid email')
            }
            else {
                //If username unique, proceed with account creation
                var dbo = db.db(databaseName);
                var myobj = req.body
                myobj.uuid = uuidv4()
                myobj.password = process.env.ENCRYPT.call(req.body.password)
                console.log(myobj.password)
                console.log(myobj)
                dbo.collection('users').insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    console.log(myobj)
                    db.close();
                    response.send('Success')
                });
            }
        });
    });
});

router.post('/processlogin', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var query = { username: req.body.username, password: req.body.password };
        console.log(query)
        dbo.collection('users').find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result)
            res.json(result)
        });
    });
});

router.post('/grabprofilephoto', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        var query = { uuid: req.body.token };
        console.log(query)
        dbo.collection('users').find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result)
            res.json(result[0])
        });
    });
});

module.exports = router;