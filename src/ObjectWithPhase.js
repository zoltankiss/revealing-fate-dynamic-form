import React, { Component } from 'react';
import ElementSelect from './ElementSelect';
import DayMasterElementsToGods from './constants/DayMasterElementsToGods';
import EnglishToChineseMapping from './constants/EnglishToChineseMapping';
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

    return stemsToPhases[this.selectElement(objectWithPhase, this.props.objectName)];
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

    let display = null;
    if (this.props.timeInterval != 'Day') {
      let phase = this.displayedPhase();
      let god = this.displayedGod();
      display = (
        <div>
          <span>{phase} {EnglishToChineseMapping[phase]}</span>
          <br />
          <span>{god} {EnglishToChineseMapping[god]}</span>
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
