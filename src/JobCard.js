import React, { Component } from "react";

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressPercentage: 0,
      activeClass: "card p-2 mb-3 shadow"
    };
  }

  componentDidMount = () => {
    this.calculateProgressPercentage(this.props.data.progress);
  };

  calculateProgressPercentage = arg => {
    if (arg === "Outstanding 1 or More Weeks") {
      this.setState({ progressPercentage: 10 });
    }
  };

  inflate = () => {
    this.setState({ activeClass: "card p-2 mb-3 shadow animated pulse" });
  };

  deflate = () => {
    this.setState({ activeClass: "card p-2 mb-3 shadow" });
  };

  render() {
    //Define progress percentage
    let progressStyle = { width: `${this.state.progressPercentage}%` };

    //Define the front side of the card
    let frontSide = (
      <div className="col-6">
        <div
          className={this.state.activeClass}
          onMouseEnter={this.inflate}
          onMouseLeave={this.deflate}
        >
          <p>{this.props.data.companyName}</p>
          <p>{this.props.data.applicationDate}</p>
          <p>{this.props.data.jobTitle}</p>
          <p>{this.props.data.progress}</p>
          <p>{this.props.data.closure}</p>
          <div class="progress">
            <div
              class="progress-bar"
              role="progressbar"
              style={progressStyle}
            ></div>
          </div>
        </div>
      </div>
    );

    //Define the back side of the card
    let backSide = (
      <div className="col-6">
        <div className="card p-2 mb-3 shadow">
          <p>{this.props.data.companyName}</p>
        </div>
      </div>
    );

    //Return
    return frontSide;
  }
}

export default JobCard;
