import React, { useState, useEffect } from 'react'
import '../styles/InfoPublicacion.css'
import axios from 'axios'
import Moment from 'react-moment'

const Comentario = ({ comentario }) => {


    const [pais, setPais] = useState("");

    useEffect(() => {
        delete axios.defaults.headers.get["Authorization"]; 
        axios.get(process.env.REACT_APP_COUNTRIES_URL + '/alpha/' + comentario.usuario.nacionalidad, {
            params: {
                fields: "name;flag"
            }
        }).then(res => {
            setPais(res.data)
        }).catch(err => {
            console.log(err)
            setPais("")
        })
        axios.defaults.headers.get['Authorization'] = "Bearer "+localStorage.getItem("token")
    }, [comentario])

    return (
        <li key={comentario.id} className="comentario">
            <div className="bandera-comentario">
                <img style={{width:"40px", height:"40px"}} src={pais.flag} className="bandera" alt="Bandera comentario" />
            </div>
            <div className="texto-comentario">
                <h3>{comentario.usuario.nombres}</h3>
                <div className="meta"><Moment format="DD/MM/YYYY" date={comentario.fecha} /></div>
                <p>{comentario.contenido}</p>
            </div>
        </li>
    )
}

export default Comentario;
