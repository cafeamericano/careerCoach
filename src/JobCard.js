import React, { Component } from "react";

const style = {
  title: {
    fontSize: "1.4em !important",
    fontWeight: "bolder"
  }
};

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
    let progressStyle = { width: `{this.state.progressPercentage}%` };

    //Define the front side of the card
    let frontSide = (
      <div className="col-6">
        <div
          className={this.state.activeClass}
          onMouseEnter={this.inflate}
          onMouseLeave={this.deflate}
        >
          <div class="card-body">
            <span style={style.title} class="card-title">
              {this.props.data.companyName}
            </span>
            <br />
            <span class="card-text ml">
              <small class="text-muted">
                {this.props.data.applicationDate}
              </small>
            </span>{" "}
            <span class="card-text ml">
              <small class="text-muted">*** Days Since N/A***</small>
            </span>
            <p class="card-text">{this.props.data.jobTitle}</p>
            <div className="progress">
              <div
                class="progress-bar"
                role="progressbar"
                style={progressStyle}
              ></div>
            </div>
            <span class="card-text">
              <small class="text-muted">{this.props.data.progress}</small>
            </span>{" "}
            |{" "}
            <span class="card-text">
              <small class="text-muted">{this.props.data.closure}</small>
            </span>
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