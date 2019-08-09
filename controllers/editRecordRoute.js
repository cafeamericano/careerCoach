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

//Find an application by its Mongo ID (specifically for editing a record)
// router.get('/api/entries/:id', (req, res) => {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db(databaseName);
//         var query = { _id: mongo.ObjectID(req.params.id) };
//         console.log(query)
//         dbo.collection(entriesCollection).find(query).toArray(function (err, result) {
//             if (err) throw err;
//             return res.json({
//                 data: result[0]
//             })
//         });
//     });
// });

module.exports = router;
