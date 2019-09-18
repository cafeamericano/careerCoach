import React, { Component } from "react";
import Container from "./Container";
import AddRecordForm from "./AddRecordForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      activeList: "Outstanding",
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

  setActiveList_Outstanding = () => {
    this.setState({ activeList: "Outstanding" });
  };

  setActiveList_Denied = () => {
    this.setState({ activeList: "Denied" });
  };

  render() {
    let outstandingApps = this.state.records.filter(
      item => item.closure === "Outstanding"
    );
    let deniedApps = this.state.records.filter(
      item => item.closure === "Denied"
    );

    return (
      <div>
        <nav class="navbar navbar-dark bg-info">
          <span class="navbar-brand mb-0 h1">Navbar</span>
        </nav>
        <section className="row">
          <div className="col-3 bg-secondary p-3">
            <div
              className="btn btn-primary"
              name="Outstanding"
              onClick={this.setActiveList_Outstanding}
            >
              Outstanding {outstandingApps.length}
            </div>
            <div
              className="btn btn-primary"
              name="Denied"
              onClick={this.setActiveList_Denied}
            >
              Denied {deniedApps.length}
            </div>
          </div>
          <div className="col-6">
            <Container
              activeList={this.state.activeList}
              records={this.state.records}
            />
          </div>
          <div className="col-3 bg-light p-3">
            <AddRecordForm updateParentState={this.updateMyState} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
