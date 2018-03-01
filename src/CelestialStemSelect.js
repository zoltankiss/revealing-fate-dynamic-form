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
    if (this.props.onUpdateDayMaster) {
      this.props.onUpdateDayMaster(this.phase(celestialStem));
    }
    this.setState({celestialStem: celestialStem});
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
    let dayMasterElements = {
      "Yin Fire": {
        "Yang Metal": "Direct Wealth",
        "Yang Wood": "Direct Resource",
        "Yang Water": "Just Officer",
        "Yang Earth": "Rebellious Officer",
        "Yang Fire": "Benevolent Plunder",
      },
      "Yang Fire": {
        "Yang Earth": "Consuming Spirit",
        "Yang Fire": "Peer Assistance",
        "Yang Metal": "Indirect Wealth",
        "Yang Wood": "Indirect Resource",
        "Yang Water": "Seven Threats",
      },
      "Yang Earth": {
        "Yang Metal": "Consuming Spirit",
        "Yang Earth": "Peer Assistance",
        "Yang Water": "Indirect Wealth",
        "Yang Fire": "Indirect Resource",
        "Yang Wood": "Seven Threats",
      },
      "Yin Earth": {
        "Yang Water": "Direct Wealth",
        "Yang Fire": "Direct Resource",
        "Yang Wood": "Just Officer",
        "Yang Metal": "Rebellious Officer",
        "Yang Earth": "Benevolent Plunder",
      },
      "Yang Metal": {
        "Yang Water": "Consuming Spirit",
        "Yang Metal": "Peer Assistance",
        "Yang Wood": "Indirect Wealth",
        "Yang Earth": "Indirect Resource",
        "Yang Fire": "Seven Threats",
      },
      "Yin Metal": {
        "Yang Wood": "Direct Wealth",
        "Yang Earth": "Direct Resource",
        "Yang Fire": "Just Officer",
        "Yang Water": "Rebellious Officer",
        "Yang Metal": "Benevolent Plunder",
      },
      "Yang Water": {
        "Yang Wood": "Consuming Spirit",
        "Yang Water": "Peer Assistance",
        "Yang Fire": "Indirect Wealth",
        "Yang Metal": "Indirect Resource",
        "Yang Earth": "Seven Threats",
      },
      "Yin Water": {
        "Yang Fire": "Direct Wealth",
        "Yang Metal": "Direct Resource",
        "Yang Earth": "Just Officer",
        "Yang Wood": "Rebellious Officer",
        "Yang Water": "Benevolent Plunder",
      },
      "Yang Wood": {
        "Yang Fire": "Consuming Spirit",
        "Yang Wood": "Peer Assistance",
        "Yang Earth": "Indirect Wealth",
        "Yang Water": "Indirect Resource",
        "Yang Metal": "Seven Threats",
      },
      "Yin Wood": {
        "Yang Earth": "Direct Wealth",
        "Yang Water": "Direct Resource",
        "Yang Metal": "Just Officer",
        "Yang Fire": "Rebellious Officer",
        "Yang Wood": "Benevolent Plunder",
      }
    }

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

    let dayMasterMarkup = null;
    if (this.props.dayMaster && this.state.celestialStem) {
      dayMasterMarkup = <span>{dayMasterElements[this.props.dayMaster][this.phase(this.state.celestialStem)]}</span>;
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
        {dayMasterMarkup}
      </div>
    );
  }
}

export default CelestialStemSelect;
