import React from 'react';

import {
    Link
} from "react-router-dom";

const CirculoFiltro = (props) => {
    return (

        <div className="col">
            <div className="circle-item mx-auto mb-5 mb-lg-0">
                <a to=""><i className={props.icono}>
                    <p>{props.nombre}</p>
                </i></a>
            </div>
        </div>

    );
}

export default CirculoFiltro;