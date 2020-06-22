import React, { useContext } from 'react'

import './App.css';
import './styles/Form.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Login from './components/Formularios/Login';
import Register from './components/Formularios/Register';
import FormPublicacion from './components/Formularios/FormPublicacion';
import Publicaciones from './components/Publicaciones';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import AuthContextProvider, { AuthContext } from './context/AuthContext'
import ExternalDataContextProvider from './context/ExternalDataContext'
import FormSitio from './components/Formularios/FormSitio'
import PublicacionContextProvider from './context/PublicacionContext'

//Notifications library
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import './App.css';
import './styles/Form.css'
import SitioContextProvider from './context/SitioContext';
import PerfilPropietario from './components/Perfil/PerfilPropietario';
import MisPublicaciones from './components/Perfil/MisPublicaciones';
import MisSitios from './components/Perfil/MisSitios';
import InfoPublicacion from './components/InfoPublicacion';
import ReservaContextProvider from './context/ReservaContext';
import MisReservas from './components/Perfil/MisReservas';
import MisIntereses from './components/Perfil/MisIntereses';
import axios from 'axios'

function App() {

    axios.defaults.headers.post['Authorization'] = "Bearer "+localStorage.getItem("token")
    axios.defaults.headers.get['Authorization'] = "Bearer "+localStorage.getItem("token")
    axios.defaults.headers.put['Authorization'] = "Bearer "+localStorage.getItem("token")
    axios.defaults.headers.delete['Authorization'] = "Bearer "+localStorage.getItem("token")

    return (
        <AuthContextProvider>
            <ExternalDataContextProvider>
                <SitioContextProvider>
                    <PublicacionContextProvider>
                        <ReservaContextProvider>
                        <ReactNotification />

                            <Router>
                                <div className="App">
                                    {/*Barra de navegación*/}
                                    <Navbar />
                                    <Switch>
                                        {/*Componente por cada ruta*/}
                                        <Route path="/login" exact component={Login} />
                                        <Route path="/register" exact component={Register} />

                                        <PrivateRoute path="/perfil/publicaciones" exact>
                                            <PrivateRoutePropietario path="/perfil/publicaciones" exact>
                                                <MisPublicaciones />
                                            </PrivateRoutePropietario>
                                        </PrivateRoute>

                                        <PrivateRoute path="/perfil/sitios" exact>
                                            <PrivateRoutePropietario path="/perfil/sitios" exact>
                                                <MisSitios />
                                            </PrivateRoutePropietario>
                                        </PrivateRoute>

                                        <PrivateRoute path="/perfil/reservas" exact>
                                                <MisReservas />
                                        </PrivateRoute>


                                        <PrivateRoute path="/perfil/favoritos" exact>
                                                <MisIntereses />
                                        </PrivateRoute>

                                        <PrivateRoute path="/perfil" exact>
                                                <PerfilPropietario />
                                        </PrivateRoute>                                       


                                        <PrivateRoute path="/crear-plan" exact>
                                            <PrivateRoutePropietario path="/crear-plan" exact>
                                                <FormPublicacion />
                                            </PrivateRoutePropietario>
                                        </PrivateRoute>

                                        <PrivateRoute path="/editar-plan" exact >
                                            <PrivateRoutePropietario path="/editar-plan">
                                                <FormPublicacion />
                                            </PrivateRoutePropietario>
                                        </PrivateRoute>

                                        <PrivateRoute path="/crear-sitio-turistico" exact >
                                            <FormSitio />
                                        </PrivateRoute>

                                        <PrivateRoute path="/editar-sitio-turistico" exact >
                                            <PrivateRoutePropietario path="/editar-sitio-turistico" exact >
                                                <FormSitio />
                                            </PrivateRoutePropietario>
                                        </PrivateRoute>

                                        <Route exact path="/publicaciones" render={(props) => <Publicaciones {...props} />} />
                                        <Route exact path="/publicacion/:idPublicacion" render={(props) => <InfoPublicacion {...props} />} />

                                        <Route path="/" exact component={Inicio} />

                                    </Switch>
                                </div>
                            </Router>
                        </ReservaContextProvider>
                    </PublicacionContextProvider>
                </SitioContextProvider>
            </ExternalDataContextProvider>
        </AuthContextProvider>
    )

}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
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