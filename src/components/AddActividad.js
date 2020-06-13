import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"


const AddActividad = ({ prevStep, publicacion, actividades, success, warning, nextStep, step, actividadesPublicacion, setActividadesPublicacion }) => {
    
    const history = useHistory()

    const [actividad, setActividad] = useState({
        Nombre: "",
        TipoActividadId: 0,
        PublicacionId: publicacion.Id
    })

    const handlerSubmit = (e) => {
        e.preventDefault()
        if((step > 1 && step < 7) && actividadesPublicacion.length < 6){
            axios.post(process.env.REACT_APP_BACK_URL + '/Actividades', actividad)
                .then((res) => {
                    console.log(res)    
                })
                .catch((err) =>{
                    console.log(err)
                })
            var aux = actividadesPublicacion
            aux.push(actividad)
            setActividadesPublicacion([...aux])   
            refresh()
            nextStep()
        }else{
            warning("No se pueden añadir más de 5 actividades")
            return
        }  
    }

    useEffect(() =>{
        //traer todas las actividadesPublicacion
    }, [actividadesPublicacion])

    const refresh = () => {
        setActividad({
            Nombre: "",
            TipoActividadId: 0,
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

    return (
        <div className="col col-form">
            <header>
                <h1> Selecciona tus actividades </h1>
            </header>
            <form method="post">
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre</label>
                    <input
                        name="Nombre"
                        className="form-control"
                        type="text"
                        autoFocus
                        required
                        value={actividad.Nombre}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="TipoActividadId">Tipo de Actividad</label>
                    <select
                        name="TipoActividadId"
                        className="form-control"
                        type="number"
                        onChange={onChange}
                        required
                        value={actividad.TipoActividadId}
                    >
                        <option>Seleccione un tipo de actividad</option>
                        {actividades.map(categoria =>
                            <option
                                value={categoria.id}
                                key={categoria.nombre}
                            >
                                {categoria.nombre}
                            </option>)}
                    </select>
                </div>
            </form>
            <button className="btn btn-form-blue" onClick={prevStep}>Atras</button>
            <button className="btn btn-form-blue" onClick={handlerSubmit}>Añade otra actividad</button>
            <button className="btn btn-form-blue" onClick={confirmSubmit}>Confirmar</button>
        </div>
    );
}

export default AddActividad