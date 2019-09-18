var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var JobApplicationSchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  applicationDate: {
    type: Date,
    required: true
  },
  firstResponseDate: {
    type: Date,
    required: false
  },
  isMajorCorporation: {
    type: Boolean,
    required: true
  },
  progress: {
    type: String,
    required: true
  },
  closure: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: false
  }
});

// Create model using defined schema
var JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

module.exports = JobApplication;
