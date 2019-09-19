import React, { Component } from "react";
import Container from "./Container";
import AddRecordForm from "./AddRecordForm";
import Background from "./background.jpg";

let appStyle = {
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  backgroundRepeat: "repeat",
  backgroundAttachment: "fixed"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      activeList: "All",
      clickCounter: 0
    };
  }
  componentWillMount = () => {
    this.pullRecords();
  };

  updateMyState = () => {
    this.pullRecords();
    this.setState({ clickCounter: (this.state.clickCounter += 1) });
  };

  pullRecords = () => {
    fetch("/all")
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ records: response });
      });
    console.log("fetched");
  };

  setActiveList_All = () => {
    this.setState({ activeList: "All" });
  };

  setActiveList_Outstanding = () => {
    this.setState({ activeList: "Outstanding" });
  };

  setActiveList_Withdrawn = () => {
    this.setState({ activeList: "Withdrawn" });
  };

  setActiveList_ApplicationLost = () => {
    this.setState({ activeList: "Application Lost" });
  };

  setActiveList_NeverResponded = () => {
    this.setState({ activeList: "Never Responded" });
  };

  setActiveList_Denied = () => {
    this.setState({ activeList: "Denied" });
  };

  setActiveList_Accepted = () => {
    this.setState({ activeList: "Accepted" });
  };

  render() {
    let allApps = this.state.records;
    let outstandingApps = this.state.records.filter(
      item => item.closure === "Outstanding"
    );
    let withdrawnApps = this.state.records.filter(
      item => item.closure === "Withdrawn"
    );
    let applicationLostApps = this.state.records.filter(
      item => item.closure === "Application Lost"
    );
    let neverRespondedApps = this.state.records.filter(
      item => item.closure === "Never Responded"
    );
    let deniedApps = this.state.records.filter(
      item => item.closure === "Denied"
    );
    let acceptedApps = this.state.records.filter(
      item => item.closure === "Accepted"
    );

    return (
      <div style={appStyle}>
        <nav class="navbar navbar-dark bg-dark">
          <span class="navbar-brand mb-0 h1">Career Coach</span>
        </nav>
        <section className="row">
          <div className="col-2 bg-secondary p-3">
            <ul class="list-group">
              <li class="list-group-item" onClick={this.setActiveList_All}>
                All{" "}
                <span className="badge badge-primary float-right">
                  {allApps.length}
                </span>
              </li>
              <li
                class="list-group-item"
                onClick={this.setActiveList_Outstanding}
              >
                Outstanding{" "}
                <span className="badge badge-primary float-right">
                  {outstandingApps.length}
                </span>
              </li>
              <li
                class="list-group-item"
                onClick={this.setActiveList_Withdrawn}
              >
                Withdrawn{" "}
                <span className="badge badge-primary float-right">
                  {withdrawnApps.length}
                </span>
              </li>
              <li
                class="list-group-item"
                onClick={this.setActiveList_ApplicationLost}
              >
                Application Lost{" "}
                <span className="badge badge-primary float-right">
                  {applicationLostApps.length}
                </span>
              </li>
              <li
                class="list-group-item"
                onClick={this.setActiveList_NeverResponded}
              >
                Never Responded{" "}
                <span className="badge badge-primary float-right">
                  {neverRespondedApps.length}
                </span>
              </li>
              <li class="list-group-item" onClick={this.setActiveList_Denied}>
                Denied{" "}
                <span className="badge badge-primary float-right">
                  {deniedApps.length}
                </span>
              </li>
              <li class="list-group-item" onClick={this.setActiveList_Accepted}>
                Accepted{" "}
                <span className="badge badge-primary float-right">
                  {acceptedApps.length}
                </span>
              </li>
            </ul>
          </div>
          <div className="col-7">
            <Container
              activeList={this.state.activeList}
              records={this.state.records}
            />
          </div>
          <div className="col-3 p-3">
            <AddRecordForm updateParentState={this.updateMyState} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
