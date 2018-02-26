import React, { Component } from 'react';
import ElementSelect from './ElementSelect';

class TimeInterval extends Component {
  render() {
    let stems = [
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

    return (
      <div>
        <h3>{this.props.title}</h3>
        <ElementSelect
          selectData={stems}
          data={this.props.data}
          timeInterval={this.props.title}
          elementType='celestial_stem'
          username={this.props.username}/>

        <ElementSelect
          selectData={elements}
          data={this.props.data}
          timeInterval={this.props.title}
          elementType='element'
          username={this.props.username}/>
      </div>
    );
  }
}

export default TimeInterval;
