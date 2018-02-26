import React, { Component } from 'react';
import ElementSelect from './ElementSelect';
import CelestialStemSelect from './CelestialStemSelect';

class TimeInterval extends Component {
  render() {
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

        <CelestialStemSelect
          data={this.props.data}
          timeInterval={this.props.title}
          username={this.props.username}/>

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
