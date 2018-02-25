import React, { Component } from 'react';
import CelestialStem from './CelestialStem';
import Element from './Element';

class TimeInterval extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <CelestialStem timeInterval={this.props.title} />
        <Element />
      </div>
    );
  }
}

export default TimeInterval;
