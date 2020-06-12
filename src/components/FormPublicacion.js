import React, { useState } from 'react';
import img from '../images/post.png';
import AddActividad from './AddActividad.js';
import AddPlan from './AddPlan.js';
import { useLocation } from "react-router-dom";

function FormPublicacion (){

    const location = useLocation();

    const [step, setStep] = useState(1)

    const [idPublicacion, setidPublicacion] = useState(0)

    const showStep = () => {
        if(step === 1){
            return <AddPlan
                nextStep = {nextStep}
                getidPublicacion = {getidPublicacion}
            />
        }
        if(step === 2){
            return <AddActividad
                prevStep = {prevStep}
                idPublicacion = {idPublicacion}
            />
        }
    }

    const getidPublicacion = (id) => {
        setidPublicacion(id)
    }

    const nextStep = () => {
        setStep(step+1)
    }

    const prevStep = () => {
        setStep(step-1)
    }

    return (
        <div className="container-fluid form-container ">
            <div className="row align-items-center">
                {/* Columna de color con imagen */}
                <div className="col col-color-yellow">
                    <header>
                        <h1 className="titulo-form-color">{location.state && location.state.publicacion ? "Modificar" : "Publicar"} un plan</h1>
                        <img className="img-fluid mx-auto d-block img-form" src={img} alt="pc and people" />
                    </header>
                </div>
                {showStep()}    
            </div>
        </div>
    );
}

export default FormPublicacion;