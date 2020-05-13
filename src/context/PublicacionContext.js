import React, { createContext, Component } from 'react'
import axios from 'axios'


export const PublicacionContext = createContext()

class PublicacionContextProvider extends Component{
    state = {
        publicaciones: [],
        loading: true
    }



    //Trae las publicaciones
    getPublicaciones = () => {
        axios.get(process.env.REACT_APP_BACK_URL+'/Publicaciones')
        .then(res => {
            this.setState({
                ...this.state,
                publicaciones: res.data,
                loading: false
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                ...this.state,
                publicaciones: [],
                loading: true
            })
        })
    }

    render(){
        return(
            <PublicacionContext.Provider value={{
                ...this.state, 
                getPublicaciones:this.getPublicaciones,
            }}>
                {this.props.children}
            </PublicacionContext.Provider>
        );
    }
}

export default PublicacionContextProvider;