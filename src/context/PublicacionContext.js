import React, { createContext, Component } from 'react'
import axios from 'axios'

export const PublicacionContext = createContext()

class PublicacionContextProvider extends Component {
    state = {
        publicaciones: [],
        actividades: [],
        loading: true
    }

    //Trae las publicaciones
    getPublicaciones = () => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones')
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

    //Trae publicaciones por propietario

    getPublicacionesById = (id) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones/propietario/' + id)
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

    //Filtro por region 
    getPublicacionesByRegion = (region) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones/region', { params: { region: region } })
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

    //Filtro por actividades
    getPublicacionesByActividades = (filtro) => {
        var _publicaciones = []
        filtro.map(idActividad => (
            console.log(idActividad),
            axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones/tipo/' + idActividad)
                .then(res => {
                    _publicaciones = _publicaciones.concat(res.data)
                    console.log(_publicaciones)
                    this.setState({
                        ...this.state,
                        publicaciones: _publicaciones,
                        loading: false
                    })
                })
                .catch(error => {
                    console.log(error)
                    _publicaciones = []
                })
        ))
        console.log(_publicaciones)
        

        /*
        axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones/region', { params: { region: region } })
            .then(res => {
                this.setState({
                    ...this.state,
                    publicaciones: this.state.publicaciones.concat(res.data),
                    loading: false
                })
                console.log(this.state.publicaciones)
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    publicaciones: [],
                    loading: true
                })
            })*/
    }

    //Trae tipo actividades
    getActividades = () => {
        axios.get(process.env.REACT_APP_BACK_URL + '/CategoriasActividad')
            .then(res => {
                this.setState({
                    ...this.state,
                    actividades: res.data,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    actividades: [],
                    loading: true
                })
            })
    }

    render() {
        return (
            <PublicacionContext.Provider value={{
                ...this.state,
                getPublicaciones: this.getPublicaciones,
                getPublicacionesById: this.getPublicacionesById,
                getActividades: this.getActividades,
                getPublicacionesByRegion: this.getPublicacionesByRegion,
                getPublicacionesByActividades: this.getPublicacionesByActividades,
            }}>
                {this.props.children}
            </PublicacionContext.Provider>
        );
    }
}

export default PublicacionContextProvider;