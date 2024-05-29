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

    getReserva = (Username, publicacionId) => {
        axios.get(`${process.env.REACT_APP_BACK_URL}/Reserva/GetReserva`, {
            params: {
                username: Username,
                publicacionId: publicacionId,
            }
        })
            .then(res => {
                this.setState({
                    ...this.state,
                    existeReserva: res.data
                })
            })
            .catch(() => {
                this.setState({
                    ...this.state,
                    loadingReserva: false,
                })
            })
    }

    getInteres = (Username, publicacionId) => {
        axios.get(`${process.env.REACT_APP_BACK_URL}/Interes/GetInteres`, {
            params: {
                username: Username,
                publicacionId: publicacionId,
            }
        })
            .then(res => {
                this.setState({
                    ...this.state,
                    existeInteres: res.data,
                    loadingReserva: false,
                })
            })
            .catch(err => {
                this.setState({
                    ...this.state,
                    loadingReserva: false,
                })
            })
    }

    postReserva = (Username, publicacionId, fecha) => {
        axios.post(`${process.env.REACT_APP_BACK_URL}/Reserva/CreateReserva`, {
            Fecha: fecha,
            Username: Username,
            PublicacionId: publicacionId,
            EstadoReservaId: 1,
        })
            .then(() => {
                this.setState({
                    ...this.state,
                    existeReserva: {
                        fecha: new Date(),
                        Username: Username,
                        publicacionId: publicacionId,
                        estadoReservaId: 1,
                    }
                })
                Swal.fire(
                    '¡Listo!',
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
                    '¡Ups!',
                    'Ocurrió un error al crear la reserva.',
                    'error'
                )
            })
    }

    putReserva = (reserva) => {
        axios.put(`${process.env.REACT_APP_BACK_URL}/Reserva/UpdateReserva`, reserva)
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

    postInteres = (Username, publicacionId) => {
        axios.post(`${process.env.REACT_APP_BACK_URL}/Interes/CreateInteres`, {
            Fecha: new Date(),
            Username: Username,
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

    deleteReserva = (Username, publicacionId, index) => {
        axios.delete(`${process.env.REACT_APP_BACK_URL}/Reserva/DeleteReserva`, {
            query: {
                publicacionId: publicacionId,
                username: Username,
            }
        })
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

    deleteInteres = (Username, publicacionId, index) => {
        axios.delete(`${process.env.REACT_APP_BACK_URL}/Interes/DeleteInteres`, {
            query: {
                publicacionId: publicacionId,
                username: Username,
            }
        })
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
        axios.get(`${process.env.REACT_APP_BACK_URL}/Reserva/GetReservasByUser`, {
            params: {
                username: id,
            }
        })
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

    getInteresByUser = (Username) => {
        axios.get(`${process.env.REACT_APP_BACK_URL}/Interes/GetInteresesByUser`, {
            params: {
                username: Username,
            }
        })
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
        axios.get(`${process.env.REACT_APP_BACK_URL}/Interes/GetInteresesByPublicacion`, {
            params: {
                publicacionId: publicacionId,
            }
        })
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