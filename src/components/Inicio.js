import React, { Component } from 'react';
import mapa from '../images/mapa.png';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';

const Inicio = () => {
    return (
        <div className="container-fluid">
            <div className="text-center titulo-inicial"> Cattleya Tours </div>
            {/*Mapa para ver todas las publicaciones*/}

            <div className="row imagenpro justify-content-center">
                <Link className="mapa" to="/publicaciones">
                    <img className="img-fluid mx-auto d-block " src={mapa} alt="Mapa Colombia" width="460" height="345"></img>
                </Link>
            </div>

            {/*Carrusel de todas las regiones en la base de datos*/}
            <Carousel />
        </div>
    );
}

export default Inicio;
