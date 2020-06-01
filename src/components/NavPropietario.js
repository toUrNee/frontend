import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PerfilPropietario.css'

const NavPropietario = (props) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <ul id="perfil-flters">
                    <Link to="/perfil"><li className={props.perfil}>Perfil</li></Link>
                    <Link to="/perfil/sitios"><li className={props.sitios}>Sitios</li></Link>
                    <Link to="/perfil/publicaciones"><li className={props.planes}>Planes</li></Link>
                </ul>
            </div>
        </div>
    );
}

export default NavPropietario;