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
        "Yin Earth": "Consuming Spirit",
        "Yang Water": "Just Officer",
        "Yin Fire": "Peer Assistance",
        "Yin Metal": "Indirect Wealth",
        "Yin Wood": "Indirect Resource",
        "Yang Earth": "Rebellious Officer",
        "Yin Water": "Seven Threats",
        "Yang Fire": "Benevolent Plunder",
      },
      "Yang Fire": {
        "Yin Metal": "Direct Wealth",
        "Yin Wood": "Direct Resource",
        "Yang Earth": "Consuming Spirit",
        "Yin Water": "Just Officer",
        "Yang Fire": "Peer Assistance",
        "Yang Metal": "Indirect Wealth",
        "Yang Wood": "Indirect Resource",
        "Yin Earth": "Rebellious Officer",
        "Yang Water": "Seven Threats",
        "Yin Fire": "Benevolent Plunder",
      },
      "Yang Earth": {
        "Yin Water": "Direct Wealth",
        "Yin Fire": "Direct Resource",
        "Yang Metal": "Consuming Spirit",
        "Yin Wood": "Just Officer",
        "Yang Earth": "Peer Assistance",
        "Yang Water": "Indirect Wealth",
        "Yang Fire": "Indirect Resource",
        "Yin Metal": "Rebellious Officer",
        "Yang Wood": "Seven Threats",
        "Yin Earth": "Benevolent Plunder",
      },
      "Yin Earth": {
        "Yang Water": "Direct Wealth",
        "Yang Fire": "Direct Resource",
        "Yin Metal": "Consuming Spirit",
        "Yang Wood": "Just Officer",
        "Yin Earth": "Peer Assistance",
        "Yin Water": "Indirect Wealth",
        "Yin Fire": "Indirect Resource",
        "Yang Metal": "Rebellious Officer",
        "Yin Wood": "Seven Threats",
        "Yang Earth": "Benevolent Plunder",
      },
      "Yang Metal": {
        "Yin Wood": "Direct Wealth",
        "Yin Earth": "Direct Resource",
        "Yang Water": "Consuming Spirit",
        "Yin Fire": "Just Officer",
        "Yang Metal": "Peer Assistance",
        "Yang Wood": "Indirect Wealth",
        "Yang Earth": "Indirect Resource",
        "Yin Water": "Rebellious Officer",
        "Yang Fire": "Seven Threats",
        "Yin Metal": "Benevolent Plunder",
      },
      "Yin Metal": {
        "Yang Wood": "Direct Wealth",
        "Yang Earth": "Direct Resource",
        "Yin Water": "Consuming Spirit",
        "Yang Fire": "Just Officer",
        "Yin Metal": "Peer Assistance",
        "Yin Wood": "Indirect Wealth",
        "Yin Earth": "Indirect Resource",
        "Yang Water": "Rebellious Officer",
        "Yin Fire": "Seven Threats",
        "Yang Metal": "Benevolent Plunder",
      },
      "Yang Water": {
        "Yin Fire": "Direct Wealth",
        "Yin Metal": "Direct Resource",
        "Yang Wood": "Consuming Spirit",
        "Yin Earth": "Just Officer",
        "Yang Water": "Peer Assistance",
        "Yang Fire": "Indirect Wealth",
        "Yang Metal": "Indirect Resource",
        "Yin Wood": "Rebellious Officer",
        "Yang Earth": "Seven Threats",
        "Yin Water": "Benevolent Plunder",
      },
      "Yin Water": {
        "Yang Fire": "Direct Wealth",
        "Yang Metal": "Direct Resource",
        "Yin Wood": "Consuming Spirit",
        "Yang Earth": "Just Officer",
        "Yin Water": "Peer Assistance",
        "Yin Fire": "Indirect Wealth",
        "Yin Metal": "Indirect Resource",
        "Yang Wood": "Rebellious Officer",
        "Yin Earth": "Seven Threats",
        "Yang Water": "Benevolent Plunder",
      },
      "Yang Wood": {
        "Yin Earth": "Direct Wealth",
        "Yin Water": "Direct Resource",
        "Yang Fire": "Consuming Spirit",
        "Yin Metal": "Just Officer",
        "Yang Wood": "Peer Assistance",
        "Yang Earth": "Indirect Wealth",
        "Yang Water": "Indirect Resource",
        "Yin Fire": "Rebellious Officer",
        "Yang Metal": "Seven Threats",
        "Yin Wood": "Benevolent Plunder",
      },
      "Yin Wood": {
        "Yang Earth": "Direct Wealth",
        "Yang Water": "Direct Resource",
        "Yin Fire": "Consuming Spirit",
        "Yang Metal": "Just Officer",
        "Yin Wood": "Peer Assistance",
        "Yin Earth": "Indirect Wealth",
        "Yin Water": "Indirect Resource",
        "Yang Fire": "Rebellious Officer",
        "Yin Metal": "Seven Threats",
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
