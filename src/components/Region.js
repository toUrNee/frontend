import React, { Component } from 'react';
import img from '../images/publicacion.jpg'

//Crea tarjeta de una publicación
function card(id, descripcion, sitioId) {
    var card =
        <div className="col card_col" key={id}>
            <div className="card mb-4 box-shadow">
                <img className="card-img-top" src={img} alt="portada publicacion" />
                <div className="card-body">
                    <h5 className="card-title">Titulo {id}</h5>
                    <p className="card-text">{descripcion}</p>
                    <a className="btn">Sitio turistico No. {sitioId}</a>
                </div>
            </div>
        </div>
    return card;
}

class Region extends Component {

    state = {
        loading: true,
        cartas: []
    }

    //Trae las publicaciones de la region correspondiente al id
    async componentDidMount() {
        let region_id = this.props.location.state.region_id.id
        const base_url = 'https://localhost:5001/api'
        const response = await fetch(base_url + '/Publicaciones/region/' + region_id)
        const data = await response.json()
        this.setState({ loading: false, cartas: data })
    }

    render() {
        if (this.state.loading) {
            return (
                <h1> Cargando... </h1>
            )
        } else {
            //Crea las tarjetas con las publicaciones
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

export default Region;