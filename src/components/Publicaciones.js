import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';



const Publicaciones = (props) => {

    const { loading, publicaciones, getPublicaciones, getPublicacionesByRegion } = useContext(PublicacionContext)

    useEffect(() => {
        getPublicaciones()
    }, [])

    const [region, setRegion] = useState({
        nombre: props.region.region,
        img: props.region.img,
    })

    useEffect(() => {
        if(props.location.state){
        setRegion({
            nombre: props.location.state.region,
            img: props.location.state.img
        })
        console.log("region")}
    }, [props.location.state])

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

                    <div className=" text-center portada" style={{ backgroundImage: `url(${region.img})` }}>{region.nombre}</div>
                    <div class="row testimonials">
                        <div class="col-lg-4">
                            <div class="testimonial-item mx-auto mb-5 mb-lg-0">
                                <img class="img-fluid rounded-circle mb-3" src={region.img} alt="" />
                            </div>
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