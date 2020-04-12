import React, { Component } from 'react';
import amazonas from '../images/amazonas.jpg'
import andina from '../images/andina.jpg'
import caribe from '../images/caribe.jpg'
import orinoquia from '../images/orinoquia.jpg'
import pacifico from '../images/pacifico.jpg'


class Region extends Component {

    async componentDidMount(){
        const base_url='https://localhost:5001/api'
        const response = await fetch (base_url+'/Publicaciones/Region/3')
        const data = await response.json()
        console.log(data)
    }

    render() {
        return (

                <div className="container">
                    
                </div>

        );
    }
}

export default Region;