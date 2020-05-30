import React, { useContext, useEffect, useState } from 'react';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';
import CirculoFiltro from './CirculoFiltro';
import portada from '../images/portada.jpg'


const Publicaciones = (props) => {

    const { loading, publicaciones, actividades, getPublicaciones, getPublicacionesByRegion, getActividades, getPublicacionesByActividades } = useContext(PublicacionContext)


    const [region, setRegion] = useState({
        nombre: "Colombia",
        img: portada
    })

    const [filtroActividad, setfiltroActividad] = useState([2, 6])

    const [filtroRegion, setfiltroRegion] = useState(false)

    useEffect(() => {
        if (!props.location.state) {
            getPublicaciones()
        }
        getActividades()
    }, [])


    useEffect(() => {
        if (props.location.state) {
            setRegion({
                nombre: props.location.state.region,
                img: props.location.state.img
            })
            setfiltroRegion(true)
            getPublicaciones()
            //getPublicacionesByRegion(props.location.state.region)
        }

    }, [props.location.state])

    function filtrar(e) {
        e.preventDefault();
        console.log(filtroActividad);
        getPublicacionesByActividades(filtroActividad);
    }



    return (
        <div className="container-fluid" id="1">

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
                        {actividades.map(actividad => (
                            <CirculoFiltro icono={actividad.icono} nombre={actividad.nombre} />
                        ))}
                    </div>

                    <button onClick={filtrar}>Filtro</button>

                    <div className="card-columns">

                        <div>
                            {filtroRegion ?
                                publicaciones.map(publicacion => (
                                    publicacion.sitio.region === region.nombre ?
                                        <Card
                                            id={publicacion.id}
                                            titulo={publicacion.titulo}
                                            descripcion={publicacion.descripcion}
                                            precio={publicacion.precio}
                                        /> : ""
                                ))
                                :
                                publicaciones.map(publicacion => (
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

        </div>
    );
}

export default Publicaciones;