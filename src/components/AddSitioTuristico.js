import React, { useContext, useEffect } from 'react';
import { ExternalDataContext } from '../context/ExternalDataContext';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


const AddSitioTuristico = ({ nextStep, sitio, setSitio, success, error, edit }) => {

    const { user, cambiarRol } = useContext(AuthContext)
    const { regiones, departamentos, municipios, getDepartamentos, getMunicipios } = useContext(ExternalDataContext)

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
        if (edit) {
            axios.put(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos/' + sitio.Id, sitio)
                .then(() => {
                    success("Tu sitio turistico fue actualizado exitosamente")
                    nextStep()
                })
                .catch(err => {
                    console.log(err);
                    error("Ocurrio un error y no se pudo actualizar el sitio turistico")
                })

        } else {
            axios.post(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos', sitio)
                .then((response) => {
                    success("Tu sitio turistico fue creado exitosamente", response.data.id)
                    setSitio({
                        ...sitio,
                        Id: response.data.id
                    })
                    nextStep()
                    cambiarRol(user)
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

    return (
        <div className="col col-form ">
            <h1 className="titulo-form-blue">Ingresa los datos del sitio</h1>
            <form method="post" encType="multipart/form-data">

                <div className="form-group">
                    <label htmlFor="Nombre">Nombre</label>
                    <input
                        name="Nombre"
                        className="form-control"
                        type="text"
                        onChange={onChange}
                        value={sitio.Nombre}
                        autoFocus
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Descripcion">Descripcion</label>
                    <textarea
                        name="Descripcion"
                        className="form-control"
                        type="text"
                        value={sitio.Descripcion}
                        onChange={onChange}
                    />
                </div>
                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="Region">Region</label>
                        <select
                            name="Region"
                            className="form-control"
                            type="text"
                            value={sitio.Region}
                            onChange={onChange}
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
                    <div className="form-group col">
                        <label htmlFor="Departamento">Departamento</label>
                        <select
                            name="Departamento"
                            className="form-control"
                            type="text"
                            value={sitio.Departamento}
                            onChange={onChange}
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
                    <div className="form-group col">
                        <label htmlFor="Municipio">Municipio</label>
                        <select
                            name="Municipio"
                            className="form-control"
                            type="text"
                            value={sitio.Municipio}
                            onChange={onChange}
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

                <button className="btn btn-form-blue" onClick={handlerSubmit}>Siguiente</button>
            </form>
        </div>
    )
}

export default AddSitioTuristico