import React, { Component } from 'react';
import ElementSelect from './ElementSelect';
import DayMasterElementsToGods from './constants/DayMasterElementsToGods';
import ApiPath from './constants/ApiPath';

class ObjectWithPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {objectWithPhase: null, dayMasterDefault: null};
    this.handleObjectWithPhaseChange = this.handleObjectWithPhaseChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data[this.props.timeInterval.toLowerCase()] && nextProps.data[this.props.timeInterval.toLowerCase()][this.props.objectName]) {
      this.setState({ objectWithPhase: nextProps.data[this.props.timeInterval.toLowerCase()][this.props.objectName] });
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

  handleObjectWithPhaseChange(objectWithPhase) {
    fetch(`${ApiPath}/api/dynamic_readings/${this.props.username}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dynamic_reading: {
          username: this.props.username,
          reading_data: `{"${this.props.timeInterval.toLowerCase()}":{"element":"${this.phase(objectWithPhase)}"}}`
        }
      })
    })
    if (this.props.onUpdateDayMaster) {
      this.props.onUpdateDayMaster(this.phase(objectWithPhase));
    }

    let postData = {};
    let timeInterval = this.timeKey();
    postData[timeInterval] = {};

    let phase = this.phase(objectWithPhase);
    this.setState({ objectWithPhase: objectWithPhase });
    postData[timeInterval][this.props.objectName] = objectWithPhase;
    postData[timeInterval]['phase'] = this.phase(objectWithPhase);
    if (timeInterval == 'day') {
      postData['day_master'] = this.phase(objectWithPhase);
    }

    let god = this.god(objectWithPhase);
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
    return this.god(this.state.objectWithPhase);
  }

  displayedPhase() {
    return this.phase(this.state.objectWithPhase);
  }

  god(objectWithPhase) {
    if (!this.dayMaster() || !objectWithPhase) return null;

    return DayMasterElementsToGods[this.dayMaster()][this.phase(objectWithPhase)];
  }

  phase(objectWithPhase) {
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

    return stemsToPhases[this.selectElement(objectWithPhase, this.props.objectName)];
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
          onSelectChange={this.handleObjectWithPhaseChange}
          selectData={stems}
          data={this.props.data}
          timeInterval={this.props.timeInterval}
          elementType={this.props.objectName}
          username={this.props.username}/>

        {display}
      </div>
    );
  }
}

export default ObjectWithPhase;
