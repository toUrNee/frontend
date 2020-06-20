import React, { useState, useEffect } from 'react';
import default_src from '../images/crear-sitio-tur.png';
import { Link } from "react-router-dom";
import axios from 'axios'
import NumberFormat from 'react-number-format';

const CardPublicacion = (props) => {

    const [image, setImage] = useState({ src: "", hash: Date.now() })
    const [interesados, setInteresados] = useState([])

    useEffect(() => {
        setImage({ src: process.env.REACT_APP_BACK_URL + "/Archivo_SitioTuristico/sitio/" + props.publicacion.sitioId + "/random", hash: Date.now() })
    }, [props.publicacion.sitioId])

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Interes/publicacion/' + props.publicacion.id)
            .then(res => {
                setInteresados(res.data)
            })
            .catch(err => {
                console.log(err);
                setInteresados([])
            })
    }, [props.publicacion.id])

    return (
        <div className="card" >
            <Link to={'/publicacion/' + props.publicacion.id}>
                <img
                    src={image.src + "?" + image.hash}
                    alt="Imagen plan"
                    className="card-img-top"
                    onError={() => setImage({ src: default_src, hash: Date.now() })}
                />


                <div className="card-img-overlay">
                    <p to="/" className="btn btn-warning btn-sm ">
                        <NumberFormat value={props.publicacion.precio} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </p>

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

                        <i className={actividad.tipoActividad.icono} key={actividad.id}></i>
                    ))}
                    <div className="stats">
                        <i className="far fa-comment text-primary"></i> 13
                    <i className="fas fa-heart text-danger"></i> {interesados.length} interesados

                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CardPublicacion;
