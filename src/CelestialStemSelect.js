import React, { Component } from 'react';
import ElementSelect from './ElementSelect';
import DayMasterElementsToGods from './constants/DayMasterElementsToGods';
import ApiPath from './constants/ApiPath';

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
    fetch(`${ApiPath}/api/dynamic_readings/${this.props.username}`, {
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
    if (this.props.onUpdateDayMaster) {
      this.props.onUpdateDayMaster(this.phase(celestialStem));
    }

    let postData = {};
    let timeInterval = this.props.timeInterval.toLowerCase();
    postData[timeInterval] = {};

    let phase = this.phase(celestialStem);
    this.setState({
      celestialStem: celestialStem,
      phase: phase
    });
    postData[timeInterval]['celestial_stem'] = celestialStem;
    postData[timeInterval]['phase'] = this.phase(celestialStem);

    let god = this.god(celestialStem);
    if (god) postData[timeInterval]['god'] = god;

    fetch(`${ApiPath}/api/dynamic_readings/${this.props.username}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dynamic_reading: {
          username: this.props.username,
          reading_data: JSON.stringify(postData)
        }
      })
    })
  }

  god(celestialStem) {
    if (!this.props.dayMaster || !celestialStem) return null;

    return DayMasterElementsToGods[this.props.dayMaster][this.phase(celestialStem)];
  }

  phase(celestialStem) {
    let stemsToPhases = {
      "First Celestial Stem 甲": "Yang Wood",
      "Second Celestial Stem 乙": "Yin Wood",
      "Third Celestial Stem 丙": "Yang Fire",
      "Fourth Celestial Stem 丁": "Yin Fire",
      "Fifth Celestial Stem 戊": "Yang Earth",
      "Sixth Celestial Stem 己": "Yin Earth",
      "Seventh Celestial Stem 庚": "Yang Metal",
      "Eight Celestial Stem 辛": "Yin Metal",
      "Ninth Celestial Stem 壬": "Yang Water",
      "Tenth Celestial Stem 癸": "Yin Water"
    }

    return stemsToPhases[this.selectElement(celestialStem, 'celestial_stem')];
  }

  render() {
    let stems = [
      "First Celestial Stem 甲",
      "Second Celestial Stem 乙",
      "Third Celestial Stem 丙",
      "Fourth Celestial Stem 丁",
      "Fifth Celestial Stem 戊",
      "Sixth Celestial Stem 己",
      "Seventh Celestial Stem 庚",
      "Eight Celestial Stem 辛",
      "Ninth Celestial Stem 壬",
      "Tenth Celestial Stem 癸"
    ];

    let stemChineseChars = {
      "First Celestial Stem": "甲",
      "Second Celestial Stem": "乙",
      "Third Celestial Stem": "丙",
      "Fourth Celestial Stem": "丁",
      "Fifth Celestial Stem": "戊",
      "Sixth Celestial Stem": "己",
      "Seventh Celestial Stem": "庚",
      "Eight Celestial Stem": "辛",
      "Ninth Celestial Stem": "壬",
      "Tenth Celestial Stem": "癸"
    }

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
        <br />
        <span>{this.god(this.state.celestialStem)}</span>
      </div>
    );
  }
}

export default CelestialStemSelect;
