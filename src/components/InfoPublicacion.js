import React, { useContext, useEffect, useState } from 'react';
import '../styles/InfoPublicacion.css'
import { PublicacionContext } from '../context/PublicacionContext';
import { AuthContext } from '../context/AuthContext';
import { ReservaContext } from '../context/ReservaContext';
import Swal from 'sweetalert2'
import defaultImg from '../images/no-image.jpg';


//mirrar error de petición doble al eliminar o hacer reserva
const InfoPublicacion = (props) => {

    const { match } = props;
    let { idPublicacion } = match.params;

    const { loading, publicacion, getPublicacionById, numImagenes } = useContext(PublicacionContext)
    const { user, isAuthenticated } = useContext(AuthContext)
    const { existeInteres, getInteres, postInteres, deleteInteres, existeReserva, getReserva, postReserva, deleteReserva } = useContext(ReservaContext)

    const [fecha, setFecha] = useState(new Date)

    const agregar = () => {
        console.log("HOLA")
    }

    const agregarImagen = (num) => {
        let imgs = []
        if(!num)
        {
            imgs.push(
                <div className='carousel-item active'>
                    <img src={defaultImg} className="d-block w-100" alt="..." />
                </div>
            )
        }
        for (let i = 0; i < num; i++) {
            imgs.push(
                <div className={i===0 ? 'carousel-item active' : 'carousel-item'}>
                    <img src={process.env.REACT_APP_BACK_URL + '/Archivo_SitioTuristico/sitio/'+ publicacion.sitio.id +'/'+ i} className="d-block w-100" alt="..." />
                </div>
            )
        }
        return imgs;
    }

    const hacerReserva = () => {
        Swal.fire({
            title: '¿Seguro de que deseas hacer una reserva para este plan?',
            html: '<div className="form-group col">' +
                '<label htmlFor="Fecha">Fecha</label>' +
                '<input name="Fecha" className="form-control" type="date" min={date} onChange={console.log(value)} />' +
                '</div>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, deseo hacer la reserva'
        }).then((result) => {
            if (result.value) {
                postReserva(user.id, publicacion.id)
                if (existeInteres) {
                    deleteInteres(user.id, publicacion.id)
                }
                Swal.fire(
                    'Listo!',
                    'Tu reserva ha sido creada éxito.',
                    'success'
                )
            }
        })
    }

    const eliminarReserva = () => {
        Swal.fire({
            title: '¿Seguro de que deseas remover esta reserva?',
            text: "Estos cambios podrían ser irrevertibles!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sí, deseo remover la reserva'
        }).then((result) => {
            if (result.value) {
                deleteReserva(user.id, publicacion.id)
                Swal.fire(
                    'Listo!',
                    'Tu reserva ha sido eliminada éxito.',
                    'success'
                )
            }
        });
    }

    useEffect(() => {
        getPublicacionById(idPublicacion)
    }, [getPublicacionById, idPublicacion])

    useEffect(() => {
        if (publicacion !== null && user !== null) {
            getInteres(user.id, publicacion.id)
            getReserva(user.id, publicacion.id)
        }
    }, [user, publicacion, getInteres, getReserva])

    return (
        <div>
            {loading ?
                <div className="text-center">
                    < div className="spinner-grow" role="status" >
                        <span className="sr-only"></span>
                    </div >
                </div >
                :
                publicacion === null ?
                    <div className="container-fluid">
                        <div className="text-center portada" style={{ marginBottom: 10, backgroundImage: `url("https://i.pinimg.com/originals/af/4c/57/af4c571f547a74ae7a0dbda30a79c509.jpg")` }}>
                            <span className="clasificacion bg-success ">Error 404</span>
                            <h1>Publicación no encontrada</h1>
                        </div>
                    </div>
                    :
                    <div className="container-fluid">
                        <div className="text-center portada" style={{ marginBottom: 10, backgroundImage: `url("https://i.pinimg.com/originals/af/4c/57/af4c571f547a74ae7a0dbda30a79c509.jpg")` }}>
                            <span className="clasificacion bg-success ">{publicacion.sitio.region}</span>
                            <h1>{publicacion.titulo}</h1>
                            <span className="autor">- {publicacion.propietario.nombres} -</span>
                        </div>
                        <section className="publicacion">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12 col-lg-8 principal">
                                        {!isAuthenticated || user.id === publicacion.propietario.id ?
                                        null :
                                            <div className="botones text-right">
                                                <div>
                                                    {existeReserva ?
                                                        <div>
                                                            <button type="button" className="btn btn-danger" disabled>
                                                                <i className='far fa-heart' ></i> Guardar
                                                        </button>
                                                            <button type="button" className="btn btn-success disabled" onClick={eliminarReserva}>
                                                                <i className="far fa-bell-slash"></i>Remover reserva
                                                        </button>
                                                        </div>
                                                        :
                                                        <div>
                                                            {existeInteres ?
                                                                <button type="button" className="btn btn-danger" onClick={() => deleteInteres(user.id, publicacion.id)} >
                                                                    <i className='fas fa-heart' ></i> Guardado
                                                            </button>
                                                                :
                                                                <button type="button" className="btn btn-danger" onClick={() => postInteres(user.id, publicacion.id)} >
                                                                    <i className='far fa-heart' ></i> Guardar
                                                            </button>
                                                            }
                                                            <button type="button" className="btn btn-success" onClick={hacerReserva}>
                                                                <i className="far fa-bell"></i> Reservar
                                                        </button>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        }
                                        <div className="description">
                                            <h2>Descripcion del plan <button type="button" className="btn btn-warning">  ${publicacion.precio} </button> </h2>
                                            <p>{publicacion.descripcion}</p>

                                            <h4>Descripcion del sitio</h4>
                                            <p>{publicacion.sitio.descripcion}</p>
                                        </div>
                                        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                            <div className="carousel-inner">
                                                {agregarImagen(numImagenes)}
                                            </div>
                                            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-12 col-lg-4 lateral">
                                        <div className="lateral-box">
                                            <h3 className="titulo-lateral">
                                                Actividades disponibles
                                </h3>
                                            <ul className="actividades">
                                                {publicacion.actividades.map(actividad => (

                                                    <li key={actividad.id}>
                                                        {actividad.nombre}
                                                        <span><i className={actividad.tipoActividad.icono}></i></span>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                        <div className="comentarios">
                                            <h3 className="mb-5"> 2 comentarios </h3>
                                            <ul className="lista-comentarios">
                                                <li className="comentario">
                                                    <div className="bandera-comentario">
                                                        <img src="https://www.pngkit.com/png/detail/859-8594728_cono-con-bandera-de-colombia-circle.png" className="bandera" alt="Bandera comentario" />
                                                    </div>
                                                    <div className="texto-comentario">
                                                        <h3>Nombre usuario</h3>
                                                        <div className="meta">Junio 4, 2020</div>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                                    </div>
                                                </li>

                                                <li className="comentario">
                                                    <div className="bandera-comentario">
                                                        <img src="https://www.pngkit.com/png/detail/859-8594728_cono-con-bandera-de-colombia-circle.png" className="bandera" alt="Bandera comentario" />
                                                    </div>
                                                    <div className="texto-comentario">
                                                        <h3>Nombre usuario</h3>
                                                        <div className="meta">Junio 4, 2020</div>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ullamcorper magna non mi volutpat rhoncus. Donec dignissim bibendum ante, sed volutpat nulla. Curabitur congue congue neque, eu molestie dolor dapibus vel. Quisque ut elementum sem, sit amet porta diam. Fusce finibus lectus et diam consectetur commodo. Proin sit amet sem nec orci condimentum faucibus. Curabitur sodales urna metus, sit amet ullamcorper erat placerat et. Nam ac ipsum vulputate, iaculis nibh rhoncus, luctus felis. Phasellus cursus pretium ipsum, a aliquam nisi euismod quis. Vivamus at rhoncus arcu. In hac habitasse platea dictumst.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="form-comentario">
                                                <h3 className="mb-5">Deja tu comentario</h3>
                                                <form className="p-5 bg-light text-dark">
                                                    <div className="form-group">
                                                        <label htmlFor="comentario">Comentario</label>
                                                        <textarea className="form-control" id="comentario" rows="10" cols="30"></textarea>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="submit" value="Publicar" className="btn btn-primary"></input>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
            }
        </div>

    );
}

export default InfoPublicacion;
