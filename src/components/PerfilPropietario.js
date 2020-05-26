import React, { useContext } from 'react';
import '../styles/PerfilPropietario.css'
import NavPropietario from './NavPropietario';
import { AuthContext } from '../context/AuthContext';


const PerfilPropietario = (props) => {

    const { user } = useContext(AuthContext)

    return (
        <section id="portfolio" className="portfolio">
            <div className="container">

                <div className="section-title" data-aos="fade-up">
                    <h2>Bienvenido {user.nombres}</h2>
                    <p>Perfil</p>
                </div>
                <NavPropietario
                    perfil="filter-active"
                    sitios=""
                    planes=""
                />

            </div>
        </section>
    );
}

export default PerfilPropietario;
