import React, { useContext } from 'react';
import { PublicacionContext } from '../context/PublicacionContext';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

//template de tarjeta par aun sitio turistico
const CardPublicaciones = (props) => {

    const { deletePublicacionesById } = useContext(PublicacionContext)

    const borrarPublicacion = () => {
        Swal.fire({
            title: '¿Seguro deseas eliminar esta publicación?',
            text: "Estos cambios seran irrevertibles!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {
            if (result.value) {
                deletePublicacionesById(props.id, props.index)
                Swal.fire(
                'Listo!',
                'Tu publicación ha sido eliminada con éxito.',
                'success'
                )
            }
        })
    }
   return (
    <div className="col-lg-4 col-md-6 perfil-item filter-app">
        <div className="perfil-wrap">
            <img src="https://picsum.photos/500/400" className="img-fluid" alt="" />
            <div className="perfil-links">
                <Link to="/crear-plan" data-gall="portfolioGallery" className="venobox" title="Editar">
                    <i className="far fa-edit"></i>
                </Link>
                <Link data-gall="portfolioGallery" className="venobox" title="Eliminar" onClick={borrarPublicacion}>
                    <i className="far fa-trash-alt"></i>
                </Link>
            </div>
            <div className="perfil-info">
                <h4>{props.nombre}</h4>
                <p>{props.descripcion}</p>
            </div>
        </div>
    </div>
 );
}

export default CardPublicaciones;