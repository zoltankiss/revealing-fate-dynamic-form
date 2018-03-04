import React, { Component } from 'react';
import TimeInterval from './TimeInterval';
import ApiPath from './constants/ApiPath';

class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.loadData();
    this.state = {data: {}, dayMaster: null};
    this.handleChange = this.handleChange.bind(this);
    this.loadData = this.loadData.bind(this);
    this.onUpdateDayMaster = this.onUpdateDayMaster.bind(this);
  }

  onUpdateDayMaster(dayMaster) {
    this.setState({ dayMaster: dayMaster });
  }

  loadData() {
    let vm = this;
    fetch(`${ApiPath}/api/dynamic_readings/${this.props.username}`)
      .then(response => response.json())
      .then(function (data) {
        vm.setState({ data: data.reading_data });
      })
  }

  handleChange(event) {
    window.location = '/users/' + event.target.value;
  }

  render() {
    let data = this.state.data;

    let dayMasterElement = null;
    if (this.state.dayMaster) {
      dayMasterElement = (
        <div>
          <h2><b>Day Master:</b> {this.state.dayMaster}</h2>
          <br />
        </div>
      );
    }

    return (
      <div>
        {dayMasterElement}

        <div className="row">
          <div className="col-lg-3">
            <TimeInterval title="Hour" dayMaster={this.state.dayMaster} data={data} username={this.props.username}/>
          </div>
          <div className="col-lg-3">
            <TimeInterval title="Day" onUpdateDayMaster={this.onUpdateDayMaster} data={data} username={this.props.username}/>
          </div>
          <div className="col-lg-3">
            <TimeInterval title="Month" dayMaster={this.state.dayMaster} data={data} username={this.props.username}/>
          </div>
          <div className="col-lg-3">
            <TimeInterval title="Year" dayMaster={this.state.dayMaster} data={data} username={this.props.username}/>
          </div>
        </div>
      </div>
    );
  }
}

export default DynamicForm;
