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
      <div style={appStyle}>
        <nav class="navbar navbar-dark bg-info">
          <span class="navbar-brand mb-0 h1">Navbar</span>
        </nav>
        <section className="row">
          <div className="col-2 bg-secondary p-3">
            <div
              className="btn btn-primary mb-1"
              name="Outstanding"
              onClick={this.setActiveList_Outstanding}
            >
              Outstanding {outstandingApps.length}
            </div>
            <br></br>
            <div
              className="btn btn-primary mb-1"
              name="Denied"
              onClick={this.setActiveList_Denied}
            >
              Denied {deniedApps.length}
            </div>
          </div>
          <div className="col-7">
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
