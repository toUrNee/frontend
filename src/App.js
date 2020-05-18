import React, { useContext } from 'react'

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


import './App.css';
import './styles/Form.css'
import './styles/Post.css'

function App() {
  return (
    <AuthContextProvider>
      <ExternalDataContextProvider>
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
              <PrivateRoute path="/crear-plan" exact component={AddPlan}/>
              <PrivateRoute path="/crear-sitio-turistico" exact component={AddSitioTuristico}/>
              <Route exact path="/publicaciones" render={(props) => <Publicaciones {...props} region={`Colombia`} />}/>
              <Route exact path="/publicaciones/:region" render={(props) => <Publicaciones {...props} region={props.match.params.region}/>}/>
              <Route path="/" exact component={Inicio} />
            </Switch>
          </div>
        </Router>
        </PublicacionContextProvider>
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

export default App;