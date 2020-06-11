import React, { Component, createContext } from 'react';
import axios from 'axios'

export const ReservaContext = createContext()

class ReservaContextProvider extends Component {

    state = { 
        reservas: [],
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
            }}>
                {this.props.children}
            </ReservaContext.Provider>
         );
    }
}
 
export default ReservaContextProvider;