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
      activeClass: "card p-2 mb-3 shadow",
      sideShowing: "front"
    };
  }

  componentDidMount = () => {
    this.calculateProgressPercentage(this.props.data.progress);
  };

  calculateProgressPercentage = arg => {
    if (arg === "Application Submitted") {
      this.setState({ progressPercentage: 5 });
    }
  };

  inflate = () => {
    this.setState({ activeClass: "card p-2 mb-3 shadow animated pulse" });
  };

  deflate = () => {
    this.setState({ activeClass: "card p-2 mb-3 shadow" });
  };

  flipCard = () => {
    if (this.state.sideShowing === "front") {
      this.setState({ sideShowing: "back" });
    } else {
      this.setState({ sideShowing: "front" });
    }
  };

  render() {
    //Define progress percentage
    let progressStyle = { width: `${this.state.progressPercentage}%` };

    //Define the front side of the card
    let frontSide = (
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
            <small class="text-muted">{this.props.data.applicationDate}</small>
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
    );

    //Define the back side of the card
    let backSide = (
      <div
        className={this.state.activeClass}
        onMouseEnter={this.inflate}
        onMouseLeave={this.deflate}
      >
        <div class="card-body">
          <span style={style.title} class="card-title">
            {this.props.data.companyName}, {this.props.data.jobTitle}
          </span>
          <br />
          <div class="card-text ml">
            <small class="text-muted">
              Heard back on: {this.props.data.responseDate}
            </small>
          </div>
          <div class="card-text ml">
            <small class="text-muted">
              Comments: {this.props.data.comments}
            </small>
          </div>
          <hr></hr>
          <div>
            <i className="fas fa-edit btn btn-info float-left"></i>
            <i className="fas fa-trash-alt btn btn-danger float-right"></i>
          </div>
        </div>
      </div>
    );

    //Pick side to show
    let sideToShow;
    if (this.state.sideShowing === "front") {
      sideToShow = frontSide;
    } else {
      sideToShow = backSide;
    }

    //Return
    return (
      <div className="col-6" onClick={this.flipCard}>
        {sideToShow}
      </div>
    );
  }
}

export default JobCard;
