import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import NavPropietario from './NavPropietario';
import CardInteres from './CardInteres';
import { ReservaContext } from '../context/ReservaContext';

const MisIntereses = (props) => {
    const { user } = useContext(AuthContext)
    const { intereses, getInteresByUser, loadingReserva, deleteInteres, postReserva, deleteReserva, getReservasByUserId, existeReserva } = useContext(ReservaContext)

    useEffect(() => {
        getInteresByUser(user.id)
    }, [intereses, getInteresByUser , user.id, deleteInteres, existeReserva])

    return (
        <section id="perfil" className="perfil">
            {loadingReserva ?
                <div className="text-center">
                    < div className="spinner-grow" role="status" >
                        <span className="sr-only"></span>
                    </div >
                </div >
                :
                <div className="container">
                    <div className="section-title">
                        <h2>Publicaciones</h2>
                        <p>Guardadas</p>
                    </div>
                    <NavPropietario
                        perfil=""
                        sitios=""
                        planes=""
                        reservas=""
                        intereses="filter-active"
                    />
                    <div className="row justify-content-md-center">
                        {intereses.length === 0 ?
                            <p>Aun no guardas ninguna publicación, te invitamos a seguir buscando un plan que te agrade</p>
                            :
                            intereses.map(interes => (
                                <CardInteres
                                    //key={interes.id}
                                    interes={interes}
                                    deleteInteres={deleteInteres}
                                    user={user}
                                    postReserva={postReserva}
                                    getReservasByUserId={getReservasByUserId}
                                    deleteReserva={deleteReserva}
                                    existeReserva={existeReserva}
                                />
                            ))}
                    </div >
                </div>
            }
        </section >
    );
}

export default MisIntereses;