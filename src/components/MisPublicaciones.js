import React, { useContext, useEffect, useState } from 'react';
import '../styles/PerfilPropietario.css'
import NavPropietario from './NavPropietario';
import { PublicacionContext } from '../context/PublicacionContext';
import { AuthContext } from '../context/AuthContext'
import Card from './CardPublicacion';

const MisPublicaciones = (props) => {
    const { loading, publicaciones, getPublicacionesById } = useContext(PublicacionContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getPublicacionesById(user.id)
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <NavPropietario />
                {loading ?
                    <div className="text-center">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    :



                    <div className="card-columns">
                        <div>
                            {publicaciones.map(publicacion => (
                                <Card
                                    id={publicacion.id}
                                    titulo={publicacion.titulo}
                                    descripcion={publicacion.descripcion}
                                    precio={publicacion.precio}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default MisPublicaciones;