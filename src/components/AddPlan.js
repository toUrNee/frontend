import React, { Component } from 'react';
import axios from 'axios';
import img from '../images/post.png';
import { Link } from 'react-router-dom';


class AddPlan extends Component {

    state = {
        Publicacion: {
            Titulo: "",
            SitioId: null,
            Fecha: "",
            Descripcion: "",
            Precio: null,
            PropietarioId: 1 //Cambiar
        },
        Sitios_Turisticos: [],
        loading: true
    }

    handlerTituloChange = (event) => {
        this.setState({ Publicacion: { ...this.state.Publicacion, Titulo: event.target.value } });
    }

    handlerDescripcionChange = (event) => {
        this.setState({ Publicacion: { ...this.state.Publicacion, Descripcion: event.target.value } });
    }

    handlerPrecioChange = (event) => {
        this.setState({ Publicacion: { ...this.state.Publicacion, Precio: parseInt(event.target.value) } });
    }

    handlerSitioTuristicoChange = (event) => {
        this.setState({ Publicacion: { ...this.state.Publicacion, SitioId: parseInt(event.target.value) } });
    }

    handlerFechaChange = (event) => {
        this.setState({ Publicacion: { ...this.state.Publicacion, Fecha: event.target.value } });
    }

    handlerSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.Publicacion);
        axios.post('https://localhost:5001/api/Publicaciones', this.state.Publicacion)
            .then(response => {
                console.log(response)
                //this.setState({Nombre_region: response.})
            })
            .catch(error => {
                console.log(error)
            })
        //alert(`${this.state.title} ${this.state.place} ${this.state.region} ${this.state.description}`)
    }

    componentDidMount() {
        axios.get('https://localhost:5001/api/SitiosTuristicos/propietario/1')
            .then(response => {
                this.setState({ Sitios_Turisticos: response.data, loading: false })
                console.log(response)
                console.log(this.state)
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div className="container-fluid form-container ">
                <div className="row align-items-center">
                    <div className="col col-color">
                        <header>
                            <h1 className="titulo-form-color">Publicar un plan</h1>
                            <img className="img-fluid mx-auto d-block img-form" src={img} />
                        </header>
                    </div>
                    <div className="col col-form ">
                        <h1 className="titulo-form">Ingresa los datos del plan</h1>
                        <form onSubmit={this.handlerSubmit}>
                            <div className="form-group">
                                <label htmlFor="inputTitulo">Titulo</label>
                                <input
                                    id="inputTitulo"
                                    className="form-control"
                                    type="text"
                                    value={this.state.Publicacion.Titulo}
                                    onChange={this.handlerTituloChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputFecha">Fecha</label>
                                <input
                                    id="inputFecha"
                                    className="form-control"
                                    type="datetime-local"//revisar esto porque aca debe ser date
                                    value={this.state.Publicacion.Fecha}
                                    onChange={this.handlerFechaChange} //revisar esto porque tampoco debe ser asi
                                />
                            </div>
                            {
                                this.state.loading ? <div></div> :
                                    <div className="form-group">
                                        <label htmlFor="inputSitio">Sitio Turistico</label>
                                        <select
                                            id="inputSitio"
                                            className="form-control"
                                            type="number"
                                            value={this.state.Publicacion.SitioId}
                                            onChange={this.handlerSitioTuristicoChange}
                                        >
                                            <option>Seleccione una opcion</option>
                                            {this.state.Sitios_Turisticos.map(sitio => <option value={sitio.id} key={sitio.id}>{sitio.nombre} </option>)}
                                        </select>
                                    </div>
                            }
                            <div className="form-group">
                                <label htmlFor="inputDescripcion">Descripción</label>
                                <textarea
                                    id="inputDescripcion"
                                    className="form-control"
                                    rows="3"
                                    value={this.state.Publicacion.Descripcion}
                                    onChange={this.handlerDescripcionChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPrecio">Precio</label>
                                <input
                                    id="inputPrecio"
                                    className="form-control"
                                    type="number"
                                    value={this.state.Publicacion.Precio}
                                    onChange={this.handlerPrecioChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-form">Submit</button>
                            <p className="form-link">
                                ¿No encuentras un sitio turistico?
                                {/*
                                <Link to ="/register">
                                    Crear.
                                </Link>
                                */}
                            </p>
                        </form>
                    </div>
                </div>


                {/*
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="col no-gutters d-flex justify-content-center">
                            <div className="addleft">
                                <h1 className="leftText">Publicar un plan</h1>
                                <img className="img-fluid mx-auto d-block img-form" src={img} />
                            </div>
                        </div>
                        <div className="col no-gutters">
                            <div className="addright">
                                <form className="reg-form" onSubmit={this.handlerSubmit}>
                                    <div>
                                        <label className="reg_label_titulo">Título</label>
                                        <input className="reg_form_titulo"
                                            type="text"
                                            value={this.state.Publicacion.Titulo}
                                            onChange={this.handlerTituloChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="reg_label_fecha">Fecha</label>
                                        <input className="reg_form_fecha"
                                            type="datetime-local"//revisar esto porque aca debe ser date
                                            value={this.state.Publicacion.Fecha}
                                            onChange={this.handlerFechaChange} //revisar esto porque tampoco debe ser asi
                                        />
                                    </div>
                                    {this.state.loading ? <div></div> : <div>
                                        <label className="reg_label_sitio_turistico">Sitio Turistico</label>
                                        <select
                                            type="number"
                                            value={this.state.Publicacion.SitioId}
                                            onChange={this.handlerSitioTuristicoChange}
                                        >
                                            <option>Seleccione una opcion</option>
                                            {this.state.Sitios_Turisticos.map(sitio => <option value={sitio.id} key={sitio.id}>{sitio.nombre} </option>)}
                                        </select>
                                    </div>}
                                    <div>
                                        <label className="reg_label_descripcion">Descripción</label>
                                        <textarea
                                            value={this.state.Publicacion.Descripcion}
                                            onChange={this.handlerDescripcionChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="reg_label_precio">Precio</label>
                                        <input className="reg_form_precio"
                                            type="number"
                                            value={this.state.Publicacion.Precio}
                                            onChange={this.handlerPrecioChange}
                                        />
                                    </div>
                                    <div>
                                        <button className="reg_button" type="submit">Publicar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>*/
                }
            </div>


        )
    }
}


export default AddPlan