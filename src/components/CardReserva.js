import React from 'react';
import '../styles/PerfilPropietario.css'
import Moment from 'react-moment';

const CardReserva = (props) => {
    return (
        <div className="card card-reserva">
            <div className="card-img-body">
                <img className="card-img" src="https://picsum.photos/500/230" alt="Card cap" />
            </div>
            <div className="card-body">
                <h4 className="card-title">Card title</h4>
                <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little
                    bit longer.
          </p>
          <p className="card-text"><small className="text-muted">Guardado el  <Moment format="DD/MM/YYYY" date=''/></small></p>
                <button type="button" className="btn btn-danger" > <i className="far fa-trash-alt"></i> Eliminar </button>
            </div>
        </div>
    );
}

export default CardReserva;