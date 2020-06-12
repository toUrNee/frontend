import React, { useContext, useEffect, useState } from 'react';
import { PublicacionContext } from '../context/PublicacionContext';
import Card from './CardPublicacion';
import portada from '../images/portada.jpg'

import { Multiselect } from 'multiselect-react-dropdown';


import '../styles/Post.css'

const Publicaciones = (props) => {

    const { loading, publicaciones, actividades, getPublicaciones, getPublicacionesByRegion, getActividades, getPublicacionesByActividades, getPublicacionesByRegionAndActividades } = useContext(PublicacionContext)

    //Estado por defecto
    const [region, setRegion] = useState({
        nombre: "Colombia",
        img: portada
    })

    //Arreglo de actividades activas en el filtro
    const [filtroActividad, setFiltroActividad] = useState([])

    //Booleano si es filtro por region
    const [filtroRegion, setFiltroRegion] = useState(props.location.state)

    //Trae las publicaciones y las actividades
    useEffect(() => {
        if (!props.location.state) {
            setRegion({
                nombre: "Colombia",
                img: portada
            })
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
        setFiltroActividad([])
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

    function onSelect(selectedList, selectedItem) {
        setFiltroActividad([...filtroActividad, selectedItem]);
        console.log(filtroActividad);

    }

    function onRemove(selectedList, removedItem) {
        var i = filtroActividad.indexOf(removedItem);
        if (i !== -1) {
            filtroActividad.splice(i, 1);
        }
        console.log(filtroActividad);
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





                    <section className="publicaciones">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12 col-lg-12 lateral">
                                    <div className="row filtro">
                                        <div className="col-5">
                                            <h5 className="filter-title">
                                                Tipo de actividades
                                            {/* Modal de Bootstrap*/}
                                                <button type="button" className="btn btn-secondary ayuda" data-toggle="modal" data-target="#exampleModalLong"> ? </button>
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
                                            </h5>
                                            <Multiselect
                                                options={actividades} // Options to display in the dropdown
                                                selectedValues='' // Preselected value to persist in dropdown
                                                onSelect={onSelect} // Function will trigger on select event
                                                onRemove={onRemove} // Function will trigger on remove event
                                                displayValue="nombre" // Property name to display in the dropdown options
                                                placeholder="Actividades"
                                            />
                                        </div>
                                        <div className="col-5">
                                            
                                        </div>

                                        <button type="button" className="btn btn-warning" style={{ marginTop: "40px" }} onClick={filtrar}>Filtrar</button>
                                    </div>

                                </div>
                                <div className="col-md-12 col-lg-12 principal">
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

                            </div>
                        </div>
                    </section>

                </div>
            }
        </div >
    );
}

export default Publicaciones;