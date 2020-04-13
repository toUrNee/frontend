import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Region from './components/Region';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Navbar />
        <Switch>

          <Route path="/login" exact />
          <Route path="/register" exact />
          <Route path="/crear-plan" exact />

          <Route path="/publicaciones" exact>
            Publicaciones sin filtro
          </Route>
          
          <Route path="/publicaciones/:idregion" component={Region} />
          
          <Route path="/" exact>
            <div className="text-center titulo-inicial" >
              Cattleya Tours
            </div>
            <Inicio />
          </Route>
        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
