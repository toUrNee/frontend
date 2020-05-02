import React, { Component } from 'react';
import img from '../images/post13.jpg';

class Post extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="card-columns">
            <div className="card">
              <a className="post" href="#">
                <img className="card-img-top" src="https://images.unsplash.com/photo-1529220813929-597ff9755c1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80" alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur, doloremque!</h5>
                  <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio iusto maxime nemo omnis praesentium similique.</p>
                  <p className="card-text"><small className="text-muted">
                    <svg className="bi bi-bell" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16a2 2 0 002-2H6a2 2 0 002 2z" />
                      <path fillRule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0113 6c0 .88.32 4.2 1.22 6z" clipRule="evenodd" />
                    </svg>1000<i className="far fa-user"></i>admin<i className="fas fa-calendar-alt"></i>Jan 20, 2018</small></p>
                </div>
              </a>
            </div>
            <div class="card">
              <img class="card-img" src="..." alt="Bologna" />
              <div class="card-img-overlay">
                <a href="#" class="btn btn-light btn-sm">Cooking</a>
              </div>
              <div class="card-body">
                <h4 class="card-title">Pasta with Prosciutto</h4>
                <small class="text-muted cat">
                  <i class="far fa-clock text-info"></i> 30 minutes
                 <i class="fas fa-users text-info"></i> 4 portions
                </small>
                <p class="card-text">I love quick, simple pasta dishes, and this is one of my favorite.</p>
                <a href="#" class="btn btn-info">Read Recipe</a>
              </div>
              <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                <div class="views">Oct 20, 12:45PM
                </div>
                <div class="stats">
                  <i class="far fa-eye"></i> 1347
                  <i class="far fa-comment"></i> 12
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="post post-row">
                                <a className="post-img" href="blog-post.html"><img src={img} alt="" /></a>
                                <div className="post-body">
                                    <div className="post-category">
                                        <a href="category.html">Travel</a>
                                        <a href="category.html">Lifestyle</a>
                                    </div>
                                    <h3 className="post-title"><a href="blog-post.html">Mel ut impetus suscipit tincidunt. Cum id ullum laboramus persequeris.</a></h3>
                                    <ul className="post-meta">
                                        <li><a href="author.html">John Doe</a></li>
                                        <li>20 April 2018</li>
                                    </ul>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col card_col" >
                            <div className="card box-shadow">
                                <img className="card-img-top" src="https://picsum.photos/286/180" alt="portada publicacion" />
                                <div className="card-body">
                                    <h5 className="card-title">Titulo </h5>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
                                    <a href="#" className="btn btn-primary">Ver mas</a>
                                    <a href="#" className="card-link">Card link</a>
                                    <a href="#" className="card-link">Another link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>*/}
      </div>

    );
  }
}

export default Post;