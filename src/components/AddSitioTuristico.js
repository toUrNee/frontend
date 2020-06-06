import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { store } from 'react-notifications-component';
import { AuthContext } from '../context/AuthContext';
import { ExternalDataContext } from '../context/ExternalDataContext';


const AddSitioTuristico = ({nextStep , getidSitio}) => {

    const location = useLocation();
    const { user, cambiarRol } = useContext(AuthContext)
    const { regiones, departamentos, municipios, getDepartamentos, getMunicipios } = useContext(ExternalDataContext)

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

    const success = (message, id) => {
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
        getidSitio(id)
        nextStep()
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
        if (location.state && location.state.sitio) {
            var id = location.state.sitio
            axios.put(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos/' + id, sitio)
                .then(() => {
                    success("Tu sitio turistico fue actualizado exitosamente", id)
                })
                .catch(err => {
                    console.log(err);
                    error("Ocurrio un error y no se pudo actualizar el sitio turistico")
                })

        } else {
            axios.post(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos', sitio)
                .then((response) => {
                    success("Tu sitio turistico fue creado exitosamente", response.data.id)
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

    useEffect(() => {
        sitio.PropietarioId = parseInt(user.id)
    }, [sitio, user])

    useEffect(() => {
        if (location.state && location.state.sitio) {
            axios.get(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos/'+location.state.sitio)
            .then(res =>{
                setSitio({
                    Id: res.data.id,
                    Nombre: res.data.nombre,
                    Descripcion: res.data.descripcion,
                    Capacidad: res.data.capacidad,
                    Region: res.data.region,
                    Municipio: res.data.municipio,
                    Departamento: res.data.departamento,
                    PropietarioId: res.data.propietarioId,
                })
            })
            .catch( error =>{
                console.log(error)
            })
        }else{
            setSitio({
                Nombre: "",
                Descripcion: "",
                Capacidad: 1,
                Region: "",
                Municipio: "",
                Departamento: "",
                PropietarioId: user.Id
            })
        }
    }, [location.state, user])


    
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
                    value = {sitio.Nombre}
                    autoFocus
                />
            </div>
            <div className="form-group">
                <label htmlFor="Descripcion">Descripcion</label>
                <textarea 
                    name="Descripcion"
                    className="form-control"
                    type="text"
                    value = {sitio.Descripcion}
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
                    value = {sitio.Region}
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
                    value = {sitio.Departamento}
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
                    value = {sitio.Municipio}
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
                    min = "1"
                    value = {sitio.Capacidad}
                    onChange={onChange}
                />
            </div>
            
        <button className="btn btn-form-blue" onClick={handlerSubmit}>Siguiente</button>
        </form>
    </div>
    )
}

export default AddSitioTuristico