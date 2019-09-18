import React, { Component } from "react";

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
  };

  render() {
    return (
      <form className='card p-1' onChange={this.processInput} onSubmit={this.submitForm}>
        <label>Company Name</label>
        <input name="companyName" placeholder="Company name"></input>
        <br />

        <label>Job Title</label>
        <input name="jobTitle" placeholder="Job title"></input>
        <br />

        <label>Application Date</label>
        <input name="applicationDate" type="date"></input>
        <br />

        <label>First Response Date</label>
        <input name="firstResponseDate" type="date"></input>
        <br />

        <label>Is Major Corporation</label>
        <input name="isMajorCorporation" type="text"></input>
        <br />

        <label>Progress</label>
        <input name="progress" type="text"></input>
        <br />

        <label>Closure</label>
        <input name="closure" type="text"></input>
        <br />

        <label>Comments</label>
        <input name="comments" type="text"></input>
        <br />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default AddRecordForm;
