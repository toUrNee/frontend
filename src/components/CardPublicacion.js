import React from 'react';

const Card = (props) => {
    return (
        <div className="card" key={props.id}>
            <a href="#">
                <img className="card-img-top" src="https://picsum.photos/800/400" alt="Card image cap" />
                <div className="card-img-overlay d-flex justify-content-end">
                    <a href="#" className="card-link text-danger like">
                        {/* Corazón relleno color
                        <i className="fas fa-heart"></i>*/}
                        <i className="far fa-heart"></i>
                    </a>
                </div>
                <div className="card-img-overlay">
                    <a href="#" className="btn btn-warning btn-sm ">{'$ ' + props.precio}</a>
                </div>
                <div className="card-body">
                    <h2 className="card-title">{props.titulo}</h2>
                    <p className="card-text">{props.descripcion}</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                    {/*<div className="date">
                        <i className="far fa-calendar-alt"></i>{fecha}

                    </div>*/}
                    <div className="stats">
                        <i className="far fa-comment text-primary"></i> 13
                    <i className="fas fa-star text-warning"></i> 4.5
                    </div>
                </div>
            </a>
        </div>
    );
}
 
export default Card;
