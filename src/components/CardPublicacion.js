import React, { useState, useEffect } from 'react';
import default_src from '../images/crear-sitio-tur.png';
import {
    Link
} from "react-router-dom";

const Card = (props) => {

    const [image, setImage] = useState({ src: "", hash: Date.now() })

    useEffect(() => {
        setImage({ src: process.env.REACT_APP_BACK_URL + "/Archivo_SitioTuristico/sitio/" + props.publicacion.sitioId + "/random", hash: Date.now() })
    }, [props.publicacion.sitioId])

    return (
        <div className="card" >

            <Link to="/">
                <img
                    src={image.src + "?" + image.hash}
                    alt="Imagen plan"
                    className="card-img-top"
                    onError={() => setImage({ src: default_src, hash: Date.now() })}
                />

                <div className="card-img-overlay d-flex justify-content-end">
                    <p to="/" className="card-link text-danger like">
                        {/* Corazón relleno color
                        <i className="fas fa-heart"></i>*/}
                        <i className="far fa-heart"></i>
                    </p>
                </div>
                <div className="card-img-overlay">
                    <p to="/" className="btn btn-warning btn-sm ">{'$ ' + props.publicacion.precio}</p>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{props.publicacion.titulo}</h2>
                    <p className="card-text">{props.publicacion.descripcion}</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                    {/*<div className="date">
                        <i className="far fa-calendar-alt"></i>{fecha}

                    </div>*/}
                    {props.publicacion.actividades.map(actividad => (

                        <i className={actividad.tipoActividad.icono}></i>
                    ))}
                    <div className="stats">
                        <i className="far fa-comment text-primary"></i> 13
                    <i className="fas fa-star text-warning"></i> 4.5

                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Card;
