import React, { Component } from 'react';
import mapa from '../images/mapa.png';
import Carousel from './Carousel';
import { Link } from 'react-router-dom';
import Post from './Post';

class Inicio extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="text-center titulo-inicial"> Cattleya Tours </div>
                {/*Mapa para ver todas las publicaciones*/}

                <div className="row imagenpro justify-content-center">
                    <Link to="/publicaciones" className="mapa">
                        <img className="img-fluid mx-auto d-block " src={mapa} alt="Mapa Colombia" width="460" height="345"></img>
                    </Link>
                </div>

                {/*Carrusel de todas las regiones en la base de datos*/}
                <Carousel />
            </div>
        );
    }
}

export default Inicio;