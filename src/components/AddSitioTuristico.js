import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { AuthContext } from '../context/AuthContext';
import { ExternalDataContext } from '../context/ExternalDataContext';


const AddSitioTuristico = ({nextStep , getidSitio}) => {

    const { user } = useContext(AuthContext)
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
        if(event.target.type == "number"){
            setSitio({
                ...sitio,
                [event.target.name]: parseInt(event.target.value)
            })
        }else{
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
                message: "Tu sitio turistico fue creado exitosamente",
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
            GetLastIdSitio(response.data.id)
            Continue()
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

    const GetLastIdSitio = (x) => {
        getidSitio(x)
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


    const Continue = (e) => {
        nextStep()
    }
    
    return (
    <div className="col col-form ">
        {/*
        -------------------------------------------PARA VANESSA------------------------------------------------------
        {<img src={process.env.REACT_APP_BACK_URL + "/Archivo_SitioTuristico/134"} width="80" height="140" alt=""/>}   
        */}
        <h1 className="titulo-form">Ingrese los datos del sitio turistico</h1>
        <form method="post" encType="multipart/form-data">
            <div className="form-group">
                <label htmlFor="Nombre">Nombre</label>
                <input 
                    name="Nombre" 
                    className="form-control" 
                    type="text" 
                    onChange={onChange}
                    autoFocus
                />
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
            <div className="form-group">
                <label htmlFor="Capacidad">Capacidad</label>
                <input 
                    name="Capacidad"
                    className="form-control"
                    type="number"
                    min = "1"
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
        <button className="btn btn-form" onClick={handlerSubmit}>Siguiente</button>
        </form>
    </div>
    )
}

export default AddSitioTuristico