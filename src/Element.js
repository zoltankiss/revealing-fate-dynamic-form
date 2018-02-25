import React, { Component } from 'react';

class Element extends Component {
  render() {
    let items = [
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
    ].map((item) => (
      <option key={item.split(' ').map((e) => e.toLowerCase()).join('-')}>
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

export default Element;
