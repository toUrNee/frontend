import React from 'react';

//template de tarjeta par aun sitio turistico
const CardSitio = (props) => {
    return (
        
        <div className="col-lg-4 col-md-6 portfolio-item filter-app">
            <div className="portfolio-wrap">
                <img src="https://picsum.photos/500/400" className="img-fluid" alt="" />
                <div className="portfolio-links">
                    <a href="/" data-gall="portfolioGallery" className="venobox" title="App 1"><i className="far fa-edit"></i></a>
                    <a href="/" title="More Details"><i className="far fa-trash-alt"></i></a>
                </div>
                <div className="portfolio-info">
                    <h4>{props.nombre}</h4>
                    <p>.</p>
                </div>
            </div>
        </div>
     );
}

export default CardSitio;