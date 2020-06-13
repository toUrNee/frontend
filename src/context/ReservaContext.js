import React, { Component, createContext } from 'react';
import axios from 'axios'

export const ReservaContext = createContext()

class ReservaContextProvider extends Component {

    state = { 
        reservas: [],
        loading: true,
        existeInteres: false,
    }
    
    getReservas = () => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Reserva/')
        .then(res => {
            this.setState({
                ...this.state,
                reservas: res.data,
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                ...this.state,
                reservas: [],
            })
        })
    }

    getInteres = (usuarioId, publicacionId) => {
        console.log(usuarioId, publicacionId)
        axios.get(process.env.REACT_APP_BACK_URL + '/Interes/publicacion/'+publicacionId+'/usuario/'+usuarioId)
        .then(res => {
            this.setState({
                ...this.state,
                existeInteres: true,
                loading:false,
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                ...this.state,
                existeInteres: false,
                loading:false,
            })
        })
    }

    getReservasByUserId = (id) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Reserva/usuario/' + id)
        .then(res => {
            this.setState({
                ...this.state,
                reservas: res.data,
            })
        })
        .catch(err =>{
            console.log(err)
            this.setState({
                ...this.state,
                reservas: []
            })
        })
    }

    /*
    getUsersByReservaId = (id) => { 
        axios.get(process.env.REACT_APP_BACK_URL + '/Reserva/' + id)
        .then(res =>{
            this.setState({
                ...this.state,
                //algo
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                ...this.state,
                //algo
            })
        })
    }
    */
   
    render() { 
        return ( 
            <ReservaContext.Provider value={{
                ...this.state,
                getReservas: this.getReservas,
                getReservasByUserId: this.getReservasByUserId,
                getInteres: this.getInteres,
            }}>
                {this.props.children}
            </ReservaContext.Provider>
         );
    }
}
 
export default ReservaContextProvider;