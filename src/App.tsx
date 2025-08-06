import React from 'react';
import logo from './logo.svg';
import './App.css';
import FractalTree from './FractalTree';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fractal Tree Simulator</h1>
      </header>
      <div>
        <FractalTree />
      </div>
    </div>
  );
}

export default App;
