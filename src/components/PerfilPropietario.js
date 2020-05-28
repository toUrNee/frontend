import React, { useContext } from 'react';
import '../styles/PerfilPropietario.css'
import NavPropietario from './NavPropietario';
import { AuthContext } from '../context/AuthContext';


const PerfilPropietario = (props) => {

    const { user } = useContext(AuthContext)

    return (
        <section id="perfil" className="perfil">
            <div className="container">

                <div className="section-title">
                    <h2>Bienvenido {user.nombres}</h2>
                    <p>Tu perfil</p>
                </div>
                <NavPropietario
                    perfil="filter-active"
                    sitios=""
                    planes=""
                />

                <div className="row perfil-container">
                    <div className="col icon">
                    <i class="fas fa-user-circle"></i>
                    <h1>{user.nombres} ({user.username})</h1>
                    <h2>{user.nacionalidad}</h2>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}

export default PerfilPropietario;
