import React from 'react';
import axios from 'axios';
import { store } from 'react-notifications-component';


const AddActividad = ({ prevStep }) => {

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

    const handlerSubmit = (e) => {
        //si todo sale bien enviar mensaje de ok y hacer history.push
        axios.get(process.env.REACT_APP_BACK_URL + '/CategoriasActividad')
        .then((res) => {
            success("Hasta aca llega bien")
            console.log(res.data)
        })
    }

    return (
        <div className="col col-form">
            <header>
                <h1> Selecciona tus actividades </h1>
            </header>
            <button className="btn btn-form-blue" onClick={prevStep}>Atras</button>
            <button className="btn btn-form-blue" onClick={handlerSubmit}>Confirmar</button>
        </div>
    );
}

export default AddActividad