import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import col from './images/colombia.jpg';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="text-center titulo-inicial" >
        Cattleya Tours
      </div>
      
      
      <Inicio />
    </div>
  );
}

export default App;
