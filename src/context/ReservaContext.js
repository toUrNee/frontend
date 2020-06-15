import React, { Component, createContext } from 'react';
import axios from 'axios'

export const ReservaContext = createContext()

class ReservaContextProvider extends Component {

    state = {
        reservas: [],
        intereses: [],
        loadingReserva: true,
        existeInteres: false,
        existeReserva: false,
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

    getInteres = (usuarioId, publicacionId) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Interes/publicacion/' + publicacionId + '/usuario/' + usuarioId)
            .then(res => {
                this.setState({
                    ...this.state,
                    existeInteres: true,
                    loadingReserva: false,
                })
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    existeInteres: false,
                    loadingReserva: false,
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

    postInteres = (usuarioId, publicacionId) => {
        axios.post(process.env.REACT_APP_BACK_URL + '/Interes/', {
            Fecha: new Date(),
            UsuarioId: usuarioId,
            PublicacionId: publicacionId
        })
            .then(() => {
                this.setState({
                    ...this.state,
                    existeInteres: true,
                    loadingReserva: false,
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    existeInteres: false,
                    loadingReserva: false,
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

    deleteInteres = (usuarioId, publicacionId) => {
        axios.delete(process.env.REACT_APP_BACK_URL + '/Interes/publicacion/' + publicacionId + '/usuario/' + usuarioId)
            .then(res => {
                this.setState({
                    ...this.state,
                    existeInteres: false,
                    loadingReserva: false,
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    ...this.state,
                    existeInteres: true,
                    loadingReserva: false,
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
            .catch(err => {
                console.log(err)
                this.setState({
                    ...this.state,
                    reservas: []
                })
            })
    }

    getInteresByUser = (usuarioId) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Interes/usuario/' + usuarioId)
        .then (res => {
            this.setState({
                ...this.state,
                intereses: res.data,
                loadingReserva: false,
            })
        })
        .catch(err => {
            this.setState({
                ...this.state,
                intereses: [],
                loadingReserva: false,
            })
        })
    }

    render() {
        return (
            <ReservaContext.Provider value={{
                ...this.state,
                getReserva: this.getReserva,
                getInteres: this.getInteres,
                postReserva: this.postReserva,
                postInteres: this.postInteres,
                deleteReserva: this.deleteReserva,
                deleteInteres: this.deleteInteres,
                getReservasByUserId: this.getReservasByUserId,
                getInteresByUser: this.getInteresByUser,
            }}>
                {this.props.children}
            </ReservaContext.Provider>
        );
    }
}

export default ReservaContextProvider;