import React, { Component } from 'react';
import logo from './logo.svg';
import rfTitleLogo from './rf-title-logo.svg';
import TimeInterval from './TimeInterval';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={rfTitleLogo} className="Logo-title" alt="logo" />
          <h1 className="App-title">Dynamic Form</h1>
        </header>

        <div class="row">
          <div class="col-lg-3">
            <TimeInterval title="Hour" />
          </div>
          <div class="col-lg-3">
            <TimeInterval title="Day" />
          </div>
          <div class="col-lg-3">
            <TimeInterval title="Month" />
          </div>
          <div class="col-lg-3">
            <TimeInterval title="Year" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
