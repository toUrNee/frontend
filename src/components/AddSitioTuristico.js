import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import img from '../images/crear-sitio-tur.png';
import { useHistory } from "react-router-dom";
import { store } from 'react-notifications-component';
import { AuthContext } from '../context/AuthContext';
import { ExternalDataContext } from '../context/ExternalDataContext';


const AddSitioTuristico = () => {

    const history = useHistory();
    const { user, crearSitio } = useContext(AuthContext)
    const { regiones, departamentos, municipios, getDepartamentos, getMunicipios } = useContext(ExternalDataContext)

    const [sitio, setSitio] = useState({
        Nombre: "",
        Descripcion: "",
        Capacidad: null,
        Region: "",
        Municipio: "",
        Departamento: "",
        PropietarioId: null
    })

    const onChange = (event) => {
        if (event.target.type === "number") {
            setSitio({
                ...sitio,
                [event.target.name]: parseInt(event.target.value)
            })
        } else {
            setSitio({
                ...sitio,
                [event.target.name]: event.target.value
            })
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos', sitio)
            .then(response => {
                store.addNotification({
                    title: "Perfecto!",
                    message: "Tu sitio turistico " + response.data.nombre + " fue creado exitosamente",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeInDown"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: false
                    }
                });
                history.push('/')
                user.rolId = 1
                console.log(user)
                crearSitio(user)
            })
            .catch(error => {
                console.log(error);
                store.addNotification({
                    title: "Ups!",
                    message: "Tu sitio turistico no ha podido ser creado",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeInDown"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: false
                    }
                });
            })
    }

    useEffect(() => {
        getMunicipios(sitio.Departamento)
    }, [getMunicipios, sitio.Departamento])

    useEffect(() => {
        getDepartamentos(sitio.Region)
    }, [getDepartamentos, sitio.Region])

    useEffect(() => {
        sitio.PropietarioId = parseInt(user.id)
    }, [])

    return (
        <div className="container-fluid form-container ">
            <div className="row align-items-center">
                {/* Columna de color con imagen */}
                <div className="col col-color-yellow">
                    <header>
                        <h1 className="titulo-form-color">Crear Sitio Turistico</h1>
                        {<img className="img-fluid mx-auto d-block img-form" src={img} alt="cool airplane" />}
                    </header>
                </div>
                {/* Columna de formulario */}
                <div className="col col-form ">
                    <h1 className="titulo-form-blue">Ingrese los datos del sitio turistico</h1>
                    <form onSubmit={handlerSubmit}>
                        <div className="row">
                            <div className="form-group col-6">
                                <label htmlFor="Nombre">Nombre</label>
                                <input
                                    name="Nombre"
                                    className="form-control"
                                    type="text"
                                    onChange={onChange}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="Capacidad">Capacidad</label>
                                <input
                                    name="Capacidad"
                                    className="form-control"
                                    type="number"
                                    min="1"
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group col">
                                <label htmlFor="Region">Region</label>
                                <select
                                    name="Region"
                                    className="form-control"
                                    type="text"
                                    onChange={onChange}
                                >
                                    <option></option>
                                    {regiones.map(region =>
                                        <option
                                            value={region.nombre} key={region.nombre}>
                                            {region.nombre}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group col">
                                <label htmlFor="Departamento">Departamento</label>
                                <select
                                    name="Departamento"
                                    className="form-control"
                                    type="text"
                                    onChange={onChange}
                                >
                                    <option></option>
                                    {departamentos.map(departamento =>
                                        <option
                                            value={departamento.departamento} key={departamento.departamento}>
                                            {departamento.departamento}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <div className="form-group col">
                                <label htmlFor="Municipio">Municipio</label>
                                <select
                                    name="Municipio"
                                    className="form-control"
                                    type="text"
                                    onChange={onChange}
                                >
                                    <option></option>
                                    {municipios.map(municipio =>
                                        <option
                                            value={municipio.municipio} key={municipio.municipio}>
                                            {municipio.municipio}
                                        </option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Descripcion">Descripcion</label>
                            <input
                                name="Descripcion"
                                className="form-control"
                                type="text"
                                onChange={onChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-form-blue">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSitioTuristico