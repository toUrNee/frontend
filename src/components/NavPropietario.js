import React, { useContext, useEffect, useState } from 'react';
import {
    Link
} from 'react-router-dom';

import { PublicacionContext } from '../context/PublicacionContext';
import { AuthContext } from '../context/AuthContext'

const NavPropietario = () => {

    const { loading, publicaciones, getPublicacionesById } = useContext(PublicacionContext)
    const { user } = useContext(AuthContext)

    /*useEffect(() => {
        getPublicacionesById(user.id)
    }, [])*/

    

    return (
        <div className=" nav-p">
                    <a type="button" class="btn btn-outline-primary opcion-p">
                        <i class="fas fa-user-circle"></i><span class="nav-p-text">
                            Usuario
                        </span></a>
                    <a type="button" class="btn btn-outline-primary opcion-p">
                        <i class="fas fa-map-marker-alt"></i><span class="nav-p-text">
                            Sitios turisticos
                        </span></a>
                    <a type="button" class="btn btn-outline-primary opcion-p">
                        <i class="fas fa-list-ul"></i><span class="nav-p-text">
                            Planes
                        </span></a>
                </div>
    );
}

export default NavPropietario;