import React, { createContext, Component } from 'react'
import axios from 'axios'
import qs from 'qs'

export const PublicacionContext = createContext()

class PublicacionContextProvider extends Component {
    state = {
        publicacion: null,
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

    //Trae una publicacion por su id
    getPublicacionById = (id) => {
        this.setState({
            ...this.state,
            loading: true
        })
        axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones/' + id)
            .then(res => {
                this.setState({
                    ...this.state,
                    publicacion: res.data,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    publicacion: null,
                    loading: false
                })
            })
    }

    //Trae publicaciones por propietario

    getPublicacionesByPropietarioId = (id) => {
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

    getPublicacionesFiltered = (filtros) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/Publicaciones/filtered', {
            params: filtros,
            paramsSerializer: params => {
                return qs.stringify(params, { indices: false, arrayFormat: 'repeat' })
            }
        })
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

    //Trae tipo CategoriasActividad
    getActividades = () => {
        this.setState({
            ...this.state,
            loading: true
        })
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

    deletePublicacionesById = (id, index) => {
        axios.delete(process.env.REACT_APP_BACK_URL + '/Publicaciones/' + id)
            .then(res => {
                var aux = this.state.publicaciones
                aux.splice(index, 1)
                this.setState({
                    ...this.state,
                    publicaciones: aux,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    loading: false
                })
            })
    }

    render() {
        return (
            <PublicacionContext.Provider value={{
                ...this.state,
                getPublicacionesFiltered: this.getPublicacionesFiltered,
                getPublicacionById: this.getPublicacionById,
                getPublicaciones: this.getPublicaciones,
                getPublicacionesByPropietarioId: this.getPublicacionesByPropietarioId,
                getActividades: this.getActividades,
                getPublicacionesByRegion: this.getPublicacionesByRegion,
                getPublicacionesByActividades: this.getPublicacionesByActividades,
                getPublicacionesByRegionAndActividades: this.getPublicacionesByRegionAndActividades,
                deletePublicacionesById: this.deletePublicacionesById,
            }}>
                {this.props.children}
            </PublicacionContext.Provider >
        );
    }
}

export default PublicacionContextProvider;