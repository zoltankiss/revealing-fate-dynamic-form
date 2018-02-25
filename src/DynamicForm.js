import React, { Component } from 'react';
import TimeInterval from './TimeInterval';

class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.loadData();
    this.state = {data: {}};
    this.handleChange = this.handleChange.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData() {
    let vm = this
    fetch(`http://localhost:3001/api/dynamic_readings/${this.props.username}`)
      .then(response => response.json())
      .then(function (data) {
        vm.setState({ data: data.reading_data })
      })
  }

  handleChange(event) {
    window.location = '/users/' + event.target.value;
  }

  render() {
    let data = this.state.data;

    return (
      <div className="row">
        <div className="col-lg-3">
          <TimeInterval title="Hour" data={data} username={this.props.username}/>
        </div>
        <div className="col-lg-3">
          <TimeInterval title="Day" data={data} username={this.props.username}/>
        </div>
        <div className="col-lg-3">
          <TimeInterval title="Month" data={data} username={this.props.username}/>
        </div>
        <div className="col-lg-3">
          <TimeInterval title="Year" data={data} username={this.props.username}/>
        </div>
      </div>
    );
  }
}

export default DynamicForm;
