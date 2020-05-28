import React, { useContext, useEffect, useState } from 'react';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';
import CirculoFiltro from './CirculoFiltro';
import portada from '../images/portada.jpg'


const Publicaciones = (props) => {

    const { loading, publicaciones, actividades, getPublicaciones, getPublicacionesByRegion, getActividades } = useContext(PublicacionContext)

    useEffect(() => {
        getPublicaciones()
        getActividades()
    }, [])

    const [region, setRegion] = useState({
        nombre: "Colombia",
        img: portada
    })

    useEffect(() => {
        if (props.location.state) {
            setRegion({
                nombre: props.location.state.region,
                img: props.location.state.img
            })
            
           
        }
        console.log(region.nombre)
        getPublicacionesByRegion(region.nombre)
    }, [props.location.state])

    

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

                    <div className=" text-center portada" style={{ marginBottom: 10, backgroundImage: `url(${region.img})` }}>{region.nombre}</div>

                    <div className="col titulo"> <h1>Tipos de actividad:</h1> </div>

                    <div className="row circles">
                        

                        {actividades.map(actividad => (
                            <CirculoFiltro icono={actividad.icono} nombre={actividad.nombre} />
                        ))}

                    </div>

                    <div className="card-columns">
                        <div>
                            {publicaciones.map(publicacion => (
                                <Card
                                    id={publicacion.id}
                                    titulo={publicacion.titulo}
                                    descripcion={publicacion.descripcion}
                                    precio={publicacion.precio}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>

    );
}

export default Publicaciones;