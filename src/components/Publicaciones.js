import React, { useContext, useEffect, useState } from 'react';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';
import CirculoFiltro from './CirculoFiltro';
import portada from '../images/portada.jpg'


const Publicaciones = (props) => {

    const { loading, publicaciones, actividades, getPublicaciones, getPublicacionesByRegion, getActividades } = useContext(PublicacionContext)

    const [region, setRegion] = useState({
        nombre: "Colombia",
        img: portada
    })

    useEffect(() => {
        if (!props.location.state) {
            setRegion({
                nombre: "Colombia",
                img: portada
            })
            getPublicaciones()
        }
        getActividades()
    }, [getActividades, getPublicaciones, props.location.state])


    useEffect(() => {
        if (props.location.state) {
            setRegion({
                nombre: props.location.state.region,
                img: props.location.state.img
            })
            getPublicacionesByRegion(props.location.state.region)
        }

    }, [props.location.state, getPublicacionesByRegion])



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
                            <CirculoFiltro icono={actividad.icono} nombre={actividad.nombre} key={actividad.id} />
                        ))}

                    </div>

                    <div className="card-columns">
                        <div>
                            {publicaciones.map(publicacion => (
                                <Card
                                    publicacion = {publicacion}
                                    key={publicacion.id}
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