import axios from 'axios'
import React, { useState, useEffect } from 'react';
import '../../styles/PerfilPropietario.css'
import Swal from 'sweetalert2';
import Moment from 'react-moment';
import default_src from '../../images/crear-sitio-tur.png';
import { Link } from 'react-router-dom';

const CardReserva = (props) => {

    const [imageUrl, setImageUrl] = useState(default_src)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACK_URL}/ArchivoSitioTuristico/GetArchivosSitioTuristico`, {
            params: {
                sitioId: props.reserva.sitioId,
                random: true,
                count: 1
            }  
        })
            .then(res => {
                setImageUrl(`${process.env.REACT_APP_BACK_URL}/ArchivoSitioTuristico/GetArchivoSitioTuristico?id=${res.data[0].Id}"`)
            })
            .catch(err => {
                console.log(err);
                setImageUrl(default_src)
            })
    }, [props.reserva.sitioId])

    const eliminarReserva = () => {
        Swal.fire({
            title: '¿Seguro que deseas remover esta reserva?',
            text: "Estos cambios podrían ser irrevertibles.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, deseo remover la reserva'
        }).then((result) => {
            if (result.value) {
                props.deleteReserva(props.user.username, props.reserva.publicacion.id, props.index)
                Swal.fire(
                    '¡Listo!',
                    'Tu reserva ha sido eliminada con éxito.',
                    'success'
                )
            }
        });
    }

    return (
        <div className="card card-reserva col-6">
            <div className="card-img-body">
                <img
                    src={imageUrl}
                    alt="Imagen plan"
                    className="card-img-top"
                    onError={() => setImageUrl(default_src)}
                />
            </div>
            <div className="card-body">
                <Link to={'/publicacion/' + props.reserva.publicacion.id}>
                    <h4 className="card-title">
                        <u>{props.reserva.publicacion.titulo}</u>
                    </h4>
                </Link>
                <p className="card-text">{props.reserva.publicacion.descripcion}</p>
                <p className="card-text">
                    <small className="text-muted">
                        Fecha de la reserva: <Moment format="DD/MM/YYYY" date={props.reserva.fecha} />
                    </small>
                </p>
                <button
                    type="button"
                    className={
                        props.reserva.estadoReservaId === 1 ?
                            "btn btn-outline-info"
                            : props.reserva.estadoReservaId === 2 ?
                                "btn btn-outline-success"
                                : "btn btn-outline-danger"
                    }
                    style={{ marginRight: '1rem' }}
                    disabled
                >
                    {props.reserva.estadoReserva.nombre}
                </button>
                <button type="button" className="btn btn-danger" onClick={eliminarReserva}> <i className="far fa-trash-alt"></i> Eliminar </button>
            </div>
        </div>
    );
}

export default CardReserva;