import React, { useContext, useEffect } from 'react';
import '../../styles/PerfilPropietario.css'
import NavPropietario from './NavPropietario';
import { PublicacionContext } from '../../context/PublicacionContext';
import { AuthContext } from '../../context/AuthContext'
import '../../styles/PerfilPropietario.css'
import CardSitio from './CardSitio';
import { Link } from 'react-router-dom';

const MisPublicaciones = (props) => {

    const { loading, publicaciones, getPublicacionesByPropietarioId } = useContext(PublicacionContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getPublicacionesByPropietarioId(user.id)
    }, [getPublicacionesByPropietarioId, user])

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
                    reservas=""
                    intereses=""
                />
                {loading ?
                    <div className="text-center">
                        <div className="spinner-grow" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                    :
                    <div className="row perfil-container">
                        {publicaciones.length === 0 ?
                            <div className="row justify-content-center">
                                <p className="col-12">No tienes planes disponibles.</p>
                                <Link type="button" className="btn btn-success" to='/crear-plan'> <i className="fas fa-plus-circle"></i> Crear publicación </Link>
                            </div>
                            :
                            publicaciones.map((publicacion, index) => (
                                <CardSitio
                                    id={publicacion.id}
                                    nombre={publicacion.titulo}
                                    descripcion={publicacion.descripcion}
                                    index={index}
                                    sitioId={publicacion.sitioId}
                                    key={publicacion.id}
                                />
                            ))}
                    </div>
                }

            </div>
        </section>

    );
}

export default MisPublicaciones;