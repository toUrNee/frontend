import React, { Component } from 'react';
import orquidea from '../images/orquidea.png'
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light sticky-top">
                <Link to ="/">
                <a className="navbar-brand" href="#">
                    <img src={orquidea} width="30" height="30" className="d-inline-block align-top" alt="cattleya" id="logo-cattleya">
                    </img>
                        CATTLEYA TOURS
                </a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#regiones-slide">Regiones </a>
                        </li>

                    </ul>

                </div>
            </nav>
        );
    }
}

export default Navbar;