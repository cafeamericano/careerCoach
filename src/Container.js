import React, { Component } from "react";
import JobCard from "./JobCard";

class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.records !== undefined) {
      let allRecords = this.props.records;
      let itemsToReturn = allRecords.filter( element => element.closure === "Denied")
      let jobCardComponents = itemsToReturn.map(item => (
        <JobCard key={item._id} data={item} />
      ));
      return (
        <main className="container p-3">
          <div className="row">{jobCardComponents}</div>
        </main>
      );
    } else {
      return null;
    }
  }
}

export default Container;
