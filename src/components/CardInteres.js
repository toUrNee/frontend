import React from 'react';
import '../styles/PerfilPropietario.css'
import Moment from 'react-moment';
import Swal from 'sweetalert2';

const CardInteres = (props) => {

    const hacerReserva = () => {
        Swal.fire({
            title: '¿Seguro de que deseas hacer una reserva para este plan?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, deseo hacer la reserva'
        }).then((result) => {
            if (result.value) {
                props.postReserva(props.user.id, props.interes.publicacion.id)
                Swal.fire(
                    'Listo!',
                    'Tu reserva ha sido creada éxito.',
                    'success'
                )
            }
        })
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
                props.deleteReserva(props.user.id, props.interes.publicacion.id)
                Swal.fire(
                    'Listo!',
                    'Tu reserva ha sido eliminada éxito.',
                    'success'
                )
            }
        });
    }
    console.log(props.existeReserva)
    return (
        <div className="card card-info mb-3 col-12 " >
            <div className="row no-gutters">
                <div className="col-md-9" style={{padding:'15px'}}>
                    <div className="card-body">
                        <h5 className="card-title">{props.interes.publicacion.titulo}</h5>
                        <p className="card-text">{props.interes.publicacion.descripcion}</p>
                        <p className="card-text">Precio: {props.interes.publicacion.precio}</p>
                        <p className="card-text"><small className="text-muted">Guardado el  <Moment format="DD/MM/YYYY" date={props.interes.fecha}/></small></p>
                    </div>
                </div>
                <div className="col-md-3" style={{ textAlign: 'center', padding: '5% 0' }}>
                    {!props.existeReserva ?
                        <button type="button" className="btn btn-success" onClick={hacerReserva}> 
                            <i className="far fa-bell"></i> Reservar 
                        </button>
                    :
                        <button type="button" className="btn btn-success disabled" onClick={eliminarReserva}>
                            <i className="far fa-bell-slash"></i> Remover reserva 
                        </button>
                    }
                    <button type="button" className="btn btn-danger" onClick={() => props.deleteInteres(props.user.id, props.interes.publicacion.id)}> <i className="far fa-trash-alt"></i> Eliminar </button>
                </div>
            </div>
        </div>
    );
}

export default CardInteres;