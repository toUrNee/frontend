import React, { createContext, Component } from 'react'
import axios from 'axios'

import { store } from 'react-notifications-component'

export const SitioContext = createContext()

class SitioContextProvider extends Component {
    state = { 
        sitios: [],
        loading: true,
        propietario: false,
    }

    crearSitio = () => {
        this.setState({
            ...this.state,
            propietario: true,
            error: null
        })
        localStorage.setItem('propietario', 1)
        store.addNotification({
            title: "Listo",
            message: "Ahora eres propietario",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeInDown"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: false
            }
        });
    }

    //Traer los sitios turisticos
    getSitios = () => {
        axios.get(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos')
        .then(res =>{
            this.setState({
                ...this.state,
                sitios: res.data,
                loading: false
            })
        })
        .catch( error =>{
            console.log(error)
            this.setState({
                ...this.setState({
                    ...this.state,
                    sitios: []
                })
            })
        })
    }

    getSitiosById = (id) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos/propietario/' + id)
            .then(res => {
                this.setState({
                    ...this.state, 
                    sitios: res.data,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    sitios: []
                })
            })
    }

    

    render() { 
        return ( 
            <SitioContext.Provider value={{
                ...this.state,
                getSitios: this.getSitios,
                getSitiosById:this.getSitiosById,
            }}>
                {this.props.children}
            </SitioContext.Provider>
        );
    }
}
 
export default SitioContextProvider;