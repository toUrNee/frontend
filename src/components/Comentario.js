import React, { useState, useEffect } from 'react';
import '../styles/InfoPublicacion.css'
import axios from 'axios'

const Comentario = ({ comentario }) => {


    const [pais, setPais] = useState("");

    useEffect(() => {
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
    }, [comentario])

    return (
        <li key={comentario.id} className="comentario">
            <div className="bandera-comentario">
                <img src={pais.flag} className="bandera" alt="Bandera comentario" />
            </div>
            <div className="texto-comentario">
                <h3>{comentario.usuario.nombre}</h3>
                <div className="meta">{comentario.fecha}</div>
                <p>{comentario.contenido}</p>
            </div>
        </li>
    )
}

export default Comentario;
