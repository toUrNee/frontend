import React, { useState, useContext, useEffect } from 'react';
import '../styles/InfoPublicacion.css'
import { PublicacionContext } from '../context/PublicacionContext';
import { AuthContext } from '../context/AuthContext';
import { ReservaContext } from '../context/ReservaContext';
import Comentario from './Comentario';
import Swal from 'sweetalert2'
import axios from 'axios'
import defaultImg from '../images/no-image.jpg';
import NumberFormat from 'react-number-format';

const InfoPublicacion = (props) => {


    var curr = new Date();
    curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);

    const { match } = props;
    let { idPublicacion } = match.params;

    const [comentario, setComentario] = useState({
        Username: null,
        PublicacionId: null,
        Contenido: ""
    })
    const { loading, publicacion, getPublicacionById, comentarios, getComentariosByPublicacion, imagenes, getImagenesByPublicacion } = useContext(PublicacionContext)

    const { user, isAuthenticated } = useContext(AuthContext)
    const { existeInteres, getInteres, postInteres, deleteInteres, existeReserva, getReserva, postReserva, deleteReserva } = useContext(ReservaContext)

    const [fecha, setFecha] = useState(null)

    const hacerReserva = () => {
        postReserva(user.username, publicacion.id, fecha)
        if (existeInteres) {
            deleteInteres(user.username, publicacion.id)
        }
    }

    const eliminarReserva = () => {
        Swal.fire({
            title: '¿Seguro de que deseas remover esta reserva?',
            text: "Estos cambios podrían ser irrevertibles!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, deseo remover la reserva'
        }).then((result) => {
            if (result.value) {
                deleteReserva(user.username, publicacion.id)
                Swal.fire(
                    'Listo!',
                    'Tu reserva ha sido eliminada éxito.',
                    'success'
                )
            }
        });
    }


    const comentar = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACK_URL}/Comentarios/CreateComentario`, comentario)
            .then(() => {
                getComentariosByPublicacion(idPublicacion)
                setComentario({ ...comentario, Contenido: "" })
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (user !== null && idPublicacion !== null) {
            setComentario({
                ...comentario,
                Username: user.username,
                PublicacionId: parseInt(idPublicacion),
            })
        }
        // eslint-disable-next-line
    }, [user, idPublicacion])


    useEffect(() => {
        getPublicacionById(idPublicacion)
    }, [getPublicacionById, idPublicacion])

    useEffect(() => {
        if (publicacion !== null) {
            getImagenesByPublicacion(publicacion.sitio.id)
        }
    }, [getImagenesByPublicacion, publicacion])

    useEffect(() => {
        if (publicacion !== null && user !== null) {
            getInteres(user.username, publicacion.id)
            getReserva(user.username, publicacion.id)
        }
    }, [user, publicacion, getInteres, getReserva])

    useEffect(() => {
        getComentariosByPublicacion(idPublicacion)
    }, [getComentariosByPublicacion, idPublicacion])

    const onChange = (event) => {
        setFecha(event.target.value)
    }


    return (
        <div>
            {loading ?
                <div className="text-center">
                    < div className="spinner-grow" role="status" >
                        <span className="sr-only"></span>
                    </div >
                </div >
                :
                publicacion === null ?
                    <div className="container-fluid">
                        <div className="text-center portada" style={{ marginBottom: 10, backgroundImage: `url("https://i.pinimg.com/originals/af/4c/57/af4c571f547a74ae7a0dbda30a79c509.jpg")` }}>
                            <span className="clasificacion bg-success ">Error 404</span>
                            <h1>Publicación no encontrada.</h1>
                        </div>
                    </div>
                    :
                    <div className="container-fluid">
                        <div className="text-center portada" style={{ marginBottom: 10, backgroundImage: `url("https://i.pinimg.com/originals/af/4c/57/af4c571f547a74ae7a0dbda30a79c509.jpg")` }}>
                            <span className="clasificacion bg-success ">{publicacion.sitio.region}</span>
                            <h1>{publicacion.titulo}</h1>
                            <span className="autor">- {publicacion.propietario.nombres} -</span>
                        </div>
                        <section className="publicacion">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12 col-lg-8 principal">
                                        {!isAuthenticated || user.username === publicacion.propietario.id ?
                                            null :
                                            <div className="botones text-right">
                                                <div>
                                                    {existeReserva.estadoReservaId === 1 ?
                                                        <div>
                                                            <button type="button" className="btn btn-danger" disabled>
                                                                <i className='far fa-heart' ></i> Guardar
                                                            </button>
                                                            <button type="button" className="btn btn-success disabled" onClick={eliminarReserva}>
                                                                <i className="far fa-clock"></i> En espera
                                                            </button>
                                                        </div>
                                                        : existeReserva.estadoReservaId === 2 ?
                                                            <div>
                                                                <button type="button" className="btn btn-danger" disabled>
                                                                    <i className='far fa-heart' ></i> Guardar
                                                                </button>
                                                                <button type="button" className="btn btn-outline-success disabled" onClick={eliminarReserva}>
                                                                    <i className="fas fa-check"></i> Confirmada
                                                                </button>
                                                            </div>
                                                            : existeReserva.estadoReservaId === 3 ?
                                                                <div>
                                                                    <button type="button" className="btn btn-danger" disabled>
                                                                        <i className='far fa-heart' ></i> Guardar
                                                                    </button>
                                                                    <button type="button" className="btn btn-outline-danger disabled" onClick={eliminarReserva}>
                                                                        <i className="fas fa-times"></i> Rechazada
                                                                    </button>
                                                                </div>
                                                                :
                                                                <div>
                                                                    {existeInteres ?
                                                                        <button type="button" className="btn btn-danger" onClick={() => deleteInteres(user.username, publicacion.id)} >
                                                                            <i className='fas fa-heart' ></i> Guardado
                                                                        </button>
                                                                        :
                                                                        <button type="button" className="btn btn-danger" onClick={() => postInteres(user.username, publicacion.id)} >
                                                                            <i className='far fa-heart' ></i> Guardar
                                                                        </button>
                                                                    }
                                                                    <button type="button" className="btn btn-success" data-toggle="modal" data-target="#fechaModal">
                                                                        <i className="far fa-bell"></i> Reservar</button>
                                                                </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                        <div className="modal" id="fechaModal">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h4 className="modal-title">Reservar {publicacion.titulo}</h4>
                                                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                    </div>

                                                    <div className="modal-body">
                                                        <form>
                                                            <div className="form-group col">
                                                                <label htmlFor="Fecha">Fecha de la reserva </label>
                                                                <input name="Fecha" className="form-control" type="date" min={date} onChange={onChange} />
                                                            </div>
                                                        </form>
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Cerrar</button>
                                                        <button type="button" className="btn btn-info" data-dismiss="modal" onClick={hacerReserva} disabled={fecha === null}>Crear reserva</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="description">
                                            <h2>Descripción del plan <span className="btn btn-warning"> <NumberFormat value={publicacion.precio} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </span> </h2>
                                            <p>{publicacion.descripcion}</p>

                                            <h4>Descripción del sitio</h4>
                                            <p>{publicacion.sitio.descripcion}</p>
                                        </div>
                                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                            <div className="carousel-inner">
                                                {imagenes.length > 0 ?
                                                    <div className='carousel-item active' key={Date.now()}>
                                                        <img src={defaultImg} className="d-block w-100" alt="..." />
                                                    </div>
                                                    :
                                                    <div>
                                                        {imagenes.map((id, index) =>
                                                            <div className={index === 0 ? 'carousel-item active' : 'carousel-item'} key={index}>
                                                                <img src={`${process.env.REACT_APP_BACK_URL}/ArchivoSitioTuristico/GetArchivoSitioTuristico?id=${id}"`} className="d-block w-100" alt="..." />
                                                            </div>
                                                        )}
                                                    </div>
                                                }
                                            </div>
                                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-4 lateral">
                                        <div className="lateral-box">
                                            <h3 className="titulo-lateral">
                                                Actividades disponibles
                                            </h3>
                                            <ul className="actividades">
                                                {publicacion.actividades.map(actividad => (

                                                    <li key={actividad.id}>
                                                        {actividad.nombre}
                                                        <span><i className={actividad.tipoActividad.icono}></i></span>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                        <div className="comentarios">
                                            <h3 className="mb-5"> {comentarios.length} comentarios </h3>
                                            <ul className="lista-comentarios">
                                                {comentarios.map(com => (
                                                    <Comentario key={com.id} comentario={com} />
                                                ))}
                                            </ul>
                                            <div className="form-comentario">
                                                <h3 className="mb-5">Deja tu comentario</h3>
                                                <form onSubmit={comentar} className="p-5 bg-light text-dark">
                                                    <div className="form-group">
                                                        <label htmlFor="comentario">Comentario</label>
                                                        <textarea
                                                            onChange={(e) => { setComentario({ ...comentario, Contenido: e.target.value }) }}
                                                            value={comentario.Contenido}
                                                            className="form-control"
                                                            id="comentario"
                                                            rows="10"
                                                            cols="30"
                                                            maxLength="500"
                                                        >
                                                        </textarea>

                                                    </div>
                                                    <div className="form-group">
                                                        <input type="submit" value="Publicar" className="btn btn-primary"></input>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
            }


        </div>

    );
}

export default InfoPublicacion;
