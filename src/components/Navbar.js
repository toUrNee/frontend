import React, { Component } from 'react';
import orquidea from '../images/orquidea.png'
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light sticky-top">
                <Link to ="/">
                
                    <img src={orquidea} width="30" height="30" className="d-inline-block align-top" alt="cattleya" id="logo-cattleya"/>
                        CATTLEYA TOURS
                
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <Link to = '/login'>
                        <li className="nav-item">
                            Iniciar sesión 
                        </li>
                        </Link>
                        <Link to = '/register'>
                        <li className="nav-item active">
                            Registrarse 
                        </li>
                        </Link>
                        <Link to = '/crear-plan'>
                        <li className="nav-item active">
                            Publica ya!
                        </li>
                        </Link>
                    </ul>

                </div>
            </nav>
        );
    }
}

export default Navbar;