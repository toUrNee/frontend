import React, { createContext, Component } from 'react';
import axios from 'axios'

export const SitioContext = createContext()

class SitioContextProvider extends Component {
    state = { 
        sitios: [],
        loading: true
    }

    //Traer los sitios turisticos
    getSitios = () => {
        axios.get(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos')
        .then(res =>{
            this.setState({
                ...this.state,
                sitios: [],
                loading: false
            })
        })
        .catch( error =>{
            console.log(error)
            this.setState({
                ...this.setState({
                    ...this.state,
                    sitios: [],
                    loading: true
                })
            })
        })
    }


    render() { 
        return ( 
            <SitioContext.Provider value={{
                ...this.state,
                getSitios: this.getSitios,
            }}>
                {this.props.children}
            </SitioContext.Provider>
        );
    }
}
 
export default SitioContextProvider;