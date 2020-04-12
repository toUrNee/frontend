import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Publicaciones from './components/Publicaciones';


function App() {
  return (
    <Router>
      <div className="App">
        
        <Switch>
          <Route path="/publicaciones" exact>
            <Publicaciones/>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;