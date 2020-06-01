import React from 'react';
import { Link } from 'react-router-dom';

//template de tarjeta par aun sitio turistico
const CardSitio = (props) => {
    return (
        
        <div className="col-lg-4 col-md-6 perfil-item filter-app">
            <div className="perfil-wrap">
                <img src="https://picsum.photos/500/400" className="img-fluid" alt="" />
                <div className="perfil-links">
                    <Link to={{
                        pathname: "/editar-sitio-turistico",
                        state: {sitio: props.id, index: props.index}
                        }} 
                        data-gall="perfilGallery" 
                        className="venobox" 
                        title="Editar"><i 
                        className="far fa-edit"></i>
                    </Link>
                    <Link to="/" title="Eliminar"><i className="far fa-trash-alt"></i></Link>
                </div>
                <div className="perfil-info">
                    <h4>{props.nombre}</h4>
                    <p>.</p>
                </div>
            </div>
        </div>
     );
}

export default CardSitio;