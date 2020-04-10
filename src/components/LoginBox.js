import React from 'react'

const LoginBox = () =>
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

export default LoginBox