import React, { Component } from 'react';

class ElementSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {item: null};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.props.onSelectChange) this.props.onSelectChange(event.target.value);
    this.setState({ item: event.target.value });
    fetch(`http://localhost:3001/api/dynamic_readings/${this.props.username}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dynamic_reading: {
          username: this.props.username,
          reading_data: `{"${this.props.timeInterval.toLowerCase()}":{"${this.props.elementType}":"${event.target.value}"}}`
        }
      })
    })
  }

  selectValue() {
    if(this.state.item) return this.state.item;

    let timeKey = this.props.timeInterval.toLowerCase();
    if(!(timeKey in this.props.data)) return '';
    if (!(this.props.elementType in this.props.data[timeKey])) return this.props.data[timeKey];
    return this.props.data[timeKey][this.props.elementType];
  }

  render() {
    let options = this.props.selectData.map((item) => (
      <option key={this.props.timeInterval+item.split(' ').map((e) => e.toLowerCase()).join('-')}>
        {item}
      </option>
    ))

    return (
      <div>
        <select value={this.selectValue()} onChange={this.handleChange}>
          <option value=""></option>
          {options}
        </select>
      </div>
    );
  }
}

export default ElementSelect;
