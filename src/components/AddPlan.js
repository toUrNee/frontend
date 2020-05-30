import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import img from '../images/post.png';
import { useHistory, Link, useLocation } from "react-router-dom";
import { store } from 'react-notifications-component';
import { AuthContext } from '../context/AuthContext';
import { SitioContext } from '../context/SitioContext';
import { PublicacionContext } from '../context/PublicacionContext';

const AddPlan = () => {

    const history = useHistory();
    const location = useLocation();
    const { user } = useContext(AuthContext) 
    const { sitios, getSitiosById } = useContext(SitioContext)
    const {publicaciones} = useContext(PublicacionContext)

    const [publicacion, setPublicacion] = useState({
            Titulo: "",
            SitioId: null,
            Fecha: "",
            Descripcion: "",
            Precio: null,
            PropietarioId: user.Id
    })

    const onChange = (event) => {
        if(event.target.type === "number" || event.target.type === "select-one"){
            setPublicacion({
                ...publicacion,
                [event.target.name]: parseInt(event.target.value)
            })
            
        }else{
            setPublicacion({
                ...publicacion,
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
        if(location.state){
            var id = location.state.publicacion
            axios.put(process.env.REACT_APP_BACK_URL + '/Publicaciones' + id, publicacion)
                .then(() => {
                    success("Tu publicación fue actualizada con éxito")
                })
                .catch(err => {
                    console.log(err);
                    error("Ha ocurrido un error y tu publicación no ha podido ser actualizada")
                })
        }else{
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
    }

    useEffect(() => {
        console.log(user)
        publicacion.PropietarioId = parseInt(user.id) 
    }, [publicacion, user])

    useEffect(() => {
        getSitiosById(publicacion.PropietarioId)
    }, [getSitiosById, publicacion])

    useEffect(() => {
        if(location.state){
            var index = location.state.index
            setPublicacion({
                Id: publicaciones[index].Id,
                Fecha: publicaciones[index].Fecha,
                Titulo: publicaciones[index].Titulo,
                Descripcion: publicaciones[index].Descripcion,
                PropietarioId: publicaciones[index].PropietarioId,
                Precio: publicaciones[index].Precio,
                SitioId: publicaciones[index].SitioId,
            })
        }
    }, [location.state, publicaciones])

    return (
        <div className="container-fluid form-container ">
            <div className="row align-items-center">
                {/* Columna de color con imagen */}
                <div className="col col-color-yellow">
                    <header>
                        <h1 className="titulo-form-color">{location.state ? "Publicar":"Modificar"} un plan</h1>
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
                                autoFocus
                                value = {publicacion.Titulo}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Fecha">Fecha</label>
                            <input
                                name="Fecha"
                                className="form-control"
                                type="datetime-local"
                                min="2020-05-03T00:00"
                                value = {publicacion.Fecha}
                                onChange={onChange} //revisar esto porque tampoco debe ser asi
                            />
                        </div>
                            <div className="form-group">
                                <label htmlFor="SitioId">Sitio Turistico</label>
                                <select
                                    name="SitioId"
                                    className="form-control"
                                    type="number"
                                    onChange={onChange}
                                >
                                    <option>Seleccione una opcion</option>
                                    {sitios.map(sitio =>
                                        <option
                                            value={sitio.id} 
                                            key={sitio.id}
                                            disabled={location.state}
                                            >
                                            {sitio.nombre} 
                                        </option>)}
                                </select>
                            </div>
                        <div className="form-group">
                            <label htmlFor="Descripcion">Descripción</label>
                            <textarea
                                name="Descripcion"
                                className="form-control"
                                rows="3"
                                onChange={onChange}
                                value = {publicacion.Descripcion}
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
                                value = {publicacion.Precio}
                            />
                        </div>
                        <button type="submit" className="btn btn-form-blue">Submit</button>
                        <p className="form-link">
                            ¿No encuentras un sitio turistico?
                            {
                            <Link to ="/crear-sitio-turistico">
                                Crear
                            </Link>
                            }
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default AddPlan