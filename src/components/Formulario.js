import React, { Component } from 'react';
import img from '../images/login.png';
import { Link } from 'react-router-dom';

class Formulario extends Component {
    render() {
        return (
            <div className="container-fluid form-container ">
                <div className="row align-items-center">
                    <div className="col col-color">
                        <header>
                            <h1 className="titulo-form-color">TITULO FORMULARIO</h1>
                            <img className="img-fluid mx-auto d-block img-form" src={img} alt="imagen formulario" />
                        </header>
                    </div>
                    <div className="col col-form ">
                        <h1 className="titulo-form">TITULO FORMULARIO</h1>
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Usuario o correo</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-form">Submit</button>
                            <p className="form-link">
                                ¿Nuevo usuario?
                                <Link to="/register">
                                    Registrate
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Formulario;