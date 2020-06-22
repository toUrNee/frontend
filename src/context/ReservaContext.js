import React, { Component, createContext } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'

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
            .then(res => {
                this.setState({
                    ...this.state,
                    existeReserva: res.data
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

    postReserva = (usuarioId, publicacionId, fecha) => {
        axios.post(process.env.REACT_APP_BACK_URL + '/Reserva', {
            Fecha: fecha,
            UsuarioId: usuarioId,
            PublicacionId: publicacionId,
            EstadoReservaId: 1,
        })
            .then(() => {
                this.setState({
                    ...this.state,
                    existeReserva: {
                        fecha: new Date(),
                        usuarioId: usuarioId,
                        publicacionId: publicacionId,
                        estadoReservaId: 1,
                    }
                })
                Swal.fire(
                    'Listo!',
                    'Tu reserva ha sido creada con éxito.',
                    'success'
                )
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    existeReserva: false
                })
                Swal.fire(
                    'Ups!',
                    'Ocurrio un error al crear la reserva.',
                    'error'
                )
            })
    }

    putReserva = (reserva, estadoId) => {
        axios.put(process.env.REACT_APP_BACK_URL + '/Reserva/publicacion/' + reserva.PublicacionId + '/usuario/' + reserva.UsuarioId, reserva)
            .then(() => {
                this.setState({
                    ...this.state,
                    existeReserva: true,
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

    deleteReserva = (usuarioId, publicacionId, index) => {
        axios.delete(process.env.REACT_APP_BACK_URL + '/Reserva/publicacion/' + publicacionId + '/usuario/' + usuarioId)
            .then(() => {
                var aux = this.state.reservas
                aux.splice(index, 1)
                this.setState({
                    ...this.state,
                    reservas: aux,
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

    deleteInteres = (usuarioId, publicacionId, index) => {
        axios.delete(process.env.REACT_APP_BACK_URL + '/Interes/publicacion/' + publicacionId + '/usuario/' + usuarioId)
            .then(res => {
                var aux = this.state.intereses
                aux.splice(index, 1)
                this.setState({
                    ...this.state,
                    intereses: aux,
                    existeInteres: false,
                    loadingReserva: false,
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    ...this.state,
                    existeInteres: false,
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
            .then(res => {
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

    getInteresadosByPublicacionId = (publicacionId) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Interes/publicacion/' + publicacionId)
            .then(res => {
                this.setState({
                    ...this.state,
                    intereses: res.data
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    intereses: []
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
                putReserva: this.putReserva,
                postInteres: this.postInteres,
                deleteReserva: this.deleteReserva,
                deleteInteres: this.deleteInteres,
                getReservasByUserId: this.getReservasByUserId,
                getInteresByUser: this.getInteresByUser,
                getInteresadosByPublicacionId: this.getInteresadosByPublicacionId,
                getReservasByPublicacionId: this.getReservasByPublicacionId,
            }}>
                {this.props.children}
            </ReservaContext.Provider>
        );
    }
}

export default ReservaContextProvider;