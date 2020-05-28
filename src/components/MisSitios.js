import React, { useContext, useEffect, useRef } from 'react';
import { SitioContext } from '../context/SitioContext';
import { AuthContext } from '../context/AuthContext'
import '../styles/PerfilPropietario.css'
import CardSitio from './CardSitio';
import NavPropietario from './NavPropietario';

const MisSitios = (props) => {

    const { sitios, loading, getSitiosById } = useContext(SitioContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getSitiosById(user.id)
    }, [])

    return (
        <section id="mis-sitios" className="perfil">
            <div className="container">

                <div className="section-title" >
                    <h2>Edita o elimina</h2>
                    <p>Sitios turisticos</p>
                </div>
                <NavPropietario
                    perfil=""
                    sitios="filter-active"
                    planes=""
                />
                {loading ?
                    <div className="text-center">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    :
                    <div className="row perfil-container">
                        {sitios.map(sitio => (
                            <CardSitio
                                id={sitio.id}
                                nombre={sitio.nombre}
                                descripcion={sitio.descripcion}
                            />
                        ))}

                    </div>
                }

            </div>
        </section>
    );
}

export default MisSitios;