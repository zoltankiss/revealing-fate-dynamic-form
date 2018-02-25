import React, { Component } from 'react';

class CelestialStem extends Component {
  render() {
    let items = [
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
    ].map((item) => (
      <option key={this.props.timeInterval+item.split(' ').map((e) => e.toLowerCase()).join('-')}>
        {item}
      </option>
    ))

    return (
      <select>
        {items}
      </select>
    );
  }
}

export default CelestialStem;
