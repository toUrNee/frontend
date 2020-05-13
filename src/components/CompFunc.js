import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ExternalDataContext } from '../context/ExternalDataContext';

//Crea tarjeta de una publicación
function card(id, titulo, descripcion, sitio, fecha, precio) {
    var card =
        <div className="card" key={id}>
            <a href="#">
                <img className="card-img-top" src="https://picsum.photos/800/400" alt="Card image cap" />
                <div className="card-img-overlay d-flex justify-content-end">
                    <a href="#" className="card-link text-danger like">
                        {/* Corazón relleno color
                        <i className="fas fa-heart"></i>*/}
                        <i className="far fa-heart"></i>
                    </a>
                </div>
                <div className="card-img-overlay">
                    <a href="#" className="btn btn-warning btn-sm ">{'$ ' + precio}</a>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{titulo}</h2>
                    <p className="card-text">{descripcion}</p>
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
            </a>
        </div>
    return card;
}

const Publicaciones = () => {

    const { loading, publicaciones, getPublicaciones } = useContext(ExternalDataContext)
    
    useEffect(() => {
        getPublicaciones()
    }, [publicaciones])

    

    return (
        <div className="container-fluid">
            {loading ? 
                <div className="text-center">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                :
                <div className="container-fluid">
                    <div className=" text-center portada">COLOMBIA</div>
                    <div className="row">
                        <div className="col-3">
                            <img src="https://picsum.photos/800/400" className="card-img-top rounded-circle" alt="" />
                        </div>
                    </div>
                    <div className="card-columns">
                        <div>
                            {console.log(this.props)}
                        </div>
                    </div>
                </div>
}
        </div>

    );
}

export default Publicaciones;