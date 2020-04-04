import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <ul class="nav justify-content-end" id="nav1">
        <li class="nav-item">
          <a class="nav-link active" href="#">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="#">Amazonas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Andina</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Caribe</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pacifico</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Orinoquia</a>
        </li>
      </ul>

      <header className="App-header">

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
