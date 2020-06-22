import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PublicacionContext } from '../../context/PublicacionContext';
import { SitioContext } from '../../context/SitioContext';
import Swal from 'sweetalert2'
import default_src from '../../images/crear-sitio-tur.png';
import Moment from 'react-moment';
import axios from 'axios'

//template de tarjeta par aun sitio turistico
const CardSitio = (props) => {

    const location = useLocation();
    const { deletePublicacionesById } = useContext(PublicacionContext)
    const { deleteSitioById } = useContext(SitioContext)

    const [image, setImage] = useState({ src: "", hash: Date.now() })
    const [reservas, setReservas] = useState([])
    const [actualizar, setActualizar] = useState(false)
    const [reservaState, setReservaState] = useState({
        Fecha: '',
        UsuarioId: '',
        PublicacionId: '',
        EstadoReservaId: 0,
    })

    useEffect(() => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Reserva/publicacion/' + props.id)
            .then(res => {
                setReservas(res.data)
            })
            .catch(err => {
                console.log(err);
                setReservas([])
            })
            
    }, [props.id, reservaState, actualizar])

    const actualizarReserva = (_reserva, _estadoReserva) => {
        setReservaState({
            Fecha: _reserva.fecha,
            UsuarioId: _reserva.usuario.id,
            PublicacionId: props.id,
            EstadoReservaId: _estadoReserva,
        })
    }

    const borrarPublicacion = () => {
        Swal.fire({
            title: '¿Seguro deseas eliminar esta publicación?',
            text: "Estos cambios serán irrevertibles!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.value) {
                deletePublicacionesById(props.id, props.index)
                Swal.fire(
                    'Listo!',
                    'Tu publicación ha sido eliminada con éxito.',
                    'success'
                )
            }
        })
    }

    const borrarSitio = () => {
        Swal.fire({
            title: '¿Seguro deseas eliminar este sitio?',
            text: "Estos cambios serán irrevertibles y las publicaciones asociadas también se eliminarán!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.value) {
                deleteSitioById(props.id, props.index)
                Swal.fire(
                    'Listo!',
                    'Tu sitio ha sido eliminado con éxito.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        setImage({ src: process.env.REACT_APP_BACK_URL + "/Archivo_SitioTuristico/sitio/" + props.sitioId + "/random", hash: Date.now() })
    }, [props.sitioId])


    useEffect(() => {
        
        if(reservaState.EstadoReservaId){
            
            axios.put(process.env.REACT_APP_BACK_URL + '/Reserva/publicacion/' + props.id + '/usuario/' + reservaState.UsuarioId, reservaState)
            .then(() => {
                Swal.fire(
                    'Listo',
                    'Reserva actualizada.',
                    'success'
                  )
                  setActualizar(!actualizar)
            })
            .catch(err => {
                console.log(err);
            })
        }
        // eslint-disable-next-line
    }, [reservaState])

    return (
        <div className="col-lg-4 col-md-6 perfil-item filter-app">
            <div className="perfil-wrap">
                <img
                    src={image.src + "?" + image.hash}
                    alt="Imagen sitio"
                    className="card-img-top"
                    onError={() => setImage({ src: default_src, hash: Date.now() })}
                />
                {
                    location.pathname === '/perfil/sitios' ?
                        <>
                            <div className="perfil-links">
                                <Link to={{
                                    pathname: "/editar-sitio-turistico",
                                    state: { sitio: props.sitio.id }
                                }}
                                    data-gall="perfilGallery"
                                    className="venobox"
                                    title="Editar">
                                    <i className="far fa-edit"></i>
                                </Link>
                                <Link to="#" data-gall="portfolioGallery" className="venobox" title="Eliminar" onClick={borrarSitio}>
                                    <i className="far fa-trash-alt"></i>
                                </Link>
                            </div>
                            <div className="perfil-info">
                                <h4>{props.sitio.nombre}</h4>
                            </div>
                        </>
                        :
                        <>
                            <div className="perfil-links">
                                <Link to={{
                                    pathname: "/editar-plan",
                                    state: { publicacion: props.id }
                                }}
                                    data-gall="perfilGallery"
                                    className="venobox"
                                    title="Editar">
                                    <i className="far fa-edit"></i>
                                </Link>
                                <Link to="#" data-gall="portfolioGallery" className="venobox" title="Eliminar" onClick={borrarPublicacion}>
                                    <i className="far fa-trash-alt"></i>
                                </Link>
                                <Link to="#" data-gall="portfolioGallery" className="venobox" title="Eliminar" data-toggle="modal" data-target={"#exampleModal" + props.id}>
                                    <i className="fa fa-calendar-check-o"></i>
                                </Link>
                            </div>

                            <p className="titulo-plan">{props.nombre}</p>
                        </>
                }

            </div>
            <div className="modal fade bd-example-modal-lg" id={'exampleModal' + props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reservas</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body container">
                            {reservas.map(reservaa => (
                                <div className="row" key={reservaa.usuario.id}>
                                    <div className="col-lg-4 col-md-6">
                                        <h5>Fecha de la reserva</h5>
                                        <p><Moment format="DD/MM/YYYY" date={reservaa.fecha} /></p>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <h6>Datos del usuario</h6>
                                        <p>{reservaa.usuario.nombres}</p>
                                        <p>{reservaa.usuario.telefono}</p>
                                        <p>{reservaa.usuario.email}</p>
                                    </div>
                                    <div className="col-lg-4 col-md-12">
                                        {reservaa.estadoReserva.id === 1 ?
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button type="button" className="btn btn-success" onClick={() => actualizarReserva(reservaa, 2)}><i className="fas fa-check" /> Confirmar</button>
                                                <button type="button" className="btn btn-danger" onClick={() => actualizarReserva(reservaa, 3)}><i className="fas fa-times" /> Rechazar</button>
                                            </div>
                                            : reservaa.estadoReserva.id === 2 ?
                                                <button type="button" className="btn btn-success" onClick={() => actualizarReserva(reservaa, 1)}><i className="fas fa-check" /> Confirmado</button>
                                                :
                                                <button type="button" className="btn btn-danger" onClick={() => actualizarReserva(reservaa, 1)}><i className="fas fa-times" /> Rechazado </button>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardSitio;