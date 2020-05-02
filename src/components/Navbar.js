import React, { useContext } from 'react';
import orquidea from '../images/orquidea.png'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'


const Navbar = () => {
    const { isAuthenticated, logoutUser } = useContext(AuthContext)

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link to="/">
                <img src={orquidea} width="30" height="30" className="d-inline-block align-top" alt="cattleya" id="logo-cattleya" />
                    Cattleya Tours
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                {isAuthenticated ?
                    <ul className="navbar-nav mr-auto">
                            <Link to='/crear-plan'>
                                <li className="nav-item active"> Publica ya! </li>
                            </Link>
                            <Link to='/' onClick={logoutUser}>
                                <li className="nav-item active"> Cerrar sesión </li>
                            </Link>
                    </ul>
                :
                    <ul className="navbar-nav mr-auto">
                        <Link to='/login'>
                            <li className="nav-item"> Iniciar sesión </li>
                        </Link>
                        <Link to='/register'>
                            <li className="nav-item active"> Registrarse </li>
                        </Link>
                    </ul>
                }
            </div>
        </nav>
    )
}

export default Navbar;