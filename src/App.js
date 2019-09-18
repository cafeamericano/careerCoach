import React, { Component } from "react";
import Container from "./Container";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: []
    };
  }
  componentDidMount = () => {
    this.pullRecords();
  };

  pullRecords = () => {
    fetch("/all")
      .then(response => response.json())
      .then(response => {
        console.log(response)
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
          <div className="col-3 bg-secondary"></div>
          <div className="col-9">
            <Container records={this.state.records} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
