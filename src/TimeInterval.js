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

    let cardinalDirections = ['East', 'South', 'Center', 'West', 'North'];

    let roles = [
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

        <ElementSelect
          selectData={cardinalDirections}
          data={this.props.data}
          timeInterval={this.props.title}
          elementType='cardinal_direction'
          username={this.props.username}/>

        <ElementSelect
          selectData={roles}
          data={this.props.data}
          timeInterval={this.props.title}
          elementType='role'
          username={this.props.username}/>
      </div>
    );
  }
}

export default TimeInterval;
