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
    this.props.updateParentState()
  };

  render() {
    return (
      <form className='card p-1' onChange={this.processInput} onSubmit={this.submitForm}>
        <h3 className='text-center'>Add a New Application</h3>
        <hr></hr>
        <label>Company Name</label>
        <input class="form-control" name="companyName" placeholder="Company name"></input>
        <br />

        <label>Job Title</label>
        <input class="form-control" name="jobTitle" placeholder="Job title"></input>
        <br />

        <label>Application Date</label>
        <input class="form-control" name="applicationDate" type="date"></input>
        <br />

        <label>First Response Date</label>
        <input class="form-control" name="firstResponseDate" type="date"></input>
        <br />

        <label>Is Major Corporation</label>
        <input class="form-control" name="isMajorCorporation" type="text"></input>
        <br />

        <label>Progress</label>
        <input class="form-control" name="progress" type="text"></input>
        <br />

        <label>Closure</label>
        <input class="form-control" name="closure" type="text"></input>
        <br />

        <label>Comments</label>
        <input class="form-control" name="comments" type="text"></input>
        <br />

        <button className='btn btn-primary' type="submit">Submit</button>
      </form>
    );
  }
}

export default AddRecordForm;
