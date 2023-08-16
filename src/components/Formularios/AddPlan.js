import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import { SitioContext } from '../../context/SitioContext';
import NumberFormat from 'react-number-format';

const AddPlan = ({ nextStep, publicacion, setPublicacion, success, error, edit }) => {

    const location = useLocation();
    const { user } = useContext(AuthContext)
    const { sitios, getSitiosById } = useContext(SitioContext)

    const onChange = (event) => {
        if (event.target.type === "number" || event.target.type === "select-one") {
            setPublicacion({
                ...publicacion,
                [event.target.name]: parseInt(event.target.value)
            })
        } else {
            setPublicacion({
                ...publicacion,
                [event.target.name]: event.target.value
            })
        }
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        if (edit) {
            axios.put(process.env.REACT_APP_BACK_URL + '/Publicaciones/' + publicacion.Id, publicacion)
                .then(() => {
                    success("Tu publicación fue actualizada con éxito")
                    nextStep()
                })
                .catch(err => {
                    console.log(err);
                    error("Ha ocurrido un error y tu publicación no ha podido ser actualizada")
                })
        } else {
            axios.post(process.env.REACT_APP_BACK_URL + '/Publicaciones/', publicacion)
                .then((res) => {
                    success("Tu publicación fue creada con éxito", res.data.id)
                    setPublicacion({
                        ...publicacion,
                        Id: res.data.id
                    })
                    nextStep()
                })
                .catch(err => {
                    console.log(err);
                    error("Tu publicación no se ha podido crear debido a un error");
                })
        }
    }

    useEffect(() => {
        publicacion.PropietarioId = parseInt(user.id)
    }, [publicacion, user])

    useEffect(() => {
        getSitiosById(publicacion.PropietarioId)
    }, [getSitiosById, publicacion.PropietarioId])

    return (
        <div className="col col-form">
            <h1 className="titulo-form-blue">Ingresa los datos del plan</h1>
            <form onSubmit={handlerSubmit}>
                <div className="form-group">
                    <label htmlFor="Titulo">Titulo</label>
                    <input
                        name="Titulo"
                        className="form-control"
                        type="text"
                        autoFocus
                        required
                        value={publicacion.Titulo}
                        onChange={onChange}
                        maxLength="50"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Descripcion">Descripción</label>
                    <textarea
                        name="Descripcion"
                        className="form-control"
                        rows="3"
                        onChange={onChange}
                        required
                        value={publicacion.Descripcion}
                        maxLength="800"
                    />
                </div>

                <div className="form-group">
                        <label htmlFor="Precio">Precio (COP) El máximo precio permitido es $5'000.000</label>
                        <NumberFormat 
                            allowNegative={false}
                            value={publicacion.Precio}
                            thousandSeparator={true} 
                            decimalSeparator={false}
                            name="Precio"
                            prefix={'$'} 
                            allowEmptyFormatting={false}
                            allowLeadingZeros={false}
                            renderText={value => <div>{value}</div>} 
                            onValueChange={values => {setPublicacion({...publicacion, Precio:Math.min(values.floatValue, 5000000)})}}
                            className="form-control"
                            required
                            />
                    </div>

                <div className="row">
                    <div className="form-group col">
                        <label htmlFor="SitioId">Sitio Turistico</label>
                        <select
                            name="SitioId"
                            className="form-control"
                            type="number"
                            onChange={onChange}
                            required
                            value={publicacion.SitioId}
                            disabled={location.state && location.state.publicacion}
                        >
                            <option>Seleccione un sitio</option>
                            {sitios.map(sitio =>
                                <option
                                    value={sitio.id}
                                    key={sitio.id}
                                >
                                    {sitio.nombre}
                                </option>)}
                        </select>
                        <p className="form-link">
                            ¿No encuentras un sitio turístico?{" "}
                            {
                                <Link to="/crear-sitio-turistico">
                                    Crear sitio turístico
                                </Link>
                            }
                        </p>
                    </div>
                </div>
                
                <button type="submit" className="btn btn-form-blue col">Siguiente</button>

            </form>
        </div>
    )
}


export default AddPlan