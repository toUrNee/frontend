import React, { Component } from 'react';
/*import axios from 'axios';*/
import img from '../images/imagen.png';

class AddPlan extends Component {

    constructor(props){
        super(props)

        this.state = {
            Titulo: "",
            Nombre: "",
            Fecha: "",
            Descripcion: "",
            Nombre_region: "cafetera"
            //la parte de region deberia traerla desde la tabla de regiones
        }
    }

    handlerTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handlerDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handlerRegionChange = (event) => {
        this.setState({
            region: event.target.value
        })
    }

    handlerPlaceChange = (event) => {
        this.setState({
            place: event.target.value
        })
    }

    handlerDateChange = (event) => {
        this.setState({
            date: event.target.value
        })
    }
    /*
    //Aca tengo que hacer el post
    handlerSubmit = (e) => {
        e.preventDefault()
        console.log(this.state);
        axios.post('https://localhost:5001/api/Publicaciones', this.state)
        .then(response => {
            console.log(response)
            this.setState({Nombre_region: response.})
        })
        .catch(error => {
            console.log(error)
        })
        //alert(`${this.state.title} ${this.state.place} ${this.state.region} ${this.state.description}`)
    }

    
    Esto es para los get
    
    componentDidMount(){
        axios.get('https://localhost:5001/api/Regiones')
            .then(response => {
                console.log(response)
                this.setState({})
            })
            .catch(error => {
                console.log(error)
            })
    }
    */
    render(){
        const {title, place, date, description} = this.state
        return (
            <div className="container-fluid">
                <div className="row no-gutters">
                    <div className="col no-gutters d-flex justify-content-center">
                        <div className="addleft">
                            <h1 className="leftText">Publicar un plan</h1>
                            <img className="img-fluid mx-auto d-block img-form" src={img} />
                        </div>
                    </div>
                    <div className="col no-gutters">
                        <div className="addright">
                            <form onSubmit={this.handlerSubmit}>
                                <div>
                                    <label className="reg_label_titulo">Título</label>
                                    <input className="reg_form_titulo"
                                        type="text"
                                        value={title}
                                        onChange={this.handlerTitleChange}
                                    />
                                </div>
                                <div>
                                    <label className="reg_label_fecha">Fecha</label>
                                    <input className="reg_form_fecha"
                                        type="text"//revisar esto porque aca debe ser date
                                        value={date}
                                        onChange={this.handlerDateChange} //revisar esto porque tampoco debe ser asi
                                    />
                                </div>
                                <div>
                                    <label className="reg_label_lugar">Lugar</label>
                                    <input className="reg_form_lugar"
                                        type="text"
                                        value={place}
                                        onChange={this.handlerPlaceChange}
                                    />
                                </div>
                                <div>
                                    <label className="reg_label_region">Región</label>
                                    <select value={this.state.region} onChange={this.handlerRegionChange}>
                                        <option value="andina">Andina</option>
                                        <option value="caribe">Caribe</option>
                                        <option value="orioquia">Orinoquia</option>
                                        <option value="pacifico">Pacifico</option>
                                        <option value="amazonas">Amazonas</option>
                                        <option value="cafetera">Eje Cafetero</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="reg_label_descripcion">Descripción</label>
                                    <textarea
                                        value={description}
                                        onChange={this.handlerDescriptionChange}
                                    />
                                </div>
                                <div>
                                    <button className="reg_button" type="submit">Publicar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


export default AddPlan