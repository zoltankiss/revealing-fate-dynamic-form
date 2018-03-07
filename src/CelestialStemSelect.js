import React, { Component } from 'react';
import ElementSelect from './ElementSelect';
import DayMasterElementsToGods from './constants/DayMasterElementsToGods';
import ApiPath from './constants/ApiPath';

class CelestialStemSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {celestialStem: null, dayMasterDefault: null};
    this.handleCelestialStemChange = this.handleCelestialStemChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data[this.props.timeInterval.toLowerCase()] && nextProps.data[this.props.timeInterval.toLowerCase()]['celestial_stem']) {
      this.setState({ celestialStem: nextProps.data[this.props.timeInterval.toLowerCase()]['celestial_stem'] });
    }
    if (nextProps.data && nextProps.data['day_master']) {
      this.setState({ dayMasterDefault: nextProps.data['day_master'] });
    }
  }

  dayMaster() {
    return this.props.dayMaster || this.state.dayMasterDefault;
  }

  selectElement(stateElement, elementType) {
    if(stateElement) return stateElement;
    let data = this.selfData();
    if (!data) return '';
    if (!(elementType in data)) return data;
    return data[elementType];
  }

  timeKey() {
    return this.props.timeInterval.toLowerCase();
  }

  selfData() {
    if(!(this.timeKey() in this.props.data)) return null;
    return this.props.data[this.timeKey()];
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
    let timeInterval = this.timeKey();
    postData[timeInterval] = {};

    let phase = this.phase(celestialStem);
    this.setState({ celestialStem: celestialStem });
    postData[timeInterval]['celestial_stem'] = celestialStem;
    postData[timeInterval]['phase'] = this.phase(celestialStem);
    if (timeInterval == 'day') {
      postData['day_master'] = this.phase(celestialStem);
    }

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

  displayedGod() {
    return this.god(this.state.celestialStem);
  }

  displayedPhase() {
    return this.phase(this.state.celestialStem);
  }

  god(celestialStem) {
    if (!this.dayMaster() || !celestialStem) return null;

    return DayMasterElementsToGods[this.dayMaster()][this.phase(celestialStem)];
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

    let display = null;
    if (this.props.timeInterval != 'Day') {
      display = (
        <div>
          <span>{this.displayedPhase()}</span>
          <br />
          <span>{this.displayedGod()}</span>
        </div>
      )
    } else {
      display = null;
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

        {display}
      </div>
    );
  }
}

export default CelestialStemSelect;
