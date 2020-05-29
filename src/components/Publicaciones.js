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
        getPublicaciones()
        getActividades()
    }, [props.location.state])


    useEffect(() => {
        if (props.location.state) {
            setRegion({
                nombre: props.location.state.region,
                img: props.location.state.img
            })
            getPublicacionesByRegion(props.location.state.region)
        }
        
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
                console.log(publicaciones),
                <div className="container-fluid">

                    <div className=" text-center portada" style={{ marginBottom: 10, backgroundImage: `url(${region.img})` }}>{region.nombre}</div>

                    <div className="col titulo"> <h1>Tipos de actividad:</h1> </div>

                    <div className="row circles">


                        {actividades.map(actividad => (
                            <CirculoFiltro icono={actividad.icono} nombre={actividad.nombre} />
                        ))}

                    </div>


                        {actividades.map(actividad => (
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id={actividad.id} />
                                <label class="form-check-label" for={actividad.id}>
                                    {actividad.nombre}
                                </label>
                            </div>
                        ))}




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