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

module.exports = router;

