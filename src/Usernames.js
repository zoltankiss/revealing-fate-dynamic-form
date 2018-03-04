import React, { Component } from 'react';
import ApiPath from './constants/ApiPath';

class Usernames extends Component {
  constructor(props) {
    super(props);
    this.loadUsernames();
    this.state = {usernames: []};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    window.location = '/users/' + event.target.value;
  }

  loadUsernames() {
    fetch(`${ApiPath}/api/dynamic_reading_usernames`)
      .then(response => response.json())
      .then(data => this.setState({
        usernames: data.map((item) => <option key={item} value={item}>{item}</option>)
      }));
  }

  render() {
    return (
      <select value={this.props.username} onChange={this.handleChange}>
        <option value=""></option>
        {this.state.usernames}
      </select>
    );
  }
}

export default Usernames;
