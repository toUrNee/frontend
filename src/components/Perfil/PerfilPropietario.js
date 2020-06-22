import React, { useContext, useEffect } from 'react';
import '../../styles/PerfilPropietario.css'
import NavPropietario from './NavPropietario';
import { AuthContext } from '../../context/AuthContext';
import perfil from '../../images/perfil.png'


const PerfilPropietario = (props) => {

    const { user, getPais, paisUsuario } = useContext(AuthContext)

    useEffect(() => {
        getPais(user)
    }, [getPais, user])

    return (
        <section id="perfil" className="perfil">
            {paisUsuario !== null ?

                <div className="container">

                    <div className="section-title">
                        <h2>Bienvenido {user.username}</h2>
                        <p>Tu perfil</p>

                    </div>
                    <NavPropietario
                        perfil="filter-active"
                        sitios=""
                        planes=""
                        reservas=""
                        intereses=""
                    />

                    <div className="col">
                        <h1 className="datos-title">Datos personales</h1>
                    </div>

                    <div className="row perfil-container justify-content-md-center">
                        <div className="col-lg-6 col-md-12">
                            <img src={perfil} alt="img perfil" style={{ width: '100%', marginBottom: '1rem' }}></img>
                        </div>

                        <div className="col-lg-6 col-md-12 datos-personales">
                            <div className="row ">
                                <h3 className="col-5">Nombre:</h3>
                                <span className="col">{user.nombres}</span>

                            </div>
                            <div className="row">
                                <h3 className="col-5">Pais: </h3>
                                <span className="col">{paisUsuario.name}
                                    <img className="rounded-circle img-fluid bandera" src={paisUsuario.flag} alt='Bandera'/>
                                </span>

                            </div>
                            <div className="row">
                                <h3 className="col-5">Correo:</h3>
                                <span className="col">{user.email}</span>
                            </div>
                            <div className="row">
                                <h3 className="col-5">Teléfono:</h3>
                                <span className="col"> {user.telefono}</span>
                            </div>



                        </div>
                    </div>
                </div>
                : null}
        </section>
    );
}

export default PerfilPropietario;
