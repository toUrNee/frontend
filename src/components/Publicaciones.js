import React, { useContext, useEffect, useState } from 'react';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';
import CirculoFiltro from './CirculoFiltro';
import portada from '../images/portada.jpg'


const Publicaciones = (props) => {

    const { loading, publicaciones, actividades, getPublicaciones, getPublicacionesByRegion, getActividades, getPublicacionesByActividades, getPublicacionesByRegionAndActividades } = useContext(PublicacionContext)

    //Estado por defecto
    const [region, setRegion] = useState({
        nombre: "Colombia",
        img: portada
    })

    //Arreglo de actividades activas en el filtro
    const [filtroActividad, setfiltroActividad] = useState([])

    //Booleano si es filtro por region
    const [filtroRegion, setFiltroRegion] = useState(props.location.state)

    //Trae las publicaciones y las actividades
    useEffect(() => {
        if (!props.location.state) {
            getPublicaciones()
        } else {
            setRegion({
                nombre: props.location.state.region,
                img: props.location.state.img
            })
            getPublicacionesByRegion(props.location.state.region)
            setFiltroRegion(true)
        }
        getActividades()
    }, [props.location.state])

    //Filtra las publicaciones por region y/o por actividades
    function filtrar() {
        if (filtroActividad.length > 0) {
            if (filtroRegion) {
                getPublicacionesByRegionAndActividades(filtroActividad, region.nombre)
            } else {
                getPublicacionesByActividades(filtroActividad);
            }
        } else {
            if (filtroRegion) {
                getPublicacionesByRegion(region.nombre);
            } else {
                getPublicaciones()
            }
        }
    }

    //Agrega o quita la actividad del arreglo al hacer clic y cambia su color
    function addFilter(actividad) {
        if (filtroActividad.indexOf(actividad.id) === -1) {
            setfiltroActividad(filtroActividad.concat(actividad.id))
            document.getElementById('boton-act-' + actividad.id).className = "boton-circular active"
        } else {
            document.getElementById('boton-act-' + actividad.id).className = "boton-circular inactive"
            var i = filtroActividad.indexOf(actividad.id);
            if (i !== -1) {
                filtroActividad.splice(i, 1);
            }
        }
    }

    return (
        <div className="container-fluid">

            {loading ?

                <div className="text-center">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>

                :

                <div className="container-fluid">

                    <div className=" text-center portada" style={{ marginBottom: 10, backgroundImage: `url(${region.img})` }}>
                        {region.nombre}
                    </div>

                    <div className="col filter-title">
                        <h2>Selecciona tus actividades de interés </h2>
                    </div>

                    <div className="row circles">

                        {actividades.map((actividad, index) => (
                            console.log(actividades),
                            <div className="col" >
                                <div className="circle-item">
                                    <button className="boton-circular inactive" id={'boton-act-' + actividad.id} onClick={() => addFilter(actividad)}>
                                        <i className={actividad.icono} title={actividad.nombre}>

                                        </i><p>{actividad.nombre}</p>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="button" class="btn btn-warning" style={{ marginBottom: "40px" }} onClick={filtrar}>Filtrar</button>

                    <div className="card-columns">
                        <div>
                            {publicaciones.map(publicacion => (
                                <Card
                                    id={publicacion.id}
                                    titulo={publicacion.titulo}
                                    descripcion={publicacion.descripcion}
                                    precio={publicacion.precio}
                                />
                            ))
                            }
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default Publicaciones;