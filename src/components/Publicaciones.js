import React, { useContext, useEffect, useState } from 'react';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';
import CirculoFiltro from './CirculoFiltro';
import portada from '../images/portada.jpg'


const Publicaciones = (props) => {

    const { loading, publicaciones, actividades, getPublicaciones, getPublicacionesByRegion, getActividades, getPublicacionesByActividades, getPublicacionesByRegionAndActividades } = useContext(PublicacionContext)


    const [region, setRegion] = useState({
        nombre: "Colombia",
        img: portada
    })

    const [filtroActividad, setfiltroActividad] = useState([])

    const [filtroRegion, setFiltroRegion] = useState(props.location.state)

    useEffect(() => {
        if (!props.location.state) {
            getPublicaciones()
        }
        getActividades()
    }, [props.location.state])


    useEffect(() => {
        if (props.location.state) {
            setRegion({
                nombre: props.location.state.region,
                img: props.location.state.img
            })
            getPublicacionesByRegion(props.location.state.region)
            setFiltroRegion(true)
            //console.log(filtroRegion)
        }
        setfiltroActividad([])
        //console.log(filtroRegion)
    }, [props.location.state])

    function filtrar() {
        if (filtroActividad.length > 0) {
            //console.log(filtroActividad, filtroRegion);
            if (filtroRegion) {
                //console.log("Region y actividad", filtroActividad, filtroRegion, region.nombre);
                getPublicacionesByRegionAndActividades(filtroActividad, region.nombre)
            } else {
                //console.log("Solo actividad", filtroActividad)
                getPublicacionesByActividades(filtroActividad);
            }
        }else{
            if (filtroRegion) {
                //console.log("Region y actividad", filtroActividad, filtroRegion, region.nombre);
                getPublicacionesByRegion(region.nombre);
            } else {
                //console.log("Solo actividad", filtroActividad)
                getPublicaciones()
            }
        }
    }

    function addFilter(idActividad) {
        if (filtroActividad.indexOf(idActividad) === -1) {
            //console.log("No existe")
            setfiltroActividad(filtroActividad.concat(idActividad))
            document.getElementById('i-actividad-' + idActividad).style.background = "#F35C22"

        } else {
            //console.log("Existe")
            document.getElementById('i-actividad-' + idActividad).style.background = "#FFCC52"
            var i = filtroActividad.indexOf(idActividad);
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

                    <div className="col titulo">
                        <h1>Tipos de actividad:</h1>
                    </div>

                    <div className="row circles">

                        {actividades.map((actividad, index) => (
                            
                            <div className="col" >
                                <div className="circle-item mx-auto mb-5 mb-lg-0">
                                    <button className="boton-circular" id={'boton-act-' + actividad.id} onClick={() => addFilter(actividad.id)}>
                                        <i className={'icon-actividad '+actividad.icono} id={'i-actividad-' + actividad.id} >
                                        </i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="button" class="btn btn-warning" style={{marginBottom:"40px"}} onClick={filtrar}>Filtro</button>

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