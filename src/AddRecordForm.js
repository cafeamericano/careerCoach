import React, { Component } from "react";

var style = {
  invisibleInput: {
    display: "none"
  }
};

class AddRecordForm extends Component {
  constructor(props) {
    super(props);
  }

  processInput = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitForm = event => {
    event.preventDefault();
    let allCollectedData = this.state;
    console.log(allCollectedData);
    fetch("/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(allCollectedData)
    });
    this.props.updateParentState();
  };

  render() {
    return (
      <form
        className="card shadow p-2 animated slideInRight"
        onChange={this.processInput}
        onSubmit={this.submitForm}
      >
        <h3 className="text-center">Add a New Application</h3>
        <hr></hr>
        <label>Company Name</label>
        <input
          class="form-control"
          name="companyName"
          placeholder="Company name"
        ></input>
        <br />

        <label>Job Title</label>
        <input
          class="form-control"
          name="jobTitle"
          placeholder="Job title"
        ></input>
        <br />

        <label>Application Date</label>
        <input class="form-control" name="applicationDate" type="date"></input>
        <br />
        {/* 
        <label>First Response Date</label>
        <input
          class="form-control"
          name="firstResponseDate"
          type="date"
        ></input>
        <br /> */}

        <label>Is Major Corporation</label>
        <select
          class="form-control"
          name="isMajorCorporation"
          data-existing="{{this.majorCorporation}}"
        >
          <option selected disabled>
            Select
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
        <br />

        {/* <label>Progress</label>
        <select
          class="form-control"
          id="progress"
          name="progress"
          data-existing="{{this.progress}}"
        >
          <option value="Application Submitted">Application Submitted</option>
          <option value="Discussed With Recruiter">
            Discussed With Recruiter
          </option>
          <option value="Phone Interview Offered">
            Phone Interview Offered
          </option>
          <option value="Onsite Interview Offered">
            Onsite Interview Offered
          </option>
          <option value="Job Offered">Job Offered</option>
        </select>
        <br />

        <label>Closure</label>
        <select class="form-control" name="closure">
          <option value="Outstanding">Outstanding</option>
          <option value="Accepted">Accepted</option>
          <option value="Denied">Denied</option>
          <option value="Withdrawn">Withdrawn</option>
          <option value="Application Lost">Application Lost</option>
          <option value="Never Responded">Never Responded</option>
        </select>
        <br /> */}

        <label>Comments</label>
        <input class="form-control" name="comments" type="text"></input>
        <br />

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default AddRecordForm;
