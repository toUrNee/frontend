import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import img from '../images/register.png'
import { AuthContext } from '../context/AuthContext'
import { ExternalDataContext } from '../context/ExternalDataContext'

const Register = () => {
    
    const history = useHistory();
    
    const { registerUser, isAuthenticated } = useContext(AuthContext)
    const { paises, getPaises } = useContext(ExternalDataContext)
    const [ usuario, setUsuario ] = useState({
        Nombres: "",  
        Email: "",
        Telefono: "",
        Nacionalidad: "",
        Username: "",
        Password: "",
    })

    useEffect(()=>{
        getPaises()
    }, [getPaises])

    useEffect(()=>{
        //redirect authenticated user
        if (isAuthenticated){
            history.replace('/')
        }
    }, [isAuthenticated, history])

    const onChange = (event) => {
        setUsuario({
            ...usuario,
            [event.target.name]: event.target.value
        })
    }
    
    const onSubmit = e => {
        e.preventDefault()
        registerUser(usuario)
    } 

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
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="Nombres">Nombre completo</label>
                            <input
                                name="Nombres"
                                type="text"
                                className="form-control"
                                placeholder="Nombre completo"
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">Correo</label>
                            <input
                                name="Email"
                                className="form-control"
                                type="email"
                                placeholder="name@example.com"
                                onChange={onChange}
                                required />
                        </div>
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="Telefono">Telefono</label>
                                <input
                                    name="Telefono"
                                    className="form-control"
                                    type="text"
                                    onChange={onChange}
                                    required />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="Nacionalidad"> Nacionalidad </label>
                                <select
                                    name="Nacionalidad"
                                    type="number"
                                    className="form-control"
                                    placeholder="Nacionalidad"
                                    onChange={onChange}
                                >
                                    {paises.map(pais => (
                                        <option key={pais.alpha3Code} value={pais.alpha3Code}selected={pais.alpha3Code === 'COL'}> 
                                            {pais.name} 
                                        </option>
                                    ))}                                        
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Username">Usuario</label>
                            <input
                                name="Username"
                                className="form-control"
                                type="text"
                                placeholder="Nombre de usuario"
                                onChange={onChange}
                                required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Contraseña</label>
                            <input
                                name="Password"
                                className="form-control"
                                type="password"
                                placeholder="Contraseña"
                                onChange={onChange}
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
    )
}

export default Register

