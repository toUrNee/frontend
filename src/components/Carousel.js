import React, { Component } from 'react';
import amazonas from '../images/amazonas.jpg'
import andina from '../images/andina.jpg'
import caribe from '../images/caribe.jpg'
import orinoquia from '../images/orinoquia.jpg'
import pacifico from '../images/pacifico.jpg'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


function slide(region, img, clase) {
    var slide =
        <div className={clase}>
            <img src={img} alt={img} ></img>
            <div className="carousel-caption">
                <h1>{region}</h1>
                <Link to ={`/publicaciones/${region}`}>
                <button type="button" className="btn ">Ver planes</button>                
                </Link>
                
            </div>
        </div>

        return slide;
}

class Carousel extends Component {
    render() {
        return (
            <div className="row">
                <div id="demo" className="carousel slide" data-ride="carousel">
                    <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" className="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                        <li data-target="#demo" data-slide-to="3"></li>
                        <li data-target="#demo" data-slide-to="4"></li>

                    </ul>
                    <div className="carousel-inner" id="regiones-slide">


                        {slide("Amazonas", amazonas, "carousel-item active")}
                        {slide("Andina", andina, "carousel-item ")}
                        {slide("Caribe", caribe, "carousel-item ")}
                        {slide("Orinoquia", orinoquia, "carousel-item ")}
                        {slide("Pacifico", pacifico, "carousel-item ")}


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

export default Carousel;