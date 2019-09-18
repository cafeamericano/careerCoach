import React, { Component } from "react";
import Container from "./Container";
import AddRecordForm from "./AddRecordForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      activeList: "Outstanding"
    };
  }
  componentDidMount = () => {
    this.pullRecords();
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

  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-info">
          <span class="navbar-brand mb-0 h1">Navbar</span>
        </nav>
        <section className="row">
          <div className="col-3 bg-secondary p-3">
            <AddRecordForm />
          </div>
          <div className="col-6">
            <Container
              activeList={this.state.activeList}
              records={this.state.records}
            />
          </div>
          <div className="col-3 bg-secondary p-3">

          </div>
        </section>
      </div>
    );
  }
}

export default App;
