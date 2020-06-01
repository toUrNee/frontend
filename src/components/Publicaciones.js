import React, { useContext, useEffect, useState } from 'react';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';
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
    }, [props.location.state, getPublicaciones, getPublicacionesByRegion, getActividades])

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

                    <div className="row filter-title">
                        <h2 className="col"> Selecciona tus actividades de interés </h2>

                        {/* Modal de Bootstrap*/}

                        <div className="col" style={{ textAlign: "right" }}>
                            <button type="button" className="btn btn btn-warning" data-toggle="modal" data-target="#exampleModalLong" style={{ opacity: "50%" }}> ? </button>

                            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Actividades</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            {actividades.map((actividad, index) => (
                                                <div className="row" style={{ margin: "5px" }} key={actividad.id}>
                                                    <h5 className="col">{actividad.nombre}</h5>
                                                    <p className="col" style={{ color: 'black', fontSize: "13px", textAlign: "justify" }}>{actividad.descripcion}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row circles">

                        {actividades.map((actividad, index) => (
                            <div className="col" key={actividad.id}>
                                <div className="circle-item">
                                    <button className="boton-circular inactive" id={'boton-act-' + actividad.id} onClick={() => addFilter(actividad)}>
                                        <i className={actividad.icono} title={actividad.nombre} />
                                        <p>{actividad.nombre}</p>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="button" className="btn btn-warning" style={{ marginBottom: "40px" }} onClick={filtrar}>Filtrar</button>

                    <div className="card-columns">
                        <div>
                            {publicaciones.map(publicacion => (
                                <Card
                                    publicacion={publicacion}
                                    key={publicacion.id}
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