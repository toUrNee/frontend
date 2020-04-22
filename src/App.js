import React from 'react';

import './App.css';
import './styles/Form.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
        {/*Barra de navegación*/}
        <Navbar />
        <Switch>
          {/*Componente por cada ruta*/}
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/crear-plan" exact component={AddPlan} />
          <Route path="/publicaciones" exact component={Publicaciones} />
          <Route path="/publicaciones/:idregion" component={Region} />
          <Route path="/" exact component={Inicio} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;