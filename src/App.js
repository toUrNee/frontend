import React, { Component } from 'react';

import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AddPlan from './components/AddPlan';

import Publicaciones from './components/Publicaciones';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Region from './components/Region';


function App() {
  return (
    <Router>
      <div className="App">
        

        <Navbar />
        <Switch>

          <Route path="/login" exact component = {Login}/>
          <Route path="/register" exact component = {Register}/>
          <Route path="/crear-plan" exact component = {AddPlan}/>
    
          <Route path="/publicaciones" exact>
          <Publicaciones/>
          </Route>

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