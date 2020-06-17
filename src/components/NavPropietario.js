import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import '../styles/PerfilPropietario.css'
import { AuthContext } from '../context/AuthContext';

const NavPropietario = (props) => {

    const { propietario } = useContext(AuthContext)

    return (
        <div className="row">
            <div className="col-lg-12">

                {propietario ?
                    <ul id="perfil-flters">
                        <Link to="/perfil"><li className={props.perfil}>Perfil</li></Link>
                        <Link to="/perfil/reservas"><li className={props.reservas}>Reservas</li></Link>
                        <Link to="/perfil/favoritos"><li className={props.intereses}>Guardados</li></Link>
                        <Link to="/perfil/sitios"><li className={props.sitios}>Sitios</li></Link>
                        <Link to="/perfil/publicaciones"><li className={props.planes}>Planes</li></Link>
                    </ul>
                    :
                    <ul id="perfil-flters">
                        <Link to="/perfil"><li className={props.perfil}>Perfil</li></Link>
                        <Link to="/perfil/reservas"><li className={props.reservas}>Reservas</li></Link>
                        <Link to="/perfil/favoritos"><li className={props.intereses}>Guardados</li></Link>
                    </ul>
                }

            </div>
        </div>
    );
}

export default NavPropietario;