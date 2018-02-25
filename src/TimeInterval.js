import React, { Component } from 'react';
import CelestialStem from './CelestialStem';
import Element from './Element';

class TimeInterval extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <CelestialStem data={this.props.data} timeInterval={this.props.title} username={this.props.username}/>
        <Element data={this.props.data} timeInterval={this.props.title} username={this.props.username}/>
      </div>
    );
  }
}

export default TimeInterval;
