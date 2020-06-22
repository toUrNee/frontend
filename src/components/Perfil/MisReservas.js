import React, { useContext, useEffect } from 'react';
import NavPropietario from './NavPropietario';
import CardReserva from './CardReserva';
import { ReservaContext } from '../../context/ReservaContext';
import { AuthContext } from '../../context/AuthContext';

const MisReservas = (props) => {
    
    const { reservas, getReservasByUserId, deleteReserva } = useContext(ReservaContext)
    const { user } = useContext(AuthContext)
    
    useEffect(() => {
        getReservasByUserId(user.id)
    }, [getReservasByUserId, user])
    
    return (
        <section id="perfil" className="perfil">
            <div className="container">
                <div className="section-title">
                    <h2>Planes</h2>
                    <p>Reservados</p>
                </div>
                <NavPropietario
                    perfil=""
                    sitios=""
                    planes=""
                    reservas="filter-active"
                    intereses=""
                />
                <div className="container">
                    <div className="row justify-content-md-center">
                        { reservas.length === 0 ?
                           <p>Parece que no tienes planes reservados, visita nuestros planes y haz una reserva ahora mismo.</p>
                        :
                            reservas.map((reserva, index) => (
                                <CardReserva
                                    key={reserva.publicacion.id}
                                    reserva={reserva}
                                    deleteReserva={deleteReserva}
                                    user={user}
                                    index={index}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MisReservas;