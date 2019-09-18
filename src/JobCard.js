import React, { Component } from "react";

class JobCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-4">
        <div className="card p-2 mb-3 shadow">
          <p>{this.props.data.companyName}</p>
          <p>{this.props.data.applicationSubmissionDate}</p>
          <p>{this.props.data.jobTitle}</p>
          <p>{this.props.data.status}</p>
          <p>{this.props.data.closure}</p>
        </div>
      </div>
    );
  }
}

export default JobCard;
