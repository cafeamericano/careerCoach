//DEFINE DB================================================================

//****************************************************
var mongo = require('mongodb');
let databaseName = process.env.DATABASE_NAME
let entriesCollection = 'job_apps';
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI //`mongodb://localhost:27017/${databaseName}`;
//****************************************************

module.exports = {mongo, databaseName, entriesCollection, MongoClient, url}