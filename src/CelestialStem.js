import React, { Component } from 'react';

class CelestialStem extends Component {
  constructor(props) {
    super(props);
    this.state = {item: null};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
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
          reading_data: `{"${this.props.timeInterval.toLowerCase()}":{"celestial_stem":"${event.target.value}"}}`
        }
      })
    })
  }

  selectValue () {
    if(this.state.item) return this.state.item;

    let timeKey = this.props.timeInterval.toLowerCase();
    if(!(timeKey in this.props.data)) return '';
    if (!('celestial_stem' in this.props.data[timeKey])) return this.props.data[timeKey];
    return this.props.data[timeKey]['celestial_stem'];
  }

  render() {
    let items = [
      "First Celestial Stem",
      "Second Celestial Stem",
      "Third Celestial Stem",
      "Forth Celestial Stem",
      "Fifth Celestial Stem",
      "Sixth Celestial Stem",
      "Seventh Celestial Stem",
      "Eight Celestial Stem",
      "Ninth Celestial Stem",
      "Tenth Celestial Stem"
    ].map((item) => (
      <option key={this.props.timeInterval+item.split(' ').map((e) => e.toLowerCase()).join('-')}>
        {item}
      </option>
    ))

    return (
      <div>
        <select value={this.selectValue()} onChange={this.handleChange}>
          {items}
        </select>
      </div>
    );
  }
}

export default CelestialStem;
