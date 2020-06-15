import React, { Component, createContext } from 'react';
import axios from 'axios'

export const ReservaContext = createContext()

class ReservaContextProvider extends Component {

    state = {
        reservas: [],
        intereses: [],
        loadingReserva: true,
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
    render() {
        return (
            <ReservaContext.Provider value={{
                ...this.state,
                getReservas: this.getReservas,
                getReservasByUserId: this.getReservasByUserId,
                getInteres: this.getInteres,
                postInteres: this.postInteres,
                deleteInteres: this.deleteInteres,
                getInteresByUser: this.getInteresByUser,
            }}>
                {this.props.children}
            </ReservaContext.Provider>
        );
    }
}

export default ReservaContextProvider;