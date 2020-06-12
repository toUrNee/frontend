import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { store } from 'react-notifications-component';
import { AuthContext } from '../context/AuthContext';
import { SitioContext } from '../context/SitioContext';


const AddPlan = ({ nextStep, getidPublicacion }) => {

    const location = useLocation();
    const { user } = useContext(AuthContext)
    const { sitios, getSitiosById } = useContext(SitioContext)

    const [publicacion, setPublicacion] = useState({
        Titulo: "",
        SitioId: 0,
        Fecha: "",
        Descripcion: "",
        Precio: 0,
        PropietarioId: user.Id
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
        getidPublicacion(id)
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
        if (location.state && location.state.publicacion) {
            var id = location.state.publicacion
            axios.put(process.env.REACT_APP_BACK_URL + '/Publicaciones/' + id, publicacion)
                .then(() => {
                    success("Tu publicación fue actualizada con éxito", id)
                })
                .catch(err => {
                    console.log(err);
                    error("Ha ocurrido un error y tu publicación no ha podido ser actualizada")
                })
        } else {
            axios.post(process.env.REACT_APP_BACK_URL + '/Publicaciones/', publicacion)
                .then((res) => {
                    success("Tu publicación fue creada con éxito", res.data.id)
                })
                .catch(err => {
                    console.log(err);
                    error("Tu publicación no se ha podido crear debido a un error");
                })
        }
    }

    useEffect(() => {
        publicacion.PropietarioId = parseInt(user.id)
    }, [publicacion, user])

    useEffect(() => {
        getSitiosById(publicacion.PropietarioId)
    }, [getSitiosById, publicacion.PropietarioId])

    useEffect(() => {
        if (location.state && location.state.publicacion) {
            axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones/' + location.state.publicacion)
                .then(res => {
                    console.log(res.data)
                    setPublicacion({
                        Id: res.data.id,
                        Fecha: res.data.fecha,
                        Titulo: res.data.titulo,
                        Descripcion: res.data.descripcion,
                        PropietarioId: res.data.propietarioId,
                        Precio: res.data.precio,
                        SitioId: res.data.sitioId,
                    })
                })
                .catch(error => {
                    console.log(error);
                    error("Hubo un problema la traer la publicación")
                })
        } else {
            setPublicacion({
                Titulo: "",
                Fecha: "",
                SitioId: 0,
                Descripcion: "",
                Precio: 0,
                PropietarioId: user.Id,
            })
        }
    }, [location.state, user])

    return (
        <div className="container-fluid form-container ">
            <div className="row align-items-center">
                {/* Columna de formulario */}
                <div className="col col-form">
                    <h1 className="titulo-form-blue">Ingresa los datos del plan</h1>
                    <form onSubmit={handlerSubmit}>
                        <div className="form-group">
                            <label htmlFor="Titulo">Titulo</label>
                            <input
                                name="Titulo"
                                className="form-control"
                                type="text"
                                autoFocus
                                required
                                value={publicacion.Titulo}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Descripcion">Descripción</label>
                            <textarea
                                name="Descripcion"
                                className="form-control"
                                rows="3"
                                onChange={onChange}
                                required
                                value={publicacion.Descripcion}
                            />
                        </div>

                        <div className="form-group">
                                <label htmlFor="Precio">Precio</label>
                                <input
                                    name="Precio"
                                    className="form-control"
                                    type="number"
                                    min="0"
                                    onChange={onChange}
                                    required
                                    value={publicacion.Precio}
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
                                    required
                                    value={publicacion.SitioId}
                                    disabled={location.state && location.state.publicacion}
                                >
                                    <option>Seleccione un sitio</option>
                                    {sitios.map(sitio =>
                                        <option
                                            value={sitio.id}
                                            key={sitio.nombre}
                                        >
                                            {sitio.nombre}
                                        </option>)}
                                </select>
                                <p className="form-link">
                                    ¿No encuentras un sitio turistico?{" "}
                                    {
                                        <Link to="/crear-sitio-turistico">
                                            Crear sitio turistico
                            </Link>
                                    }
                                </p>
                            </div>
                            <div className="form-group col">
                                <label htmlFor="Fecha">Fecha</label>
                                <input
                                    name="Fecha"
                                    className="form-control"
                                    type="date"
                                    min="2020-05-03T00:00"
                                    onChange={onChange}
                                    required
                                    value={publicacion.Fecha}
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-form-blue col">Siguiente</button>

                    </form>
                </div>
            </div>
        </div>
    )
}


export default AddPlan