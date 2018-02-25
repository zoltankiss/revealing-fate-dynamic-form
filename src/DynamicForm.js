import React, { Component } from 'react';
import TimeInterval from './TimeInterval';

class DynamicForm extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-3">
          <TimeInterval title="Hour" />
        </div>
        <div className="col-lg-3">
          <TimeInterval title="Day" />
        </div>
        <div className="col-lg-3">
          <TimeInterval title="Month" />
        </div>
        <div className="col-lg-3">
          <TimeInterval title="Year" />
        </div>
      </div>
    );
  }
}

export default DynamicForm;
