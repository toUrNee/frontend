import React, { Component } from 'react';
import mapa from '../images/mapa.png';
import col from '../images/colombia.jpg';
import Carousel from './Carousel';
import Region from './Region';

class Inicio extends Component {
    render() {
        return (
            <div className="container">
                <div className="row imagenpro">
                    <img className="img-fluid mx-auto d-block" src={mapa} alt="Chania" width="460" height="345"></img>
                </div>
                <Carousel />
                <Region titulo="REGION AMAZONAS" />

            </div>
        );
    }
}

export default Inicio;