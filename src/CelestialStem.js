import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CelestialStem extends Component {
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
    ].map((stem) => <option>{stem}</option>)

    return (
      <select>
        {stems}
      </select>
    );
  }
}

export default CelestialStem;
