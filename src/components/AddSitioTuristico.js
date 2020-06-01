import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import img from '../images/crear-sitio-tur.png';
import { useHistory, useLocation } from "react-router-dom";
import { store } from 'react-notifications-component';
import { AuthContext } from '../context/AuthContext';
import { SitioContext } from '../context/SitioContext';
import { ExternalDataContext } from '../context/ExternalDataContext';


const AddSitioTuristico = () => {

    const history = useHistory();
    const location = useLocation();
    const { user, crearSitio } = useContext(AuthContext)
    const { regiones, departamentos, municipios, getDepartamentos, getMunicipios } = useContext(ExternalDataContext)
    const { sitios } = useContext(SitioContext)

    const [sitio, setSitio] = useState({
        Nombre: "",
        Descripcion: "",
        Capacidad: 1,
        Region: "",
        Municipio: "",
        Departamento: "",
        PropietarioId: user.Id
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

    const success = (message) => {
        store.addNotification({
            title: "Perfecto!",
            message: message,
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
        history.push('/perfil/sitios')
    }

    const error = (message) => {
        store.addNotification({
            title: "Oops!",
            message: message,
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
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        if (location.state) {
            var id = location.state.sitio
            axios.put(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos/' + id, sitio)
                .then(() => {
                    success("Tu sitio turistico fue actualizado exitosamente")
                })
                .catch(err => {
                    console.log(err);
                    error("Ocurrio un error y no se pudo actualizar el sitio turistico")
                })
        } else {
            axios.post(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos', sitio)
                .then(() => {
                    success("Tu sitio turistico fue creado exitosamente")
                })
                .catch(err => {
                    console.log(err);
                    error("Ocurrio un error y no se pudo crear el sitio turistico")
                })
        }
    }

    useEffect(() => {
        getMunicipios(sitio.Departamento)
    }, [getMunicipios, sitio.Departamento])

    useEffect(() => {
        getDepartamentos(sitio.Region)
    }, [getDepartamentos, sitio.Region])

    useEffect(() => {
        sitio.PropietarioId = parseInt(user.id)
    }, [sitio, user])

    useEffect(() => {
        if (location.state) {
            var index = location.state.index
            setSitio({
                Id: sitios[index].id,
                Nombre: sitios[index].nombre,
                Descripcion: sitios[index].descripcion,
                Capacidad: sitios[index].capacidad,
                Region: sitios[index].region,
                Municipio: sitios[index].municipio,
                Departamento: sitios[index].departamento,
                PropietarioId: sitios[index].propietarioId,
            })

        }
    }, [location.state, sitios])

    return (
        <div className="container-fluid form-container ">
            <div className="row align-items-center">
                {/* Columna de color con imagen */}
                <div className="col col-color-yellow">
                    <header>
                        <h1 className="titulo-form-color">{location.state ? "Actualizar":"Crear"} Sitio Turistico</h1>
                        {<img className="img-fluid mx-auto d-block img-form" src={img} alt="cool airplane" />}
                    </header>
                </div>
                {/* Columna de formulario */}
                <div className="col col-form ">
                    <h1 className="titulo-form-blue">Ingrese los datos del sitio turistico</h1>
                    <form onSubmit={handlerSubmit}>
                        <div className="form-group">
                            <label htmlFor="Nombre">Nombre</label>
                            <input
                                name="Nombre"
                                className="form-control"
                                type="text"
                                onChange={onChange}
                                autoFocus
                                value={sitio.Nombre}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Descripcion">Descripcion</label>
                            <input
                                name="Descripcion"
                                className="form-control"
                                type="text"
                                value={sitio.Descripcion}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Capacidad">Capacidad</label>
                            <input
                                name="Capacidad"
                                className="form-control"
                                type="number"
                                min="1"
                                value={sitio.Capacidad}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Region">Region</label>
                            <select
                                name="Region"
                                className="form-control"
                                type="text"
                                onChange={onChange}
                                value={sitio.Region}
                                disabled={location.state}
                            >
                                <option>Seleccione una opcion</option>
                                {regiones.map(region =>
                                    <option
                                        value={region.nombre} key={region.nombre}>
                                        {region.nombre}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Departamento">Departamento</label>
                            <select
                                name="Departamento"
                                className="form-control"
                                type="text"
                                onChange={onChange}
                                value={sitio.Departamento}
                                disabled={location.state}
                            >
                                <option>Seleccione una opcion</option>
                                {departamentos.map(departamento =>
                                    <option
                                        value={departamento.departamento} key={departamento.departamento}>
                                        {departamento.departamento}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Municipio">Municipio</label>
                            <select
                                name="Municipio"
                                className="form-control"
                                type="text"
                                onChange={onChange}
                                value={sitio.Municipio}
                                disabled={location.state}
                            >
                                <option>Seleccione una opcion</option>
                                {municipios.map(municipio =>
                                    <option
                                        value={municipio.municipio} key={municipio.municipio}>
                                        {municipio.municipio}
                                    </option>
                                )}
                            </select>

                        </div>
                        <button type="submit" className="btn btn-form" onClick={crearSitio}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddSitioTuristico