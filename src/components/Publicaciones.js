import React, { Component } from 'react';

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
                    <div className="date">
                        <i class="far fa-calendar-alt"></i>{fecha}

                    </div>
                    <div class="stats">
                        <i class="far fa-comment text-primary"></i> 13
                    <i class="fas fa-star text-warning"></i> 4.5
                    </div>
                </div>
            </a>
        </div>
    /*<div className="col card_col" key={id}>
        <div className="card mb-4 box-shadow">
            <img className="card-img-top" src="https://picsum.photos/286/180" alt="portada publicacion" />
            <div className="card-body">
                <h5 className="card-title">Titulo {id}</h5>
                <p className="card-text">{descripcion}</p>
                <a href="#" className="btn btn-primary">Sitio turistico No. {sitioId}</a>
            </div>
        </div>
    </div>*/
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