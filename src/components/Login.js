import React from 'react'
import {Link} from 'react-router-dom'

const Login = () =>
    <div class = "row no-gutters">
        <div class = "col-md-5 no-gutters">
            <div class = "left d-flex justify-content-center">
                <div> 
                    <h1 className = "leftTitle"> ¡Bienvenido a Cattleya tours! </h1>
                    <h2 className = "leftSub"> Inicia sesión para continuar</h2>
                    <Link to = '/register'>
                        <button className = "leftButton"> Crear cuenta</button>
                    </Link>
                </div>
            </div>     
        </div>
        <div class = "col-md-7 no-gutters">
            <div class = "right d-flex justify-content-center">
                <div>
                    <h1 className = "rightTitle"> Iniciar sesión </h1>
                        <form>
                            <input className = "rightInput1" type = "text" placeholder = "Usuario o correo" />
                            <br/>
                            <input className = "rightInput2" type = "password" placeholder = "Contraseña" />
                        </form>
                    <button className = "rightButton" > Ingresar </button>
                    <h2 className = "rightHint">¿Has olvidado la contraseña?</h2>
                </div>           
            </div>
        </div>
    </div>  

export default Login 