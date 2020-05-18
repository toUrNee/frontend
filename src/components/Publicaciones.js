import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';



const Publicaciones = (props) => {

    const { loading, publicaciones, getPublicaciones } = useContext(PublicacionContext)


    useEffect(() => {
        getPublicaciones()
        console.log(props)
    }, [])

    return (
        <div className="container-fluid">
            {loading ?
                <div className="text-center">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
                :
                <div className="container-fluid">
                    {/*
                    <div className=" text-center portada" style={{ backgroundImage: `url(${props.location.state.region.img})` }}>{props.location.state.region.nombre}</div>
                    <div class="row testimonials">
                        <div class="col-lg-4">
                            <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                                <img class="img-fluid rounded-circle mb-3" src={props.location.state.region.img} alt="" />
                            </div>
                        </div>
                    </div>*/}
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