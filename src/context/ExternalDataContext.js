import React, { createContext, Component } from 'react'
import axios from 'axios'
import centro_sur from '../images/amazonas.jpg'
import centro_oriente from '../images/centro_oriente.jpeg'
import caribe from '../images/caribe.jpg'
import eje_cafetero from '../images/eje_cafetero.jpg'
import pacifico from '../images/pacifico.jpg'
import llano from '../images/llano.jpg'

export const ExternalDataContext = createContext()

class ExternalDataContextProvider extends Component{
    state = {
        paises: [],
        municipios: [],
        departamentos: [],
        sitios_turisticos: [],
        publicaciones: [],
        loading: true,
        regiones: [
            { nombre: "Región Llano", img: llano },
            { nombre: "Región Centro Oriente", img: centro_oriente },
            { nombre: "Región Caribe", img: caribe },
            { nombre: "Región Centro Sur", img: centro_sur },
            { nombre: "Región Eje Cafetero - Antioquia", img: eje_cafetero },
            { nombre: "Región Pacífico", img: pacifico }
        ],
        loading: true
    }

    getPaises = () => {
        axios.get(process.env.REACT_APP_COUNTRIES_URL + '/all', {
            params:{
                fields: "name;flag;alpha3Code"
            }
        }).then(res => {
            this.setState({
                ...this.state,
                paises: res.data
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                ...this.state,
                paises: []
            })
        })
    }

    getMunicipios = (departamento) => {
        axios.get(process.env.REACT_APP_REGIONES_URL, { params: {$select: 'municipio', $where: 'departamento = ' + '"' + departamento + '"'}})
        .then(res => {
            this.setState({
                ...this.state,
                municipios: res.data
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                ...this.state,
                municipios: []
            })
        })
    }

    getDepartamentos = (region) => {
        axios.get(process.env.REACT_APP_REGIONES_URL, { params: {$select: 'departamento', $group: 'region,departamento', $where: 'region = ' + '"' + region + '"'}})
        .then(res => {
            this.setState({
                ...this.state,
                departamentos: res.data
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                ...this.state,
                departamentos: []
            })
        })
    }

    getSitiosById = (id) => {
        axios.get(process.env.REACT_APP_BACK_URL + '/SitiosTuristicos/propietario/' + id)
            .then(res => {
                this.setState({
                    ...this.state, 
                    sitios_turisticos: res.data,
                    loading: true
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    ...this.state,
                    sitios_turisticos: []
                })
            })
    }

    render(){
        return(
            <ExternalDataContext.Provider value={{
                ...this.state, 
                getPaises:this.getPaises,
                getMunicipios:this.getMunicipios,
                getDepartamentos:this.getDepartamentos,
                getSitiosById:this.getSitiosById,
                getPublicaciones:this.getPublicaciones,
            }}>
                {this.props.children}
            </ExternalDataContext.Provider>
        );
    }
}

export default ExternalDataContextProvider;