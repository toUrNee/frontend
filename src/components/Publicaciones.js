import React, { Component } from 'react';
/*
{ useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { AuthContext } from '../context/AuthContext'


const Publicaciones = () => {
    const [publicacion, setpublicacion] = useState({
        cartas: [],
    })
}
*/
//Crea tarjeta de una publicación
function card(id, titulo, descripcion, sitio, fecha, precio) {
    var card =
        <div className="card" key={id}>
            <a href="#">
                <img className="card-img-top" src="https://picsum.photos/800/400" alt="Card image cap" />
                <div class="card-img-overlay d-flex justify-content-end">
                    <a href="#" class="card-link text-danger like">
                        {/* Corazón relleno color
                        <i class="fas fa-heart"></i>*/}
                        <i class="far fa-heart"></i>
                    </a>
                </div>
                <div class="card-img-overlay">
                    <a href="#" class="btn btn-warning btn-sm ">{'$ ' + precio}</a>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{titulo}</h2>
                    <p className="card-text">{descripcion}</p>
                </div>
                <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                    {/*<div className="date">
                        <i class="far fa-calendar-alt"></i>{fecha}

                    </div>*/}
                    <div class="stats">
                        <i class="far fa-comment text-primary"></i> 13
                    <i class="fas fa-star text-warning"></i> 4.5
                    </div>
                </div>
            </a>
        </div>
    return card;
}

class Publicaciones extends Component {

    state = {
        loading: true,
        cartas: []
    }

    //Trae todas las publicaciones
    async componentDidMount() {
        const url = 'https://localhost:5001/api'
        const response = await fetch(url + '/Publicaciones')
        const data = await response.json()
        this.setState({ loading: false, cartas: data })
    }

    render() {
        if (this.state.loading) {
            return (
                <h1> Cargando... </h1>
            )
        } else {
            //Crea las tarjetas con las publicacioness
            const cards = this.state.cartas.map((publicacion) => {
                console.log(Date(publicacion.fecha))
                return card(publicacion.id, publicacion.titulo.toUpperCase(), publicacion.descripcion, publicacion.sitio, Date(publicacion.fecha), publicacion.precio)
            })
            return (
                <div className="container-fluid">
                    <div className=" text-center portada">COLOMBIA</div>

                    <div className="card-columns">

                        <div>{cards}</div>

                    </div>
                </div>
            );
        }
    }
}

export default Publicaciones;