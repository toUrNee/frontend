import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';



const Publicaciones = () => {

    const { loading, publicaciones, getPublicaciones } = useContext(PublicacionContext)
    
    useEffect(() => {
        getPublicaciones()
    }, [])

    return (
        <div className="container-fluid">
            {loading ? 
                <div className="text-center">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className="container-fluid">
                    <div className=" text-center portada">Colombia</div>
                    <div className="row">
                        <div className="col-3">
                            <img src="https://picsum.photos/800/400" className="card-img-top rounded-circle" alt="" />
                        </div>
                    </div>
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
                </div>
}
        </div>

    );
}

export default Publicaciones;