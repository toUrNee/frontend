import React, { useContext } from 'react';
import { ExternalDataContext } from '../context/ExternalDataContext'

import {
    Link
} from "react-router-dom";

const Carousel = () => {

    const { regiones } = useContext(ExternalDataContext)

    return (
        <div className="row">
            <div id="regiones_slider" className="carousel slide" data-ride="carousel">
                <ul className="carousel-indicators">
                    <li data-target="#regiones_slider" data-slide-to="0" className="active"></li>
                    <li data-target="#regiones_slider" data-slide-to="1"></li>
                    <li data-target="#regiones_slider" data-slide-to="2"></li>
                    <li data-target="#regiones_slider" data-slide-to="3"></li>
                    <li data-target="#regiones_slider" data-slide-to="4"></li>
                    <li data-target="#regiones_slider" data-slide-to="5"></li>
                </ul>
                {/*Crea el carrusel con los slides de las regiones*/}
                <div className="carousel-inner" id="regiones-slide">
                    {regiones.map(region => (
                        <div key={region.nombre} className={'carousel-item' + (region.nombre === "Región Llano" ? " active" : "")}>
                            <img src={region.img} alt={region.nombre} className="d-block w-100" ></img>
                            <div className="carousel-caption">
                                <h1>{region.nombre}</h1>
                                <Link to={{
                                    pathname: `/publicaciones/${region.nombre}`,
                                    state: {
                                        img:region.img
                                    }
                                }}>
                                    <button type="button" className="btn ">Ver planes</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href="#regiones_slider" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </a>
                <a className="carousel-control-next" href="#regiones_slider" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </a>
            </div>
        </div>
    )
}

export default Carousel;