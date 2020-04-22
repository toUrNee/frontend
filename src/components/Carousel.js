import React, { Component } from 'react';
import amazonas from '../images/amazonas.jpg'
import andina from '../images/andina.jpg'
import caribe from '../images/caribe.jpg'
import orinoquia from '../images/orinoquia.jpg'
import pacifico from '../images/pacifico.jpg'

import {
    Link
} from "react-router-dom";

//Crear slide de una region
function slide(id, region, img, clase) {
    var slide =
        <div key={id} className={clase}>
            <img src={img} alt={img} className="d-block w-100" ></img>
            <div className="carousel-caption">
                <h1>{region}</h1>
                {/* Redirecciona con respecto al id de la region */}
                <Link to={{
                    pathname: `/publicaciones/${region}`,
                    state: {
                        region_id: { id }
                    }
                }}>
                    <button type="button" className="btn ">Ver planes</button>
                </Link>

            </div>
        </div>
    return slide;
}

class Carousel extends Component {

    state = {
        loading: true,
        regiones: []
    };

    //Trae las regiones de la base de datos
    async componentDidMount() {
        const base_url = 'https://localhost:5001/api'
        const response = await fetch(base_url + '/Regiones')
        const data = await response.json()
        this.setState({ loading: false, regiones: data })
    }

    render() {
        if (this.state.loading) {
            return (<div>Cargando ...</div>)
        } else {
            //Asigna imagenes y crea los slides
            const panels = this.state.regiones.map((region) => {
                let img = null
                let clase = 'carousel-item'
                switch (region.nombre) {
                    case "Amazonas": img = amazonas; clase = clase.concat(' active'); break;
                    case "Orinoquia": img = orinoquia; break;
                    case "Andina": img = andina; break;
                    case "Caribe": img = caribe; break;
                    case "Pacifico": img = pacifico; break;
                }
                return slide(region.id, region.nombre, img, clase)
            })
            return (
                /*Carrusel de Bootstrap*/
                <div className="row">
                    <div id="demo" className="carousel slide" data-ride="carousel">
                        <ul className="carousel-indicators">
                            <li data-target="#demo" data-slide-to="0" className="active"></li>
                            <li data-target="#demo" data-slide-to="1"></li>
                            <li data-target="#demo" data-slide-to="2"></li>
                            <li data-target="#demo" data-slide-to="3"></li>
                            <li data-target="#demo" data-slide-to="4"></li>
                        </ul>
                        {/*Crea el carrusel con los slides de las regiones*/}
                        <div className="carousel-inner" id="regiones-slide">
                            {panels}
                        </div>
                        <a className="carousel-control-prev" href="#demo" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="carousel-control-next" href="#demo" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
                    </div>
                </div>
            );
        }
    }
}

export default Carousel;