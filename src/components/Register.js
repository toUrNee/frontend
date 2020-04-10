import React from 'react'

const Register = () =>
    <div class = "row no-gutters">
        <div class = "col-md-7 no-gutters">
            <div class = "regleft d-flex justify-content-center">
                <div>
                    <h1 className = "regleftTitle"> Crear cuenta </h1>
                        <form className = "regform">
                            <input className = "regInput1" type = "text" placeholder = "Nombres y apellidos" required/>
                            <br/>
                            <input className = "regInput2" type = "email" placeholder = "Correo" required/>
                            <br/>
                            <input className = "regInput3" type = "tel" placeholder = "Teléfono" pattern="[0-9]{10}" required/>
                            <select className = "regInput4" placeholder = "Nacionalidad">
                                <option> Colombia </option>
                                <option> Chile </option>
                                <option> Venezuela </option>
                            </select>
                            <br/>
                            <input className = "regInput5" type = "text" placeholder = "Nombre de usuario" required/>
                            <br/>
                            <input className = "regInput6" type = "password" placeholder = "contraseña" required/>
                        </form>
                    <button className = "regleftButton" > Crear cuenta </button>
                </div> 
            </div>     
        </div>
        <div class = "col-md-5 no-gutters">
            <div class = "regright d-flex justify-content-center">
                <div> 
                    <h1 className = "regrightTitle"> ¡Bienvenido a Cattleya tours! </h1>
                    <h2 className = "regrightSub"> Ingresa tus datos personales </h2>
                    <button className = "regrightButton"> Iniciar sesión </button>
                </div>          
            </div>
        </div>
    </div>  

export default Register

