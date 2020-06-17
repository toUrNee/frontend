import React, { useContext, useEffect, useState } from 'react'
import img from '../images/login.png';
import { Link, useHistory, useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'
import { store } from 'react-notifications-component';

const Login = () => {
    
    const history = useHistory();
    const location = useLocation();

    const { loginUser, isAuthenticated } = useContext(AuthContext)
    const [ credenciales, setCredenciales ] = useState({
        Email: "",
        Password: "",
        Propietario: "",
    })

    useEffect(()=>{
        if (location.state){
            store.addNotification({
                title: "Debes iniciar sesion",
                message: "Debes estar autenticado para poder acceder a " + location.state.from.pathname,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeInDown"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: false,
                }
            });
        }

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
                        <h1 className="titulo-form-color">¡Bienvenido a Cattleya tours!</h1>
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
                                name="Email"
                                className="form-control" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter email" 
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                name="Password"
                                className="form-control" 
                                placeholder="Password" 
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