import React, { useContext, useState, useEffect } from 'react'

import './App.css';
import './styles/Form.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AddPlan from './components/AddPlan';
import Publicaciones from './components/Publicaciones';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import AddSitioTuristico from './components/AddSitioTuristico';
import AuthContextProvider, { AuthContext } from './context/AuthContext'
import ExternalDataContextProvider from './context/ExternalDataContext'
import PublicacionContextProvider from './context/PublicacionContext'


//Notifications library
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'

import orquidea from './images/logo.png'
import portada from './images/portada.jpg'
import './App.css';
import './styles/Form.css'
import './styles/Post.css'
import SitioContextProvider, { SitioContext } from './context/SitioContext';
import PerfilPropietario from './components/PerfilPropietario';
import MisPublicaciones from './components/MisPublicaciones';
import MisSitios from './components/MisSitios';

function App() {

  const [region, setRegion] = useState({
    region: "Colombia",
    img: portada
  })



  return (
    <AuthContextProvider>
      <ExternalDataContextProvider>
        <SitioContextProvider>
          <PublicacionContextProvider>
            <ReactNotification />
            <Router>
              <div className="App">
                {/*Barra de navegación*/}
                <Navbar />
                <Switch>
                  {/*Componente por cada ruta*/}
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />

                  <Route path="/test" exact component={MisSitios} />

                  <PrivateRoutePropietario path="/perfil" exact>
                    <PerfilPropietario />
                  </PrivateRoutePropietario>

                  <PrivateRoute path="/perfil/publicaciones" exact>
                    <MisPublicaciones />
                  </PrivateRoute>

                  <PrivateRoute path="/crear-plan" exact>
                    <AddPlan />
                  </PrivateRoute>

                  <PrivateRoute path="/crear-sitio-turistico" exact >
                    <AddSitioTuristico />
                  </PrivateRoute>

                  <Route exact path="/publicaciones" render={(props) => <Publicaciones {...props} region={region} />} />
                  <Route exact path="/publicaciones/:region" render={(props) => <Publicaciones {...props} region={region} />} />
                  <Route path="/" exact component={Inicio} />
                </Switch>
              </div>
            </Router>
          </PublicacionContextProvider>
        </SitioContextProvider>
      </ExternalDataContextProvider>
    </AuthContextProvider>
  )
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Route {...rest} render={({ location }) =>
      isAuthenticated ?
        (children)
        : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
    } />
  );
}

const PrivateRoutePropietario = ({ children, ...rest }) => {
  const { propietario } = useContext(AuthContext)
  return (
    <Route {...rest} render={({ location }) =>
      propietario ?
        (children)
        : (
          <Redirect
            to={{
              pathname: "/crear-sitio-turistico",
              state: { from: location }
            }}
          />
        )
    } />
  );
}

export default App;