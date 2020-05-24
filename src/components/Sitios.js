import React, {useContext, useEffect, useState, useLayoutEffect, useRef} from 'react';
import axios from 'axios'
import { SitioContext } from '../context/SitioContext';
import CardSite from './CardSite';
import { ExternalDataContext } from '../context/ExternalDataContext';
import { AuthContext } from '../context/AuthContext'

const Sitios = (props) => {

    //const {sitios, loading, getSitios} = useContext(SitioContext)
    const {sitios_turisticos, loading, getPublicacionesbyId} = useContext(ExternalDataContext)
    const { user, isAuthenticated } = useContext(AuthContext)
    
    const firstUpdate = useRef(true);
    
    useEffect ( () => {
        if(firstUpdate.current){
            firstUpdate.current = false;
            return;
        }
        console.log(user)
        getPublicacionesbyId(user.id)
    },[user])
    /*
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        getPublicacionesbyId(user.id);
        console.log(user.id);
        console.log(user.nombres);
        console.log(user);
        console.log(isAuthenticated);
    }, )
    */

    return (  
        <div>
            {
            !loading ?
                <div>
                    <p>Cargando...</p>
                </div>
            :
                <section id="sitio" class="sitio">
                    <div class="container">

                        <div class="section-title" data-aos="fade-up">
                            <h2>Mis sitios</h2>
                            <p>Revisa tus sitios turisticos</p>
                        </div>

                        <div class="row" data-aos="fade-up" data-aos-delay="100">
                            <div class="col-lg-12">
                                <ul id="sitio-flters">
                                    <li data-filter="*" class="filter-active">All</li>
                                    <li data-filter=".filter-app">Capacidad</li>
                                    <li data-filter=".filter-card">Region</li>
                                    <li data-filter=".filter-web">Departamento</li>
                                </ul>
                            </div>
                        </div>

                        <div class="row sitio-container" data-aos="fade-up" data-aos-delay="200">
                                {sitios_turisticos.map(sitio => (
                                    <CardSite>
                                        id = {sitio.id}
                                        nombre = {sitio.nombre}
                                        descripcion = {sitio.descripcion}
                                    </CardSite>
                                ))}
                        </div>
                    </div>
                </section>
          
            }

            {/*
            <section id="sitio" class="sitio">
                <div class="container">

                    <div class="section-title" data-aos="fade-up">
                        <h2>Mis sitios</h2>
                        <p>Revisa tus sitios turisticos</p>
                    </div>

                    <div class="row" data-aos="fade-up" data-aos-delay="100">
                        <div class="col-lg-12">
                            <ul id="sitio-flters">
                                <li data-filter="*" class="filter-active">All</li>
                                <li data-filter=".filter-app">Capacidad</li>
                                <li data-filter=".filter-card">Region</li>
                                <li data-filter=".filter-web">Departamento</li>
                            </ul>
                        </div>
                    </div>

                    <div class="row sitio-container" data-aos="fade-up" data-aos-delay="200">
                        <div>
                            {sitios.map(sitio => (
                                <CardSite>
                                    id = {sitio.id}
                                    nombre = {sitio.nombre}
                                    descripcion = {sitio.descripcion}
                                </CardSite>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            */}

        </div>        
    );
}
 
export default Sitios;