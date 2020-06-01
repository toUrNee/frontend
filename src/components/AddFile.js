import React, { useEffect, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { useHistory, Link } from "react-router-dom";
import '../styles/PerfilPropietario.css'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
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

const AddFile = ({ prevStep, idSitio }) => {
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
      setFiles(imagen.concat(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file),
        imagen: file
      }))));
    }
  });

  const handlerSubmit = (e) => {
    if (imagen.length < 1) {
      store.addNotification({
        title: "¡Ups!",
        message: "Ninguna imagen fue seleccionada :(",
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
      history.push('/perfil/sitios')
    }
    if (imagen.length > 8) {
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
    } else {
      for (let i = 0; i < imagen.length; i++) {
        if (imagen[i].size < 4194304) {
          e.preventDefault()
          const fd = new FormData()
          fd.append('file', imagen[i])
          fd.append('sitioID', idSitio)
          axios.post(process.env.REACT_APP_BACK_URL + '/Archivo_SitioTuristico', fd)
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
        } else {
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
    if (imagen.length > 0 && imagen.length < 9) {
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
      history.push('/perfil')
    }
  }

  const deleteImage = (i) => {
    var aux = imagen;
    if (i !== -1) {
      aux.splice(i, 1);
    }
    setFiles([...aux]);
  }

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    imagen.forEach(file => URL.revokeObjectURL(file.preview));
  }, [imagen]);

  useEffect(() => {
    
  })

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
      <header>
        <h1 className="titulo-form-color"> Agrega imágenes</h1>
      </header>
      <aside style={thumbsContainer}>
        {imagen.map((file, j) => (
          <div key={j} className="col-lg-4 col-md-6 perfil-item filter-app">
            <div className="perfil-wrap">
              <img alt="..." src={file.preview} style={{ height: "100pt" }} />
              <div className="buttons">
                <Link onClick={() => deleteImage(j)} title="Eliminar"><i className="far fa-trash-alt"></i></Link>
              </div>
            </div>
          </div>
        ))}
      </aside>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Arrasta y suelta tus archivos, o click aquí</p>
      </div>
      <button className="btn btn-form" onClick={prevStep}>Atras</button>
      <button className="btn btn-form" onClick={handlerSubmit}>Confirmar</button>
    </div>
  );
}

export default AddFile