import React, { useContext, useEffect, useState } from 'react'
import img from '../../images/login.png';
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
    
    const history = useHistory();
    const location = useLocation();

    const { loginUser, isAuthenticated } = useContext(AuthContext)
    const [ credenciales, setCredenciales ] = useState({
        email: "",
        password: "",
    })

    useEffect(()=>{
        let { from } = location.state || { from: { pathname: "/" } };
        //redirect authenticated user
        if (isAuthenticated){
            history.replace(from)
        }
    }, [isAuthenticated, history, location.state])

    const onChange = (event) => {
        setCredenciales({
            ...credenciales,
            [event.target.name]: event.target.value
        })
    }
    
    const onSubmit = e => {
        e.preventDefault()
        loginUser(credenciales)
    } 
    
    return (
        <div className="container-fluid form-container ">
            <div className="row align-items-center">
                {/* Columna de color con imagen */}
                <div className="col col-color">
                    <header>
                        <h1 className="titulo-form-color">¡Bienvenido a Cattleya Tours!</h1>
                        <img className="img-fluid mx-auto d-block img-form" src={img} alt="login" />
                    </header>
                </div>
                {/* Columna de formulario */}
                <div className="col col-form ">
                    <h1 className="titulo-form">Iniciar sesión</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Correo</label>
                            <input type="email" 
                                name="email"
                                className="form-control" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter email" 
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                name="password"
                                className="form-control" 
                                placeholder="Enter Password" 
                                onChange={onChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-form">Iniciar sesión</button>
                        <p className="form-link">
                            ¿Nuevo usuario?{" "}
                            <Link to="/register">
                                Registrate
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;