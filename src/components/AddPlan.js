import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import img from '../images/post.png';
import { useHistory, Link } from "react-router-dom";
import { store } from 'react-notifications-component';
import { AuthContext } from '../context/AuthContext';
import { SitioContext } from '../context/SitioContext';

const AddPlan = () => {
    const history = useHistory();
    const { user } = useContext(AuthContext)
    const { sitios, getSitiosById } = useContext(SitioContext)


    const [publicacion, setPublicacion] = useState({
        Titulo: "",
        SitioId: null,
        Fecha: "",
        Descripcion: "",
        Precio: null,
        PropietarioId: null
    })

    const onChange = (event) => {
        if (event.target.type === "number" || event.target.type === "select-one") {
            setPublicacion({
                ...publicacion,
                [event.target.name]: parseInt(event.target.value)
            })

        } else {
            setPublicacion({
                ...publicacion,
                [event.target.name]: event.target.value
            })
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        axios.post(process.env.REACT_APP_BACK_URL + '/Publicaciones', publicacion)
            .then(response => {
                store.addNotification({
                    title: "Perfecto!",
                    message: "Tu publicación fue creada exitosamente",
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
            })
            .catch(error => {
                console.log(error)
                store.addNotification({
                    title: "Ups!",
                    message: "Tu publicación no ha podido ser creada",
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
        publicacion.PropietarioId = parseInt(user.id) 
    }, [publicacion, user])

    useEffect(() => {
        getSitiosById(publicacion.PropietarioId)
    }, [getSitiosById, publicacion])


    return (
        <div className="container-fluid form-container ">
            <div className="row align-items-center">
                {/* Columna de color con imagen */}
                <div className="col col-color-yellow">
                    <header>
                        <h1 className="titulo-form-color">Publicar un plan</h1>
                        <img className="img-fluid mx-auto d-block img-form" src={img} alt="post" />
                    </header>
                </div>
                {/* Columna de formulario */}
                <div className="col col-form ">
                    <h1 className="titulo-form-blue">Ingresa los datos del plan</h1>
                    <form onSubmit={handlerSubmit}>
                        <div className="form-group">
                            <label htmlFor="Titulo">Titulo</label>
                            <input
                                name="Titulo"
                                className="form-control"
                                type="text"
                                onChange={onChange}
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Fecha">Fecha</label>
                            <input
                                name="Fecha"
                                className="form-control"
                                type="datetime-local"
                                min="2020-05-03T00:00"
                                onChange={onChange} //revisar esto porque tampoco debe ser asi
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Descripcion">Descripción</label>
                            <textarea
                                name="Descripcion"
                                className="form-control"
                                rows="3"
                                onChange={onChange}
                            />
                        </div>
                        <div className="row">
                            <div className="form-group col">
                                <label htmlFor="SitioId">Sitio Turistico</label>
                                <select
                                    name="SitioId"
                                    className="form-control"
                                    type="number"
                                    onChange={onChange}
                                >
                                    <option>Seleccione</option>
                                    {sitios.map(sitio =>
                                        <option
                                            value={sitio.id} key={sitio.id}>
                                            {sitio.nombre}
                                        </option>)}
                                </select>
                                <p className="form-link ">
                                ¿No encuentras un sitio turistico?{" "}
                                {
                                    <Link to="/crear-sitio-turistico">
                                        Crear sitio turistico
                            </Link>
                                }
                            </p>
                            </div>
                            
                            <div className="form-group col">
                                <label htmlFor="Precio">Precio</label>
                                <input
                                    name="Precio"
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        

                        <div className="row justify-content-center">
                            <button type="submit" className="btn btn-form-blue col-6">
                                Publicar
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}


export default AddPlan