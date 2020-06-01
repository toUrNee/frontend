import React, { useState } from 'react';
import img from '../images/crear-sitio-tur.png';
import AddFile from './AddFile';
import AddSitioTuristico from './AddSitioTuristico';

function FormSitio (){

    const [step, setStep] = useState(1)

    const [idSitio, setidSitio] = useState(0)

    const showStep = () => {
        if(step == 1){
            return <AddSitioTuristico
                nextStep = {nextStep}
                getidSitio = {getidSitio}
            />
        }
        if(step == 2){
            return <AddFile
                prevStep = {prevStep}
                idSitio = {idSitio}
            />
        }
    }

    const getidSitio = (a) =>{
        setidSitio(a)
    }

    const nextStep = () => {
        setStep(step+1)
    }

    const prevStep = () => {
        setStep(step-1)
    }

    return (
        <div className="container-fluid form-container ">
            {/*<img src={process.env.REACT_APP_BACK_URL + "/Archivo_SitioTuristico/8"} width="80" height="140" alt=""/>*/}   
            <div className="row align-items-center">
                {/* Columna de color con imagen */}
                <div className="col col-color-yellow">
                    <header>
                        <h1 className="titulo-form-color">Crear Sitio Turistico</h1>
                        {<img className="img-fluid mx-auto d-block img-form" src={img} alt="cool airplane" />}
                    </header>
                </div>
                {showStep()}    
            </div>
        </div>
      );
}

export default FormSitio;
