import React from 'react';

import {
    Link
} from "react-router-dom";

const CirculoFiltro = (props) => {
    return (
        <div className="col-4">
            <div className="circle-item mx-auto mb-5 mb-lg-0">
                <button className="boton-circular" ><i className={props.icono}>
                </i></button>
                <p>{props.nombre}</p>
            </div>
        </div>
    );
}

export default CirculoFiltro;