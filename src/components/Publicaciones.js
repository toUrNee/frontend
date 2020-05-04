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
function card(id, descripcion, sitioId) {
    var card =
        <div className="col card_col" key={id}>
            <div className="card mb-4 box-shadow">
                <img className="card-img-top" src="https://picsum.photos/286/180" alt="portada publicacion" />
                <div className="card-body">
                    <h5 className="card-title">Titulo {id}</h5>
                    <p className="card-text">{descripcion}</p>
                    <a href="#" className="btn btn-primary">Sitio turistico No. {sitioId}</a>
                </div>
            </div>
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
                return card(publicacion.id, publicacion.descripcion, publicacion.sitioId)
            })
            return (
                <div className="container-fluid">
                    <div className=" text-center portada">COLOMBIA</div>
                    <div className="row">{cards}</div>
                </div>
            );
        }
    }
}

export default Publicaciones;