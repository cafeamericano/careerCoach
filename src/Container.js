import React, { Component } from "react";
import JobCard from "./JobCard";

class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let x = this.props.records;
    console.log(x);
    if (this.props.records !== undefined) {
      let jobs = this.props.records.map(item => (
        <JobCard key={item._id} data={item} />
      ));
      return (
        <main className="container p-3">
          <div className="row">{jobs}</div>
        </main>
      );
    } else {
      return null;
    }
  }
}

export default Container;
