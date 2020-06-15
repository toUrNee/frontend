import React, { useState, useContext, useEffect } from 'react';
import img from '../images/post.png';
import AddPlan from './AddPlan.js';
import axios from 'axios';
import AddActividad from './AddActividad.js';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from "react-router-dom";
import { store } from 'react-notifications-component';
import { PublicacionContext } from '../context/PublicacionContext';


function FormPublicacion (){

    const location = useLocation();
    const { user } = useContext(AuthContext)
    const [step, setStep] = useState(1)

    const { actividades, getActividades } = useContext(PublicacionContext)

    const [actividadesPublicacion, setActividadesPublicacion] = useState([])

    const [publicacion, setPublicacion] = useState({
        Titulo: "",
        SitioId: 0,
        Fecha: "",
        Descripcion: "",
        Precio: 0,
        PropietarioId: user.Id
    })

    useEffect(() => {
        getActividades()
    }, [getActividades])

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
        }
    }, [location.state, user])

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

    const warning = (message) => {
        store.addNotification({
            title: "Cuidado!",
            message: message,
            type: "warning",
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

    const showStep = () => {
        if(step === 1){
            return <AddPlan
                nextStep = {nextStep}
                publicacion = {publicacion}
                setPublicacion = {setPublicacion}
                success = {success}
                error = {error}
                edit = {publicacion.Id != null}
            />
        }
        if(step > 1){
            return <AddActividad
                prevStep = {prevStep}
                nextStep = {nextStep}
                publicacion = {publicacion}
                actividades = {actividades}
                actividadesPublicacion = {actividadesPublicacion}
                setActividadesPublicacion = {setActividadesPublicacion}
                success = {success}
                error = {error}
                warning = {warning}
            />
        }
    }

    const nextStep = () => {
        setStep(step+1)
    }

    const prevStep = () => {
        setStep(1)
    }

    return (
        <div className="container-fluid form-container ">
            <div className="row align-items-center">
                <div className="col col-color-yellow">
                    <header>
                        <h1 className="titulo-form-color">{location.state && location.state.publicacion ? "Modificar" : "Publicar"} un plan</h1>
                        {<img className="img-fluid mx-auto d-block img-form" src={img} alt="pc and people" />}
                    </header>
                </div>
                {showStep()}    
            </div>
        </div>
    );
}

export default FormPublicacion;