import React, { useContext } from 'react';
import { ExternalDataContext } from '../context/ExternalDataContext'

import {
    Link
} from "react-router-dom";

<<<<<<< Updated upstream
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
                        <div key={region.nombre} className={'carousel-item'+ (region.nombre === "Región Llano"  ? " active" : "")}>
                            <img src={region.img} alt={region.nombre} className="d-block w-100" ></img>
                            <div className="carousel-caption">
                                <h1>{region.nombre}</h1>
                                <Link to={{
                                    pathname: `/publicaciones`,
                                    state: {
                                        region: { region }
                                    },
                                }}>
                                    <button type="button" className="btn ">Ver planes</button>
                                </Link>
                            </div>
=======
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
                    <button type="button" className="btn">Ver planes</button>
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
>>>>>>> Stashed changes
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