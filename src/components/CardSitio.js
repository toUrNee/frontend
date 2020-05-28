import React from 'react';

//template de tarjeta par aun sitio turistico
const CardSitio = (props) => {
    return (
        
        <div className="col-lg-4 col-md-6 perfil-item filter-app">
            <div className="perfil-wrap">
                <img src="https://picsum.photos/500/400" className="img-fluid" alt="" />
                <div className="perfil-links">
                    <a href="/" data-gall="perfilGallery" className="venobox" title="Editar"><i className="far fa-edit"></i></a>
                    <a href="/" title="Eliminar"><i className="far fa-trash-alt"></i></a>
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