import React, { createContext, Component } from 'react'
import axios from 'axios'
import qs from 'qs'

export const PublicacionContext = createContext()

class PublicacionContextProvider extends Component {
    state = {
        publicacion: null,
        publicaciones: [],
        categoriasActividad: [],
        comentarios: [],
        loading: true,
        imagenes: [],
    }

    //Trae todas las publicaciones
    getPublicaciones = () => {
        axios.get(`${process.env.REACT_APP_BACK_URL}/Publicaciones/GetPublicaciones`)
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
        axios.get(`${process.env.REACT_APP_BACK_URL}/Publicaciones/GetPublicacion`, {
            params: {
                id: id,
            }
        })
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

    getImagenesByPublicacion = (idSitio) => {
        axios.get(`${process.env.REACT_APP_BACK_URL}/ArchivoSitioTuristico/GetArchivosSitioTuristico`, {
            params: {
                sitioId: idSitio,
            }
        })
            .then(res => {
                this.setState({
                    ...this.state,
                    imagenes: res.data,
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    ...this.state,
                    imagenes: [],
                })
            })
    }

    //Trae publicaciones por propietario
    getPublicacionesByPropietarioUsername = (id) => {
        axios.get(`${process.env.REACT_APP_BACK_URL}/Publicaciones/GetPublicaciones`, {
            params: {
                propietario: id,
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

    getPublicacionesFiltered = (filtros) => {
        this.setState({
            ...this.state,
            loading: true
        })
        axios.get(`${process.env.REACT_APP_BACK_URL}/Publicaciones/GetPublicaciones`, {
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
    getCategoriasActividad = () => {
        this.setState({
            ...this.state,
            loading: true
        })
        axios.get(`${process.env.REACT_APP_BACK_URL}/CategoriasActividad/GetCategoriasActividad`)
            .then(res => {
                this.setState({
                    ...this.state,
                    categoriasActividad: res.data,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    categoriasActividad: [],
                    loading: true
                })
            })
    }

    deletePublicacionesById = (id, index) => {
        axios.delete(`${process.env.REACT_APP_BACK_URL}/Publicaciones/DeletePublicacion`, {
            query: {
                id: id
            }
        })
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

    getComentariosByPublicacion = (publicacionId) => {
        axios.get(`${process.env.REACT_APP_BACK_URL}/Comentarios/GetComentarios`, {
            params: {
                publicacionId: publicacionId,
            }
        })
            .then(res => {
                this.setState({
                    ...this.state,
                    comentarios: res.data,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    comentarios: [],
                    loading: true
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
                getPublicacionesByPropietarioUsername: this.getPublicacionesByPropietarioUsername,
                getCategoriasActividad: this.getCategoriasActividad,
                getComentariosByPublicacion: this.getComentariosByPublicacion,
                deletePublicacionesById: this.deletePublicacionesById,
                getImagenesByPublicacion: this.getImagenesByPublicacion,
            }}>
                {this.props.children}
            </PublicacionContext.Provider >
        );
    }
}

export default PublicacionContextProvider;