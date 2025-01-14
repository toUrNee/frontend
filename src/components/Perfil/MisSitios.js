import React, { useContext, useEffect } from 'react';
import { SitioContext } from '../../context/SitioContext';
import { AuthContext } from '../../context/AuthContext'
import '../../styles/PerfilPropietario.css'
import CardSitio from './CardSitio';
import NavPropietario from './NavPropietario';
import { Link } from 'react-router-dom';

const MisSitios = (props) => {

    const { sitios, loading, getSitiosById } = useContext(SitioContext)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getSitiosById(user.username)
    }, [getSitiosById, user])
    
    return (
        <section id="mis-sitios" className="perfil">
            <div className="container">

                <div className="section-title" >
                    <h2>Edita o elimina</h2>
                    <p>Sitios turísticos</p>
                </div>
                <NavPropietario
                    perfil=""
                    sitios="filter-active"
                    planes=""
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
                        {sitios.length === 0 ?
                            <div className="row justify-content-center">
                                <p className="col-12">Eliminaste todos los sitios.</p>
                                <Link type="button" className="btn btn-success" to='/crear-sitio-turistico'> <i className="fas fa-plus-circle"></i> Agregar sitio </Link>
                            </div>
                            :
                            sitios.map((sitio, index) => (
                                <CardSitio
                                    key={sitio.id}
                                    id={sitio.id}
                                    sitio={sitio}
                                    index={index}
                                    sitioId={sitio.id}
                                />
                            ))
                        }
                    </div>
                }

            </div>
        </section>
    );
}

export default MisSitios;