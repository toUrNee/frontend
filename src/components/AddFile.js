import React, { useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { useHistory } from "react-router-dom"

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
}

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
}

const thumbInner = {
  minWidth: 0,
  overflow: 'hidden'
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
}

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
}


const AddFile = ({ prevStep, sitio, imagenes, setImagenes, success, error, warning }) => {
  const history = useHistory()

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: 'image/*',
    maxSize: 4194304,
    onDrop: acceptedFiles => {
      if (imagenes.length + acceptedFiles.length > 8){
        error("Tu sitio turistico puede contener hasta 8 fotos")
        return  
      }
      acceptedFiles.forEach(imagen => {
        const fd = new FormData()
        fd.append('file', imagen)
        fd.append('sitioID', sitio.Id)
        axios.post(process.env.REACT_APP_BACK_URL + '/Archivo_SitioTuristico', fd)
          .then(res => {
            var aux = imagenes
            aux.push(res.data.id)
            setImagenes([...aux])
          })
          .catch(err => {
            console.log(err)
            error("Ocurrió un error con tu imagen. Intenta de nuevo.")
          })
      })
    },
    onDropRejected: fileRejections => {
      fileRejections.forEach(err => {
        error(err.errors[0].message)
      })
    }
  })

  const handlerSubmit = (e) => {
    e.preventDefault()
    if (imagenes.length < 1) {
      warning("Ninguna imagen fue seleccionada :(")
    } else {
      success("¡Imagenes añadidas de manera correcta!")
    }
    history.push('/perfil/sitios')
  }

  const deleteImage = (i) => {
    axios.delete(process.env.REACT_APP_BACK_URL + '/Archivo_SitioTuristico/' + imagenes[i])
      .then(() => {
        var aux = imagenes
        aux.splice(i, 1)
        setImagenes([...aux])
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => () => {
    imagenes.forEach(file => URL.revokeObjectURL(file.preview))
  }, [imagenes])

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? { borderColor: '#2196f3' } : {}),
    ...(isDragAccept ? { borderColor: '#00e676' } : {}),
    ...(isDragReject ? { borderColor: '#ff1744' } : {})
  }), [isDragActive, isDragReject, isDragAccept])

  return (
    <div className="col col-form">
      <header>
        <h1 className="titulo-form-blue"> Agrega imágenes</h1>
      </header>
      <aside style={thumbsContainer}>
        {imagenes.map((id, j) => (
          <div style={thumb} key={id}>
            <button onClick={() => deleteImage(j)} className="btn btn-danger"><i className="fas fa-trash"></i></button>
            <div style={thumbInner}>
              <img
                src={process.env.REACT_APP_BACK_URL + "/Archivo_SitioTuristico/" + id}
                style={img}
                alt="imagen de sitio"
              />
            </div>
          </div>
        ))}
      </aside>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Arrasta y suelta tus archivos, o click aquí</p>
      </div>
      <button className="btn btn-form-blue" onClick={prevStep}>Atras</button>
      <button className="btn btn-form-blue" onClick={handlerSubmit}>Confirmar</button>
    </div>
  )
}

export default AddFile