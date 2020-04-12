import React, { Component } from 'react';
import amazonas from '../images/amazonas.jpg'
import andina from '../images/andina.jpg'
import caribe from '../images/caribe.jpg'
import orinoquia from '../images/orinoquia.jpg'
import pacifico from '../images/pacifico.jpg'


class Region extends Component {

    async componentDidMount(){
        let region_id = this.props.location.state.region_id.id
        const base_url='https://localhost:5001/api'
        const response = await fetch (base_url+'/Publicaciones/region/'+region_id)
        const data = await response.json()
        //Aqui esta la lista de las publicaciones por region
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