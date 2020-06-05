import React from 'react';
import '../styles/InfoPublicacion.css'

const InfoPublicacion = (props) => {
    return (
        <div className="container-fluid">
            <div className="text-center portada" style={{ marginBottom: 10, backgroundImage: `url("https://i.pinimg.com/originals/af/4c/57/af4c571f547a74ae7a0dbda30a79c509.jpg")` }}>
                <span className="clasificacion bg-success ">Region</span>
                <h1>TITULO SUPER HIPER MEGA LARGO DE LA VIDA MUNDIAL</h1>
                <span className="autor">- Nombre propietario -</span>
            </div>
            <section className="publicacion">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 col-lg-9 principal">
                            <div className="botones text-right">
                                <button type="button" className="btn btn-danger"> <i className="far fa-heart"></i> Guardar </button>
                                <button type="button" class="btn btn-success"> <i class="far fa-bell"></i> Reservar </button>
                            </div>
                            <div className="description">
                                <h2>Descripcion del plan</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum pellentesque ultrices. Praesent suscipit mattis magna id ornare. Fusce tempus pulvinar sapien eget pellentesque. Vestibulum justo lorem, aliquet id aliquam sit amet, tristique id tortor. In finibus justo ac nulla venenatis, posuere fermentum lacus facilisis. Morbi ante elit, vehicula eget.</p>

                                <h4>Descripcion del sitio</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis interdum pellentesque ultrices. Praesent suscipit mattis magna id ornare. Fusce tempus pulvinar sapien eget pellentesque. Vestibulum justo lorem, aliquet id aliquam sit amet, tristique id tortor. In finibus justo ac nulla venenatis, posuere fermentum lacus facilisis. Morbi ante elit, vehicula eget.</p>
                            </div>
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="https://i.pinimg.com/originals/bc/69/15/bc6915193da74ba40629533db07966e8.jpg" className="d-block w-100" alt="..." />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://static.vecteezy.com/system/resources/previews/000/239/809/original/vector-beautiful-nature-illustration.jpg" className="d-block w-100" alt="..." />
                                    </div>
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
                            <div className="categorias">
                                <h5>Tipos de actividades: <span>Act 1</span> <span>Act 1</span> </h5>
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
                                        <div class="form-group">
                                            <label for="comentario">Comentario</label>
                                            <textarea name class="form-control" id="comentario" rows="10" cols="30"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <input type="submit" value="Publicar" class="btn btn-primary"></input>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-3 lateral"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default InfoPublicacion;