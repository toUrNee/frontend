import React from 'react';
import '../styles/PerfilPropietario.css'
import Moment from 'react-moment';

const CardInteres = (props) => {
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
                    <button type="button" className="btn btn-success"> <i className="far fa-bell"></i> Reservar </button>
                    <button type="button" className="btn btn-danger" onClick={() => props.deleteInteres(props.user.id, props.interes.publicacion.id)}> <i className="far fa-trash-alt"></i> Eliminar </button>
                </div>
            </div>
        </div>
    );
}

export default CardInteres;