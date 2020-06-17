import React, { createContext, Component } from 'react'
import axios from 'axios'

export const SitioContext = createContext()

class SitioContextProvider extends Component {
    state = { 
        sitios: [],
        loading: true,
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

    deleteSitioById = (id, index) => {
        axios.delete(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos/' + id)
        .then(res => {
            var aux = this.state.sitios
            aux.splice(index,1)
            this.setState({
                ...this.state,
                sitios: aux,
                loading: false
            })
        })
        .catch(error =>{
            console.log(error)
            this.setState({
                ...this.state,
                loading: false
            })
        })
    }

    render() { 
        return ( 
            <SitioContext.Provider value={{
                ...this.state,
                getSitios: this.getSitios,
                getSitiosById: this.getSitiosById,
                deleteSitioById: this.deleteSitioById,
            }}>
                {this.props.children}
            </SitioContext.Provider>
        );
    }
}
 
export default SitioContextProvider;