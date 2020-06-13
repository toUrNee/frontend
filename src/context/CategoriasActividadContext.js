import React, { createContext, Component } from 'react'
import axios from 'axios'

export const CategoriasActividadContext = createContext()

class CategoriasActividadContextProvider extends Component {
    state = { 
        categorias: [],
        loading: true
    }

    //Traer las categorias
    getCategoriasActividad = () => {
        axios.get(process.env.REACT_APP_BACK_URL + '/CategoriasActividad')
        .then(res =>{
            this.setState({
                ...this.state,
                categorias: res.data,
                loading: false
            })
        })
        .catch( error =>{
            console.log(error)
            this.setState({
                ...this.state,
                categorias: [],
                loading: false
            })
        })
    }

    render() { 
        return ( 
            <CategoriasActividadContext.Provider value={{
                getCategoriasActividad: this.getCategoriasActividad
            }}>
                {this.props.children}
            </CategoriasActividadContext.Provider>
        );
    }
}
 
export default CategoriasActividadContextProvider;