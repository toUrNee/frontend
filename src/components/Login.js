import React from 'react'
import { Link } from 'react-router-dom'

const Login = () =>
    <div className="container-fluid">
        <div className="row no-gutters">
            <div className="col no-gutters d-flex justify-content-center">
                <div className="left">
                    <h1 className="leftTitle"> ¡Bienvenido a Cattleya tours! </h1>
                    <h2 className="leftSub"> Inicia sesión para continuar</h2>
                    <Link to='/register'>
                        <button className="leftButton"> Crear cuenta</button>
                    </Link>
                </div>
            </div>
            <div className="col no-gutters">
                <div className="right">
                    <form>
                        <div className="form-rows">
                            <div className="col-12">
                                <input className="rightInput1" ltype="text" placeholder="Usuario o correo" />
                            </div>
                            <div className="col-12">
                                <input className="rightInput2" type="password" placeholder="Contraseña" />
                            </div>
                        </div>
                    </form>
                    <button className="rightButton" > Ingresar </button>
                    <p className="rightHint">¿Has olvidado la contraseña?</p>
                </div>
            </div>
        </div>
    </div>

export default Login 
