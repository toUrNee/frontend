import React, { useState, useContext, useEffect } from 'react';
import img from '../../images/crear-sitio-tur.png';
import AddFile from './AddFile';
import axios from 'axios';
import AddSitioTuristico from './AddSitioTuristico';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from "react-router-dom";
import { store } from 'react-notifications-component';

function FormSitio() {

    const location = useLocation();
    const { user } = useContext(AuthContext)
    const [step, setStep] = useState(1)

    const [imagenes, setImagenes] = useState([])
    const [sitio, setSitio] = useState({
        Nombre: "",
        Descripcion: "",
        Capacidad: 1,
        Region: "",
        Municipio: "",
        Departamento: "",
        PropietarioId: user.id,
        Portada: 0
    })

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

    useEffect(() => {
        if (location.state && location.state.sitio) {
            axios.get(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos/' + location.state.sitio)
                .then(res => {
                    setSitio({
                        Id: res.data.id,
                        Nombre: res.data.nombre,
                        Descripcion: res.data.descripcion,
                        Capacidad: res.data.capacidad,
                        Region: res.data.region,
                        Municipio: res.data.municipio,
                        Departamento: res.data.departamento,
                        PropietarioId: res.data.propietarioId
                    })
                    setImagenes([...res.data.imagenes])
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [location.state, user])

    const showStep = () => {
        if (step === 1) {
            return <AddSitioTuristico
                nextStep={nextStep}
                sitio={sitio}
                setSitio={setSitio}
                success={success}
                error={error}
                edit={sitio.Id != null}
            />
        }
        if (step === 2) {
            return <AddFile
                prevStep={prevStep}
                sitio={sitio}
                setSitio={setSitio}
                imagenes={imagenes}
                setImagenes={setImagenes}
                success={success}
                error={error}
                warning={warning}
            />
        }
    }

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    return (
        <div className="container-fluid form-container ">
            <div className="row align-items-center">
                <div className="col col-color-yellow">
                    <header>
                        <h1 className="titulo-form-color">{location.state && location.state.sitio ? "Actualizar":"Crear"} Sitio Turistico</h1>
                        {<img className="img-fluid mx-auto d-block img-form" src={img} alt="cool airplane" />}
                    </header>
                </div>
                {showStep()}    
            </div>
        </div>
    );
}

export default FormSitio;
