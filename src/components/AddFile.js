import React, { useEffect, useState, useMemo } from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { useHistory } from "react-router-dom";

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
	marginRight: 8,
	width: 200,
  height: 200,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const AddFile = ({prevStep, idSitio}) => {
  const history = useHistory();

  const [imagen, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
  	accept: 'image/*', 
  	onDrop: acceptedFiles => {
    	setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
        imagen : file
			})));
		}
  });
  
  const handlerSubmit = (e) =>{
    if(imagen.length < 1){
      store.addNotification({
        title: "Ninguna imagen fue seleccionada :(",
        message: "Tu sitio turistico será creado sin imagenes",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeInDown"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: false
        }
      });
      history.push('/')
    }
    if(imagen.length > 8){
      store.addNotification({
        title: "Selecciona menos imágenes :(",
        message: "Tu sitio turistico puede contener hasta 8 fotos",
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeInDown"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: false
        }
      });
      history.push('/crear-sitio-turistico')
    }else{
      for (let i = 0; i < imagen.length; i++) {
        if(imagen[i].size < 4194304){
          e.preventDefault()
            const fd = new FormData()
            fd.append('file', imagen[i])
            fd.append('sitioID', idSitio)
              axios.post(process.env.REACT_APP_BACK_URL + '/Archivo_SitioTuristico', fd)
                .then(response => {
                  console.log(response)
                })
                .catch(error => {
                  console.log(error);              
                  store.addNotification({
                      title: "Ups!",
                      message: "Ocurrió un error con tu imagen. Intenta de nuevo.",
                      type: "danger",
                      insert: "top",
                      container: "top-right",
                      animationIn: ["animated", "fadeInDown"],
                      animationOut: ["animated", "fadeOut"],
                      dismiss: {
                      duration: 5000,
                      onScreen: false
                      }
                  });
                }) 
          }else{
            store.addNotification({
              title: "Ups!",
              message: "Las imágenes no pueden pesar más de 4MB. Intenta con otra imagen.",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animated", "fadeInDown"],
              animationOut: ["animated", "fadeOut"],
              dismiss: {
              duration: 5000,
              onScreen: false
              }
            });
            break; 
          }
        }     
    }
    if(imagen.length > 0 && imagen.length < 9){
      store.addNotification({
        title: "Perfecto!",
        message: "¡Imagenes añadidas de manera correcta!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeInDown"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: false
        }
      });
      history.push('/')
    }
  }

	const thumbs = imagen.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
	));
	
	useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    imagen.forEach(file => URL.revokeObjectURL(file.preview));
  }, [imagen]);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    
    <div className="col col-form">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Arrasta y suelta tus archivos, o click aquí</p>
      </div>
			<aside style={thumbsContainer}>
        {thumbs}
      </aside>
      <button className="btn btn-form" onClick={prevStep}>Atras</button>
      <button className="btn btn-form" onClick={handlerSubmit}>Confirmar</button>
    </div>
  );
}

export default AddFile