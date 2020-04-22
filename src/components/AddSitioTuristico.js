import React, { Component } from 'react';
import axios from 'axios';

class AddSitioTuristico extends Component {

    state = {
        SitioTuristico: {
            Nombre: "",
            Descripcion: "",
            Capacidad: null,
            RegionId: null,
            PropietarioId: 1 //Modificar esto con la autenticacion para que haga referencia al usuario activo
        },
        Regiones: [],
        loading: true
    }

    handlerNombreChange = (event) => {
        this.setState({ SitioTuristico: { ...this.state.SitioTuristico, Nombre: event.target.value}});
    }

    handlerDescripcionChange = (event) => {
        this.setState({ SitioTuristico: { ...this.state.SitioTuristico, Descripcion: event.target.value}});
    }

    handlerCapacidadChange = (event) => {
        this.setState({ SitioTuristico: { ...this.state.SitioTuristico, Capacidad: parseInt(event.target.value)}});
    }

    handlerRegionIdChange = (event) => {
        this.setState({ SitioTuristico: { ...this.state.SitioTuristico, RegionId: parseInt(event.target.value)}});
    }

    handlerSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.SitioTuristico);
        axios.post('https://localhost:5001/api/SitiosTuristicos', this.state.SitioTuristico)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
            alert(`${this.state.Nombre}`)
                console.log(error)
            })
    }
    
    componentDidMount() {
        axios.get('https://localhost:5001/api/Regiones')
            .then(response => {
                this.setState({ Regiones: response.data, loading: false })
                console.log(response)
                console.log(this.state)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <div className="container-fluid form-container ">
                <div className="row align-items-center">
                    <div className="col col-color">
                        <header>
                            <h1 className="titulo-form-color">Crear Sitio Turistico</h1>
                            {/*<img className="img-fluid mx-auto d-block img-form" src={img} alt="imagen formulario" />*/}
                        </header>
                    </div>
                    <div className="col col-form ">
                        <h1 className="titulo-form">Ingrese los datos del sitio turistico</h1>
                        <form onSubmit={this.handlerSubmit}>
                            <div className="form-group">
                                <label htmlFor="inputNombre">Nombre</label>
                                <input 
                                    id="inputNombre" 
                                    className="form-control" 
                                    type="text" 
                                    value={this.state.SitioTuristico.Nombre}
                                    onChange={this.handlerNombreChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputDescripcion">Descripcion</label>
                                <input 
                                    id="inputDescripcion"
                                    className="form-control"
                                    type="text"
                                    value={this.state.SitioTuristico.Descripcion}
                                    onChange={this.handlerDescripcionChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputCapacidad">Capacidad</label>
                                <input 
                                    id="inputCapacidad"
                                    className="form-control"
                                    type="number"
                                    value={this.state.SitioTuristico.Capacidad}
                                    onChange={this.handlerCapacidadChange}
                                />
                            </div>
                            {
                                this.state.loading ? <div></div> :
                                    <div className="form-group">      
                                        <label htmlFor="inputRegionId">Region</label>
                                        <select 
                                            id="inputRegionId"
                                            className="form-control"
                                            type="number"
                                            value={this.state.SitioTuristico.RegionId}
                                            onChange={this.handlerRegionIdChange}
                                        >
                                            <option>Seleccione una opcion</option>
                                            {this.state.Regiones.map(region =>
                                                <option
                                                value={region.id} key={region.id}>
                                                {region.nombre}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                            }
                            <button type="submit" className="btn btn-form">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddSitioTuristico