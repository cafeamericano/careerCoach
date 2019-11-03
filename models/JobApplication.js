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
    type: String,
    required: false,
    default: false
  },
  progress: {
    type: String,
    default: 'Application Submitted',
    required: false
  },
  closure: {
    type: String,
    default: 'Outstanding',
    required: false
  },
  comments: {
    type: String,
    required: false
  }
});

// Create model using defined schema
var JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

module.exports = JobApplication;
