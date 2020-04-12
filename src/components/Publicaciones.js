import React, { Component } from 'react';

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

        console.log(data)
    }

    render() {
        if (this.state.loading) {
            console.log("Cargando...")
            return (
                <h1> Cargando... </h1>
            )
        } else {
            console.log("CARGADO")
            return (
                <div className="container-fluid">
                    <div className=" text-center portada">
                        COLOMBIA
                </div>
                    <div className="card">
                        <img className="card-img-top" src="https://picsum.photos/286/180" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>


                </div>

            );
        }
    }
}

export default Publicaciones;