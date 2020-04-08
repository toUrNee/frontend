import React, { Component } from 'react';
import amazonas from '../images/amazonas.jpg'
import andina from '../images/andina.jpg'
import caribe from '../images/caribe.jpg'
import orinoquia from '../images/orinoquia.jpg'
import pacifico from '../images/pacifico.jpg'

class Region extends Component {
    render() {
        return (

                <div className="row">
                    <div className="col">
                        <h2>
                            {this.props.titulo}
                        </h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    <div className="col">
                        <img className="img-fluid mx-auto d-block" src={amazonas} alt="" height="70%"></img>
                    </div>
                </div>

        );
    }
}

export default Region;