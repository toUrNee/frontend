import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PublicacionContext } from '../../context/PublicacionContext';
import { SitioContext } from '../../context/SitioContext';
import Swal from 'sweetalert2'
import default_src from '../../images/crear-sitio-tur.png';

//template de tarjeta par aun sitio turistico
const CardSitio = (props) => {

    const location = useLocation();
    const { deletePublicacionesById } = useContext(PublicacionContext)
    const { deleteSitioById } = useContext(SitioContext)

    const [image, setImage] = useState({ src: "", hash: Date.now() })

    const borrarPublicacion = () => {
        Swal.fire({
            title: '¿Seguro deseas eliminar esta publicación?',
            text: "Estos cambios serán irrevertibles!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
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

    const borrarSitio = () => {
        Swal.fire({
            title: '¿Seguro deseas eliminar este sitio?',
            text: "Estos cambios serán irrevertibles y las publicaciones asociadas también se eliminarán!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.value) {
                deleteSitioById(props.id, props.index)
                Swal.fire(
                    'Listo!',
                    'Tu sitio ha sido eliminado con éxito.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        setImage({ src: process.env.REACT_APP_BACK_URL + "/Archivo_SitioTuristico/sitio/" + props.sitioId + "/random", hash: Date.now() })
    }, [props.sitioId])

    return (
        <div className="col-lg-4 col-md-6 perfil-item filter-app">
            <div className="perfil-wrap">
                <img
                    src={image.src + "?" + image.hash}
                    alt="Imagen sitio"
                    className="card-img-top"
                    onError={() => setImage({ src: default_src, hash: Date.now() })}
                />
                {
                    location.pathname === '/perfil/sitios' ?
                        <>
                            <div className="perfil-links">
                                <Link to={{
                                    pathname: "/editar-sitio-turistico",
                                    state: { sitio: props.sitio.id }
                                }}
                                    data-gall="perfilGallery"
                                    className="venobox"
                                    title="Editar">
                                    <i className="far fa-edit"></i>
                                </Link>
                                <Link to="#" data-gall="portfolioGallery" className="venobox" title="Eliminar" onClick={borrarSitio}>
                                    <i className="far fa-trash-alt"></i>
                                </Link>
                            </div>
                            <div className="perfil-info">
                                <h4>{props.sitio.nombre}</h4>
                            </div>
                        </>
                        :
                        <>
                            <div className="perfil-links">
                                <Link to={{
                                    pathname: "/editar-plan",
                                    state: { publicacion: props.id }
                                }}
                                    data-gall="perfilGallery"
                                    className="venobox"
                                    title="Editar">
                                    <i className="far fa-edit"></i>
                                </Link>
                                <Link to="#" data-gall="portfolioGallery" className="venobox" title="Eliminar" onClick={borrarPublicacion}>
                                    <i className="far fa-trash-alt"></i>
                                </Link>
                                <Link to="#" data-gall="portfolioGallery" className="venobox" title="Eliminar" data-toggle="modal" data-target="#exampleModal">
                                    <i className="fa fa-calendar-check-o"></i>
                                </Link>
                            </div>

                            <p className="titulo-plan">{props.nombre}</p>
                        </>
                }

            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" />
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardSitio;