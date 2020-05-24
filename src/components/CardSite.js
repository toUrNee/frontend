import React from 'react';

//template de tarjeta par aun sitio turistico
const CardSite = (props) => {
    return ( 
        <div class="col-lg-4 col-md-6 sitio-item filter-app">
            <div class="sitio-wrap">
                <img src="https://picsum.photos/286/180"  class="img-fluid" alt="portada publicacion" />
                <div class="sitio-links">
                    <a href="https://picsum.photos/286/180"  data-gall="sitioGallery" class="venobox" title="App 1"><i class="icofont-plus-circle"></i></a>
                    <a href="#" title="More Details"><i class="icofont-link"></i></a>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{props.nombre}</h2>
                    <p className="card-text">{props.descripcion}</p>
                </div>
            </div>
        </div>
     );
}
 
export default CardSite;