import React from 'react';

const CirculoFiltro = (props) => {
    return (

        <div className="col">
            <div className="circle-item mx-auto mb-5 mb-lg-0">
                <a href="#"><i className={props.icono}>
                    <p>{props.nombre}</p>
                </i></a>
            </div>
        </div>

    );
}

export default CirculoFiltro;