import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Usernames extends Component {
  constructor(props) {
    super(props);
    this.loadUsernames();
    this.state = {usernames: [], redirectToUsername: false};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    window.location = '/users/' + event.target.value;
  }

  loadUsernames() {
    fetch('http://localhost:3001/api/dynamic_reading_usernames')
      .then(response => response.json())
      .then(data => this.setState({
        usernames: data.map((item) => <option value={item}>{item}</option>)
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
