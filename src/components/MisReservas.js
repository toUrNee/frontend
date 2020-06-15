import React from 'react';
import NavPropietario from './NavPropietario';
import CardReserva from './CardReserva';

const MisReservas = (props) => {
    

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
                    <div className="row">
                        {/*Aqui va el map de reservas
                        <CardReserva />
                        */}

                        <CardReserva />

                    </div>
                </div>
            </div>
        </section>
    );
}

export default MisReservas;