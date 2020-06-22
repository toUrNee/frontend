import React, { useContext, useEffect, useState } from 'react';
import { PublicacionContext } from '../context/PublicacionContext';
import CardPublicacion from './CardPublicacion';
import portada from '../images/portada.jpg'

import { Multiselect } from 'multiselect-react-dropdown';

import Slider from '@material-ui/core/Slider';

import '../styles/Post.css'

function valueLabelFormat(precio) {
    if (precio >= 1000000) {
        return `${Math.round((precio / 1000000) * 10) / 10}M`;
    } else {
        return `${Math.round((precio / 100000)) * 100}K`;
    }
}

const Publicaciones = (props) => {

    const {
        loading,
        publicaciones,
        actividades,
        getPublicacionesFiltered,
        getActividades
    } = useContext(PublicacionContext)

    //Estado por defecto
    const [region, setRegion] = useState({
        nombre: "Colombia",
        img: portada
    })

    //Arreglo de actividades activas en el filtro
    const [filtroActividad, setFiltroActividad] = useState([])
    const [precio, setPrecio] = React.useState([0, 5000000]);
    const marks = [
        { value: 0, label: '$0' },
        { value: 1000000, label: '$1M' },
        { value: 2000000, label: '$2M' },
        { value: 3000000, label: '$3M' },
        { value: 4000000, label: '$4M' },
        { value: 5000000, label: '$5M' }
    ]

    const handleChange = (event, newValue) => {
        setPrecio(newValue);
    };

    //Trae las publicaciones y las actividades
    useEffect(() => {
        if (props.location.state) {
            setRegion({
                nombre: props.location.state.region,
                img: props.location.state.img
            })
        } else {
            setRegion({
                nombre: "Colombia",
                img: portada
            })
        }
        getActividades()
        filtrar()
        // eslint-disable-next-line
    }, [props.location.state, getActividades])

    useEffect(() => {
        filtrar()
        // eslint-disable-next-line
    }, [region])


    //Filtra las publicaciones por region y/o por actividades y precio
    function filtrar() {
        var filtros = {
            region: region.nombre,
            actividades: filtroActividad.map(act => act.id),
            precioMinimo: precio[0],
            precioMaximo: precio[1]
        }
        getPublicacionesFiltered(filtros)
    }

    function onSelect(selectedList, selectedItem) {
        setFiltroActividad([...filtroActividad, selectedItem]);
    }

    function onRemove(selectedList, removedItem) {
        var i = filtroActividad.indexOf(removedItem);
        if (i !== -1) {
            filtroActividad.splice(i, 1);
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
                    <section className="publicaciones">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12 col-lg-12 lateral">
                                    <div className="row filtro">
                                        <div className="col-lg-5 col-md-12">
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
                                                                <button type="button" className="btn btn-secondary " data-dismiss="modal">Cerrar</button>
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
                                        <div className="col-lg-5 col-md-8">
                                            <h5 className="filter-title">
                                                Precio
                                        </h5>
                                            <Slider
                                                value={precio}
                                                onChange={handleChange}
                                                valueLabelDisplay="auto"
                                                aria-labelledby="range-slider"
                                                getAriaValueText={valueLabelFormat}
                                                valueLabelFormat={valueLabelFormat}
                                                step={100000}
                                                min={0}
                                                max={5000000}
                                                marks={marks}
                                            />
                                        </div>

                                        <button type="button" className="btn btn-warning filtro-btn" onClick={filtrar}>Filtrar</button>
                                    </div>

                                </div>
                                <div className="col-md-12 col-lg-12 principal">
                                    <div className="card-columns">
                                        <div>
                                            {publicaciones.map(publicacion => (
                                                <CardPublicacion
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