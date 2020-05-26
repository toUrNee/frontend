import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PerfilPropietario.css'

const NavPropietario = (props) => {
    return (
        <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12">
                <ul id="portfolio-flters">
                    <Link to="/perfil"><li className={props.perfil}>Perfil</li></Link>
                    <Link to="/perfil/sitios"><li className={props.sitios}>Sitios</li></Link>
                    <Link to="/perfil/publicaciones"><li className={props.planes}>Planes</li></Link>
                </ul>
            </div>
        </div>
    );
}

export default NavPropietario;