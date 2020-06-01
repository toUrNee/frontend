import React from 'react';


import {
    Link
} from "react-router-dom";

const Card = (props) => {
    return (
        <div className="card" >

            <Link to="/">
                <img className="card-img-top" src="https://picsum.photos/800/400" alt="Imagen plan" />

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
