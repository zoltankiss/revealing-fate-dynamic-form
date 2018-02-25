import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CelestialStem from './CelestialStem';
import Element from './Element';

class TimeInterval extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <CelestialStem />
        <Element />
      </div>
    );
  }
}

export default TimeInterval;
