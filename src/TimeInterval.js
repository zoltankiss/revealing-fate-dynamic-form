import React, { Component } from 'react';
import ElementSelect from './ElementSelect';

class TimeInterval extends Component {
  constructor(props) {
    super(props);
    this.state = {celestialStem: null};
    this.handleCelestialStemChange = this.handleCelestialStemChange.bind(this);
  }

  selectElement(stateElement, elementType) {
    if(stateElement) return stateElement;

    let timeKey = this.props.title.toLowerCase();
    if(!(timeKey in this.props.data)) return '';
    if (!(elementType in this.props.data[timeKey])) return this.props.data[timeKey];
    return this.props.data[timeKey][elementType];
  }

  handleCelestialStemChange(celestialStem) {
    fetch(`http://localhost:3001/api/dynamic_readings/${this.props.username}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dynamic_reading: {
          username: this.props.username,
          reading_data: `{"${this.props.title.toLowerCase()}":{"element":"${celestialStem}"}}`
        }
      })
    })

    this.setState({celestialStem: celestialStem});
  }

  phase() {
    let stemsToPhases = {
      "First Celestial Stem": "Yang Wood",
      "Second Celestial Stem": "Yin Wood",
      "Third Celestial Stem": "Yang Fire",
      "Fourth Celestial Stem": "Yin Fire",
      "Fifth Celestial Stem": "Yang Earth",
      "Sixth Celestial Stem": "Yin Earth",
      "Seventh Celestial Stem": "Yang Metal",
      "Eight Celestial Stem": "Yin Metal",
      "Ninth Celestial Stem": "Yang Water",
      "Tenth Celestial Stem": "Yin Water"
    }

    return stemsToPhases[this.selectElement(this.state.celestialStem, 'celestial_stem')];
  }

  render() {
    let stems = [
      "First Celestial Stem",
      "Second Celestial Stem",
      "Third Celestial Stem",
      "Fourth Celestial Stem",
      "Fifth Celestial Stem",
      "Sixth Celestial Stem",
      "Seventh Celestial Stem",
      "Eight Celestial Stem",
      "Ninth Celestial Stem",
      "Tenth Celestial Stem"
    ];

    let elements = [
      'Yang Wood',
      'Yin Wood',
      'Yang Fire',
      'Yin Fire',
      'Yang Earth',
      'Yin Earth',
      'Yang Metal',
      'Yin Metal',
      'Yang Water',
      'Yin Water'
    ];

    let cardinalDirections = ['East', 'South', 'Center', 'West', 'North'];

    let tenGods = [
      'Peer Assistance 比肩',
      'Benevolent Plunder 劫財',
      'Consuming Spirit 食神',
      'Rebellious Officer 傷官',
      'Direct Wealth 正財',
      'Indirect Wealth 偏財',
      'Just Officer 正官',
      'Seven Threats 七殺',
      'Direct Resource 正印',
      'Indirect Resource 偏印'
    ];

    return (
      <div>
        <h3>{this.props.title}</h3>

        <ElementSelect
          onSelectChange={this.handleCelestialStemChange}
          selectData={stems}
          data={this.props.data}
          timeInterval={this.props.title}
          elementType='celestial_stem'
          username={this.props.username}/>

        <span>{this.phase()}</span>

        <ElementSelect
          selectData={tenGods}
          data={this.props.data}
          timeInterval={this.props.title}
          elementType='god'
          username={this.props.username}/>
      </div>
    );
  }
}

export default TimeInterval;
