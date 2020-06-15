import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"


const AddActividad = ({ prevStep, publicacion, actividades, success, warning, error, nextStep, actividadesPublicacion, setActividadesPublicacion }) => {
    
    const history = useHistory()

    const [actividad, setActividad] = useState({
        Nombre: "",
        TipoActividadId: 1,
        PublicacionId: publicacion.Id
    })
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones/actividades/' + publicacion.Id)
            .then(res => {
                var temp = res.data[0].actividades
                setActividadesPublicacion(temp)
            })
            .catch(err => {
                console.log(err)
                error("Error cargando iconos")
            })
    },[])
    
    const handlerSubmit = (e) => {
        e.preventDefault()
        if(actividadesPublicacion.length < 5){
            axios.post(process.env.REACT_APP_BACK_URL + '/Actividades', actividad)
                .then(() => {
                    axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones/actividades/' + publicacion.Id)
                        .then(res => {
                            var temp = res.data[0].actividades
                            setActividadesPublicacion(temp)
                        })
                        .catch(err => {
                            console.log(err)
                            error("Error cargando iconos")
                        })
                    refresh()    
                    success("Actividad añadida correctamente")
                    nextStep()
                })
                .catch((err) =>{
                    console.log(err)
                })
        }else{
            warning("No se pueden añadir más de 5 actividades")
            return
        }  
    }

    const refresh = () => {
        setActividad({
            Nombre: "",
            TipoActividadId: 1,
            PublicacionId: publicacion.Id
        })
    }

    const confirmSubmit = () => {
        success("¡Actividades agregadas correctamente!")
        history.push('/perfil/publicaciones')
    }

    const onChange = (event) => {
        if (event.target.type === "text") {
            setActividad({
                ...actividad,
                [event.target.name]: event.target.value
            })
        } else {
            setActividad({
                ...actividad,
                [event.target.name]: parseInt(event.target.value)
            })
        }
    }

    const borrarActividad = (i) => {
        var x = actividadesPublicacion[i].id
        axios.delete(process.env.REACT_APP_BACK_URL + '/Actividades/' + x)
            .then(() => {
                var aux = actividadesPublicacion
                aux.splice(i, 1)
                setActividadesPublicacion([...aux])
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="col col-form">
            <header>
                <h1> ¿Qué actividades incluye este plan? 
                    <button type="button" className="btn btn btn-warning" data-toggle="modal" data-target="#exampleModalLong" style={{ opacity: "50%", margin:"5px" }}> ? </button>
                </h1>
                {/* Modal de Bootstrap*/}
                    <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Actividades</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {actividades.map((actividad, index) => (
                                        <div className="row" style={{ margin: "5px" }} key={actividad.id}>
                                            <h5 className="col">{actividad.nombre}</h5>
                                            <p className="col" style={{ color: 'black', fontSize: "13px", textAlign: "justify" }}>{actividad.descripcion}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </header>
                <p>
                    Crea las diferentes actividades que se pueden hacer 
                    en este plan y clasifícalas en nuestras categorias (Máximo 5)
                </p>
                <div className="card" style={{width: "18rem"}}>
                    <ul className="list-group list-group-flush">       
                        {actividadesPublicacion.map((actividad, index) => (
                            <li className="list-group-item" key={index}><i className={actividad.tipoActividad.icono} style={{ opacity: "50%", margin:"-14px", marginRight:"8px", padding: "5px" }}></i>
                                {actividad.nombre}
                                <button onClick={() => borrarActividad(index)} className="btn btn-danger" style={{float: "right"}}>
                                    <span className="text-right"><i className="fas fa-trash"></i></span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            <form onSubmit={handlerSubmit}>
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre</label>
                    <input
                        name="Nombre"
                        className="form-control"
                        type="text"
                        value={actividad.Nombre}
                        onChange={onChange}
                        required
                        autoFocus
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="TipoActividadId">Tipo de Actividad</label>
                    
                    <select
                        name="TipoActividadId"
                        className="form-control"
                        type="number"
                        onChange={onChange}
                        value={actividad.TipoActividadId}
                        placeholder="Seleccione un tipo de actividad"
                        required
                    >
                        {actividades.map(categoria => (
                            <option
                                value={categoria.id}
                                key={categoria.nombre}
                                selected={categoria.id === 1}
                            >
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-form-blue" onClick={prevStep}>Atras</button>
                <button className="btn btn-form-blue" type="submit" disabled={actividadesPublicacion.length===5}>Añade otra actividad</button>
                <button className="btn btn-form-blue" onClick={confirmSubmit}>Confirmar</button>
            </form>
        </div>
    );
}

export default AddActividad