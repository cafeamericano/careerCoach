// HANDELBARS TEMPLATE SERVING /////////////////////////////////////////////////////////////////////////

const express = require("express");
const router = express.Router();
var uuid = require("uuid");
const uuidv4 = require("uuid/v4");

//****************************************************
const dbImport = require("../config/database.js");
let mongo = dbImport.mongo;
let databaseName = dbImport.databaseName;
let entriesCollection = dbImport.entriesCollection;
let MongoClient = dbImport.MongoClient;
let url = dbImport.url;
//****************************************************

router.get("/touslesrecords", (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo
      .collection(entriesCollection)
      .find({})
      .sort({ applicationSubmissionDate: -1 })
      .toArray(function(err, result) {
        if (err) throw err;
        db.close();
        var modifiedResponseArray = [];
        for (i = 0; i < result.length; i++) {
          let modObj = {};
          modObj.companyName = result[i].companyName;
          modObj.jobTitle = result[i].jobTitle;
          modObj.applicationDate = result[i].applicationSubmissionDate;
          modObj.firstResponseDate = result[i].dateOfFirstResponse;
          modObj.isMajorCorporation = result[i].majorCorporation;
          modObj.progress = result[i].progress;
          modObj.closure = result[i].closure;
          modObj.comments = result[i].comments;
          modifiedResponseArray.push(modObj);
        }
        return res.json({
          data: modifiedResponseArray
        });
      });
  });
});

module.exports = router;
