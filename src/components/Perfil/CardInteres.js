import React from 'react';
import '../../styles/PerfilPropietario.css'
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';

const CardInteres = (props) => {

    const history = useHistory();

    return (
        <div className="card card-info mb-3 col-lg-5 col-md-11" style={{ margin: "5px" }}>
            <div className="row no-gutters">
                <div className="col-md-8" style={{ padding: '15px' }}>
                    <div className="card-body">
                        <h5 className="card-title">{props.interes.publicacion.titulo}</h5>
                        <p className="card-text">{props.interes.publicacion.descripcion}</p>
                        <p className="card-text">Precio: <NumberFormat value={props.interes.publicacion.precio} displayType={'text'} thousandSeparator={true} prefix={'$'} /></p>
                        <p className="card-text"><small className="text-muted">Guardado el  <Moment format="DD/MM/YYYY" date={props.interes.fecha} /></small></p>
                    </div>
                </div>
                <div className="col-md-4" style={{ textAlign: 'center', padding: '5% 0' }}>
                    <button type="button" className="btn btn-info" onClick={() => history.push('/publicacion/' + props.interes.publicacion.id)}>
                        <i class="fas fa-info-circle"></i> Ver más
                        </button>
                    <button type="button" className="btn btn-danger" onClick={() => props.deleteInteres(props.user.id, props.interes.publicacion.id, props.index)}>
                        <i className="far fa-trash-alt"></i> Eliminar
                        </button>
                </div>
            </div>
        </div>
    );
}

export default CardInteres;