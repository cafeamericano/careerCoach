//DEFINE DB================================================================

//****************************************************

var mongo = require('mongodb');
var databaseName = 'career_coach'
//var databaseName = process.env.DATABASE_NAME
let entriesCollection = 'job_apps';
var MongoClient = require('mongodb').MongoClient;

var url = `mongodb://localhost:27017/${databaseName}`
//var url = process.env.MONGODB_URI;

//****************************************************

module.exports = {mongo, databaseName, entriesCollection, MongoClient, url}