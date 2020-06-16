import React, { Component, createContext } from 'react';
import axios from 'axios'

export const ReservaContext = createContext()

class ReservaContextProvider extends Component {

    state = { 
        existeReserva: false
    }
    
    getReserva = (usuarioId, publicacionId) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Reserva/publicacion/' + publicacionId + '/usuario/' + usuarioId)
        .then(() => {
            this.setState({
                ...this.state,
                existeReserva: true
            })
        })
        .catch(() => {
            this.setState({
                ...this.state,
                existeReserva: false
            })
        })
    }
    
    postReserva = (usuarioId, publicacionId) => {
        axios.post(process.env.REACT_APP_BACK_URL + '/Reserva', {
            Fecha: new Date(),
            UsuarioId: usuarioId,
            PublicacionId: publicacionId
        })
        .then(() => {
            this.setState({
                ...this.state,
                existeReserva: true
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                ...this.state,
                existeReserva: false
            })
        })
    }

    deleteReserva = (usuarioId, publicacionId) => {
        axios.delete(process.env.REACT_APP_BACK_URL + '/Reserva/publicacion/' + publicacionId + '/usuario/' + usuarioId)
        .then(() => {
            this.setState({
                ...this.state,
                existeReserva: false
            })
        })
        .catch((err) => {
            console.log(err);
            this.setState({
                ...this.state,
                existeReserva: true
            })
        })
    }
    
    render() { 
        return ( 
            <ReservaContext.Provider value={{
                ...this.state,
                getReserva: this.getReserva,
                postReserva: this.postReserva,
                deleteReserva: this.deleteReserva
            }}>
                {this.props.children}
            </ReservaContext.Provider>
         );
    }
}
 
export default ReservaContextProvider;