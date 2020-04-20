import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import img from '../images/register.png';

class Register extends Component {
    state = {
        Usuario: {
            Nombres: "",
            Email: "",
            Telefono: "",
            Nacionalidad: "Colombia",
            Nombre_Usuario: "",
            Contrasena: "",
        }
    }

    handlerNombresChange = (event) => {
        this.setState({ Usuario: { ...this.state.Usuario, Nombres: event.target.value } });
    }

    handlerEmailChange = (event) => {
        this.setState({ Usuario: { ...this.state.Usuario, Email: event.target.value } });
    }

    handlerTelefonoChange = (event) => {
        this.setState({ Usuario: { ...this.state.Usuario, Telefono: event.target.value } });
    }

    handlerNacionalidadChange = (event) => {
        this.setState({ Usuario: { ...this.state.Usuario, Nacionalidad: event.target.value } });
    }

    handlerNombre_UsuarioChange = (event) => {
        this.setState({ Usuario: { ...this.state.Usuario, Nombre_Usuario: event.target.value } });
    }

    handlerContrasenaChange = (event) => {
        this.setState({ Usuario: { ...this.state.Usuario, Contrasena: event.target.value } });
    }

    handlerSubmit = (e) => {
        e.preventDefault()
        axios.post('https://localhost:5001/api/Usuarios', this.state.Usuario)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="container-fluid form-container ">
                <div className="row align-items-center">
                    {/* Columna de color con imagen */}
                    <div className="col col-color">
                        <header>
                            <h1 className="titulo-form-color">¡Bienvenido a Cattleya tours!</h1>
                            <img className="img-fluid mx-auto d-block img-form" src={img} alt="register" />
                        </header>
                    </div>
                    {/* Columna de formulario */}
                    <div className="col col-form ">
                        <h1 className="titulo-form">Crear cuenta</h1>
                        <form onSubmit={this.handlerSubmit}>
                            <div className="form-group">
                                <label htmlFor="inputNombre">Nombre completo</label>
                                <input
                                    id="inputNombre"
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre completo"
                                    value={this.state.Usuario.Nombres}
                                    onChange={this.handlerNombresChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCorreo">Correo</label>
                                <input
                                    id="inputCorreo"
                                    className="form-control"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={this.state.Usuario.Email}
                                    onChange={this.handlerEmailChange}
                                    required />
                            </div>
                            <div className="row">
                                <div className="form-group col-6">
                                    <label htmlFor="inputTelefono">Telefono</label>
                                    <input
                                        id="inputTelefono"
                                        className="form-control"
                                        type="text"
                                        //pattern="[0-9]{0,10}"
                                        value={this.state.Usuario.Telefono}
                                        onChange={this.handlerTelefonoChange}
                                        required />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="inputPais">Nacionalidad</label>
                                    <select
                                        id="inputPais"
                                        className="form-control"
                                        placeholder="Nacionalidad"
                                        value={this.state.Usuario.Nacionalidad}
                                        onChange={this.handlerNacionalidadChange}
                                    >
                                        <option value="Colombia"> Colombia </option>
                                        <option value="Chile"> Chile </option>
                                        <option value="Brasil"> Brasil </option>
                                        <option value="Venezuela"> Venezuela </option>

                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputUsuario">Usuario</label>
                                <input
                                    id="inputUsuario"
                                    className="form-control"
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    value={this.state.Usuario.Nombre_Usuario}
                                    onChange={this.handlerNombre_UsuarioChange}
                                    required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputContraseña">Contraseña</label>
                                <input
                                    id="inputContraseña"
                                    className="form-control"
                                    type="password"
                                    placeholder="Contraseña"
                                    value={this.state.Usuario.Contrasena}
                                    onChange={this.handlerContrasenaChange}
                                    required />
                            </div>
                            <button type="submit" className="btn btn-form">Submit</button>
                            <p className="form-link">
                                ¿Tienes cuenta?
                                <Link to="/login">
                                    Inicia sesión
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            /*<div className="container-fluid">
            <div class = "row no-gutters">
                <div class = "col no-gutters d-flex justify-content-center">
                    <div class = "right">
                        
                            <h1 className = ""> Crear cuenta </h1>
                                <form onSubmit = {this.handlerSubmit}>
                                    <input 
                                    className = "regInput1" 
                                    type = "text" 
                                    placeholder = "Nombres y apellidos" 
                                    value = {this.state.Usuario.Nombres}
                                    onChange = {this.handlerNombresChange}
                                    required
                                    />
                                    <br/>
                                    <input 
                                    className = "rightInput2" 
                                    type = "text" 
                                    placeholder = "Correo"
                                    value = {this.state.Usuario.Email}
                                    onChange = {this.handlerEmailChange}
                                    required/>
                                    <br/>
                                    <input 
                                    className = "rightInput2" 
                                    type = "text" 
                                    placeholder = "Teléfono" 
                                    //pattern="[0-9]{0,10}"
                                    value = {this.state.Usuario.Telefono}
                                    onChange = {this.handlerTelefonoChange}
                                    required/>
                                    <select 
                                    className = "rightInput2" 
                                    type = "text"
                                    placeholder = "Nacionalidad"
                                    value = {this.state.Usuario.Nacionalidad}
                                    onChange = {this.handlerNacionalidadChange}
                                    >
                                        <option value = "Colombia"> Colombia </option>
                                        <option value = "Chile"> Chile </option>
                                        <option value = "Brasil"> Brasil </option>
                                        <option value = "Venezuela"> Venezuela </option>

                                    </select>
                                    <br/>
                                    <input 
                                    className = "rightInput2" 
                                    type = "text" 
                                    placeholder = "Nombre de usuario"
                                    value = {this.state.Usuario.Nombre_Usuario}
                                    onChange = {this.handlerNombre_UsuarioChange}
                                    required/>
                                    <br/>
                                    <input 
                                    className = "rightInput2" 
                                    type = "password" 
                                    placeholder = "contraseña" 
                                    value = {this.state.Usuario.Contrasena}
                                    onChange = {this.handlerContrasenaChange}
                                    required/>
                                    <button className = "rightButton" > Crear cuenta </button>
                                </form>
                        
                    </div>     
                </div>
                <div class = "col no-gutters">
                    <div class = "left ">
                        <div> 
                            <h1 className = "regleftTitle"> ¡Bienvenido a Cattleya tours! </h1>
                            <h2 className = "leftSub"> Ingresa tus datos personales </h2>
                            <Link to = '/login'>
                                <button className = "leftButton"> Iniciar sesión </button>
                            </Link>
                        </div>          
                    </div>
                </div>
            </div>  
            </div>    */
        )
    }
}


export default Register

