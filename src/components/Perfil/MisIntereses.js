import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import NavPropietario from './NavPropietario';
import CardInteres from './CardInteres';
import { ReservaContext } from '../../context/ReservaContext';

const MisIntereses = (props) => {
    const { user } = useContext(AuthContext)
    const { intereses, getInteresByUser, loadingReserva, deleteInteres, postReserva, getReservasByUserId } = useContext(ReservaContext)

    useEffect(() => {
        getInteresByUser(user.id)
    }, [getInteresByUser , user.id])

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
                            intereses.map((interes, index) => (
                                <CardInteres
                                    key={interes.publicacion.id}
                                    interes={interes}
                                    deleteInteres={deleteInteres}
                                    user={user}
                                    index={index}
                                    postReserva={postReserva}
                                    getReservasByUserId={getReservasByUserId}
                                />
                            ))}
                    </div >
                </div>
            }
        </section >
    );
}

export default MisIntereses;