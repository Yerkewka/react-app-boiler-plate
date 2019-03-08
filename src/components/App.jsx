import React, { Component } from 'react';
import tree from '../img/tree.jpg';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Hello, Yerkewka!</h1>
        <img src={tree} alt="Tree" />
      </div>
    );
  }
}

export default App;
