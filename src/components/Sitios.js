import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios'
import { SitioContext } from '../context/SitioContext';
import CardSite from './CardSite';

const Sitios = (props) => {

    const {sitios, loading, getSitios} = useContext(SitioContext)

    useEffect(() => {
        getSitios()
    },[])

    return (  
        <div>
            {
            loading?
                <div>
                    <p>Hola</p>
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