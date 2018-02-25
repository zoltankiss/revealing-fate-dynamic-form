import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import logo from './logo.svg';
import rfTitleLogo from './rf-title-logo.svg';
import SelectUser from './SelectUser';
import UserDynamicForm from './UserDynamicForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={rfTitleLogo} className="Logo-title" alt="logo" />
            <h1 className="App-title">Dynamic Form</h1>
          </header>
          <hr />
          <Route exact path="/" component={SelectUser}/>
          <Route exact path="/users/:username" component={UserDynamicForm}/>
        </div>
      </Router>
    );
  }
}

export default App;
