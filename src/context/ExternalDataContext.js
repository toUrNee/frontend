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
        publicaciones: [],
        regiones: [
            { nombre: "Región Llano", img: llano },
            { nombre: "Región Centro Oriente", img: centro_oriente },
            { nombre: "Región Caribe", img: caribe },
            { nombre: "Región Centro Sur", img: centro_sur },
            { nombre: "Región Eje Cafetero - Antioquia", img: eje_cafetero },
            { nombre: "Región Pacífico", img: pacifico }
        ]
    }

    getPaises = () => {
        delete axios.defaults.headers.get["Authorization"]; 
        axios.get(process.env.REACT_APP_COUNTRIES_URL + '/all', {
            params:{
                fields: "name,flag,cca3"
            }
        }).then(res => {
            this.setState({
                ...this.state,
                paises: res.data.map(x => ({name: x.name.common, flag: x.flag, alpha3Code: x.cca3}))
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                ...this.state,
                paises: []
            })
        })
        axios.defaults.headers.get['Authorization'] = "Bearer "+localStorage.getItem("token")

    }

    getMunicipios = (departamento) => {
        delete axios.defaults.headers.get["Authorization"]; 
        axios.get(process.env.REACT_APP_REGIONES_URL, { params: {$select: 'municipio', $where: 'departamento = "' + departamento + '"'}})
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
        axios.defaults.headers.get['Authorization'] = "Bearer "+localStorage.getItem("token")
    }

    getDepartamentos = (region) => {
        delete axios.defaults.headers.get["Authorization"]; 
        axios.get(process.env.REACT_APP_REGIONES_URL, { params: {$select: 'departamento', $group: 'region,departamento', $where: 'region = "' + region + '"'}})
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
        axios.defaults.headers.get['Authorization'] = "Bearer "+localStorage.getItem("token")
    }

    

    render(){
        return(
            <ExternalDataContext.Provider value={{
                ...this.state, 
                getPaises:this.getPaises,
                getMunicipios:this.getMunicipios,
                getDepartamentos:this.getDepartamentos,
            }}>
                {this.props.children}
            </ExternalDataContext.Provider>
        );
    }
}

export default ExternalDataContextProvider;