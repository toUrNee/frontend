import React, { useContext } from 'react';
import orquidea from '../images/logo.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'
import '../styles/Nav.css'
import { ExternalDataContext } from '../context/ExternalDataContext'

const Navbar = () => {
    const { isAuthenticated, logoutUser, user, propietario } = useContext(AuthContext)
    const { regiones } = useContext(ExternalDataContext)

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link to="/" className="nav-link inicio">
                <img src={orquidea} height="70px" className="d-inline-block align-top" alt="cattleya" id="logo-cattleya" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <Link className="nav-link" to='/publicaciones'>
                        Publicaciones
                        </Link>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                            to='/hola'>
                            Regiones
                        </Link>
                        <div className="dropdown-menu text-left" aria-labelledby="navbarDropdownMenuLink">
                            {regiones.map(region => (
                                <Link key={region.nombre} to={{
                                    pathname: `/publicaciones`,
                                    state: {
                                        region: region.nombre,
                                        img: region.img
                                    }
                                }} className="nav-link" key={region.nombre}>
                                    <span className="nav-item active"> {region.nombre} </span>
                                </Link>
                            ))}
                        </div>
                    </li>
                </ul>
                {isAuthenticated ?
                    propietario ?
                        <ul className="navbar-nav ">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                    to='/hola'>
                                    Propietario
                        </Link>
                                <div className="dropdown-menu text-left" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="nav-link" to="/perfil">
                                        Perfil
                                    </Link>
                                    <Link to='/crear-sitio-turistico' className="nav-link">
                                        <span className="nav-item active"> Agregar sitio turistico </span>
                                    </Link>
                                    <Link to='/crear-plan' className="nav-link">
                                        <span className="nav-item active"> Publicar plan </span>
                                    </Link>

                                </div>
                            </li>
                            <Link to='/' onClick={logoutUser} className="nav-link">
                                <li className="nav-item active"> Cerrar sesión {user.username}</li>
                            </Link>
                        </ul>
                        :
                        <ul className="navbar-nav">
                            <Link to='/crear-sitio-turistico' className="nav-link">
                                <span className="nav-item active"> ¿Quieres publicar? </span>
                            </Link>
                            <Link to='/' onClick={logoutUser} className="nav-link">
                                <li className="nav-item active"> Cerrar sesión {user.username}</li>
                            </Link>
                        </ul>

                    :
                    <ul className="navbar-nav">
                        <Link to='/login' className="nav-link">
                            <li className="nav-item"> Iniciar sesión </li>
                        </Link>
                        <Link to='/register' className="nav-link">
                            <li className="nav-item active"> Registrarse </li>
                        </Link>
                    </ul>
                }
            </div>
        </nav >
    )
}

export default Navbar;