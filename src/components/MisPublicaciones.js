import React, { useContext, useEffect } from 'react';
import '../styles/PerfilPropietario.css'
import NavPropietario from './NavPropietario';
import { PublicacionContext } from '../context/PublicacionContext';
import { AuthContext } from '../context/AuthContext'
import '../styles/PerfilPropietario.css'
import CardSitio from './CardSitio';

const MisPublicaciones = (props) => {
    const { loading, publicaciones, getPublicacionesById } = useContext(PublicacionContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getPublicacionesById(user.id)
    }, [getPublicacionesById, user])

    return (
        <section id="mis-planes" className="perfil">
            <div className="container">

                <div className="section-title">
                    <h2>Edita o elimina</h2>
                    <p>Publicaciones</p>
                </div>
                <NavPropietario
                    perfil=""
                    sitios=""
                    planes="filter-active"
                />
                {loading ?
                    <div className="text-center">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    :
                    <div className="row perfil-container">
                        {/*publicaciones.map(sitio => (
                            <CardSitio
                                id={sitio.id}
                                nombre={sitio.titulo}
                                descripcion={sitio.descripcion}
                                key={sitio.id}
                            />
                        ))*/}

                    </div>
                }

            </div>
        </section>

    );
}

export default MisPublicaciones;