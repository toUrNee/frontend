import React, { Component } from 'react';
import '../styles/PerfilPropietario.css'
import NavPropietario from './NavPropietario';

const PerfilPropietario = () => {
    return ( 
        <div class="active">
            <NavPropietario />

            <div id="page-content-wrapper">
                BIENVENIDO
            </div>
        </div>
     );
}
 
export default PerfilPropietario;
