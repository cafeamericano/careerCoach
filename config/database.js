//DEFINE DB================================================================

//****************************************************
var mongo = require('mongodb');
let databaseName = 'career_coach';
let entriesCollection = 'job_apps';
var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://localhost:27017/${databaseName}`;
//****************************************************

module.exports = {mongo, databaseName, entriesCollection, MongoClient, url}