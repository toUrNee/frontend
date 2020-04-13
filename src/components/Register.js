import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

class Register extends Component{
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
    
    handlerNombresChange = (event) =>{
        this.setState({Usuario: {...this.state.Usuario, Nombres: event.target.value}});
    }

    handlerEmailChange = (event) =>{
        this.setState({Usuario: {...this.state.Usuario, Email: event.target.value}});
    }

    handlerTelefonoChange = (event) =>{
        this.setState({Usuario: {...this.state.Usuario, Telefono: event.target.value}});
    }

    handlerNacionalidadChange = (event) =>{
        this.setState({Usuario: {...this.state.Usuario, Nacionalidad: event.target.value}});
    }

    handlerNombre_UsuarioChange = (event) =>{
        this.setState({Usuario: {...this.state.Usuario, Nombre_Usuario: event.target.value}});
    }

    handlerContrasenaChange = (event) =>{
        this.setState({Usuario: {...this.state.Usuario, Contrasena: event.target.value}});
    }

    handlerSubmit = (e) =>{
        e.preventDefault()
        axios.post('https://localhost:5001/api/Usuarios',this.state.Usuario)
        .then( response => {
            console.log(response)
        })
        .catch( error => {
            console.log(error)
        })
    }

    render(){
        return(
            <div class = "row no-gutters">
                <div class = "col-md-7 no-gutters">
                    <div class = "regleft d-flex justify-content-center">
                        <div>
                            <h1 className = "regleftTitle"> Crear cuenta </h1>
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
                                    className = "regInput2" 
                                    type = "text" 
                                    placeholder = "Correo"
                                    value = {this.state.Usuario.Email}
                                    onChange = {this.handlerEmailChange}
                                    required/>
                                    <br/>
                                    <input 
                                    className = "regInput3" 
                                    type = "text" 
                                    placeholder = "Teléfono" 
                                    //pattern="[0-9]{0,10}"
                                    value = {this.state.Usuario.Telefono}
                                    onChange = {this.handlerTelefonoChange}
                                    required/>
                                    <select 
                                    className = "regInput4" 
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
                                    className = "regInput5" 
                                    type = "text" 
                                    placeholder = "Nombre de usuario"
                                    value = {this.state.Usuario.Nombre_Usuario}
                                    onChange = {this.handlerNombre_UsuarioChange}
                                    required/>
                                    <br/>
                                    <input 
                                    className = "regInput6" 
                                    type = "password" 
                                    placeholder = "contraseña" 
                                    value = {this.state.Usuario.Contrasena}
                                    onChange = {this.handlerContrasenaChange}
                                    required/>
                                    <button className = "regleftButton" > Crear cuenta </button>
                                </form>
                        </div> 
                    </div>     
                </div>
                <div class = "col-md-5 no-gutters">
                    <div class = "regright d-flex justify-content-center">
                        <div> 
                            <h1 className = "regrightTitle"> ¡Bienvenido a Cattleya tours! </h1>
                            <h2 className = "regrightSub"> Ingresa tus datos personales </h2>
                            <Link to = '/login'>
                                <button className = "regrightButton"> Iniciar sesión </button>
                            </Link>
                        </div>          
                    </div>
                </div>
            </div>      
        )
    }
}
   

export default Register

