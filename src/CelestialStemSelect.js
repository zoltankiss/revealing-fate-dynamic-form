import React, { Component } from 'react';
import ElementSelect from './ElementSelect';

class CelestialStemSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {celestialStem: null};
    this.handleCelestialStemChange = this.handleCelestialStemChange.bind(this);
  }

  selectElement(stateElement, elementType) {
    if(stateElement) return stateElement;

    let timeKey = this.props.timeInterval.toLowerCase();
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
          reading_data: `{"${this.props.timeInterval.toLowerCase()}":{"element":"${this.phase(celestialStem)}"}}`
        }
      })
    })
    this.setState({celestialStem: celestialStem});
  }

  phase(celestialStem) {
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

    return stemsToPhases[this.selectElement(celestialStem, 'celestial_stem')];
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

    return (
      <div>
        <ElementSelect
          onSelectChange={this.handleCelestialStemChange}
          selectData={stems}
          data={this.props.data}
          timeInterval={this.props.timeInterval}
          elementType='celestial_stem'
          username={this.props.username}/>

        <span>{this.phase(this.state.celestialStem)}</span>
      </div>
    );
  }
}

export default CelestialStemSelect;
