import React, { Component } from 'react';
import mapa from '../images/mapa.png';
import col from '../images/colombia.jpg';
import Carousel from './Carousel';
import Region from './Region';
import { Link } from 'react-router-dom';

class Inicio extends Component {
    render() {
        return (
            <div className="container-fluid">

                <Link to="/publicaciones">
                    <div className="row imagenpro">
                        <img className="img-fluid mx-auto d-block" src={mapa} alt="Mapa Colombia" width="460" height="345"></img>
                    </div>
                </Link>
                <Carousel />
            </div>
        );
    }
}

export default Inicio;