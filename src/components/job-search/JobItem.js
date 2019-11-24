// import React from "react";

// export const JobItem = (key, job) => {
//   return (
//     <div className="card mb2">
//       <div className="card-body">
//         <p>{key}</p>
//       </div>
//     </div>
//   );
// };

import React, { Component } from "react";

class JobItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      job: this.props.job
    };
  }
  render() {
    return (
      <div className="card mb2">
        <div className="card-body">
          <p>{this.state.job.jobTitle}</p>
        </div>
      </div>
    );
  }
}

export default JobItem;
