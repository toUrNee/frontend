import React, { Component } from 'react';

function card(id, descripcion, sitioId) {
    var card =
    <div className="col card_col" key={id}>
        <div className="card mb-4 box-shadow">
            <img className="card-img-top" src="https://picsum.photos/286/180" alt="Card image cap" />
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
            const cards = this.state.cartas.map((publicacion) => {
                return card(publicacion.id, publicacion.descripcion, publicacion.sitioId)
            })
            return (
                <div className="container-fluid">
                    <div className=" text-center portada">
                        COLOMBIA
                </div>
                    <div className="row">{cards}</div>
                    

                </div>

            );
        }
    }
}

export default Publicaciones;