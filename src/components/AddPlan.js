import React, { Component } from 'react';

class AddPlan extends Component {

    constructor(props){
        super(props)

        this.state = {
            title: "",
            place: "",
            description: "",
            region: "cafetera"
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

    handlerSubmit = () => {
        alert(`${this.state.title} ${this.state.place} ${this.state.region} ${this.state.description}`)
    }

    handlerPlaceChange = (event) => {
        this.setState({
            place: event.target.value
        })
    }

    render(){
        return (
            <div className="row no-gutters">
                <div className="col-md-6 no-gutters d-flex justify-content-center">
                    <div className="addleft">
                            <h1 className="leftText">Publicar un plan</h1>
                    </div>
                </div>
                <div className="col-md-6 no-gutters">
                    <div className="addright">
                        <form onSubmit={this.handlerSubmit}>
                            <div>
                                <label className="reg_label_titulo">Título</label>
                                <input className="reg_form_titulo" 
                                type="text" 
                                value={this.state.title} 
                                onChange={this.handlerTitleChange}
                                />
                            </div>
                            <div>
                                <label className="reg_label_fecha">Fecha</label>
                            </div>
                            <div>
                                <label className="reg_label_lugar">Lugar</label>
                                <input className="reg_form_lugar"
                                type="text"
                                value={this.state.place} 
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
                                    <option value="cafetera">Cafetera</option>
                                    <option value="llanera">Llanera</option>
                                    <option value="san agustin">San Agustin</option>
                                </select>
                            </div>
                            <div>
                                <label className="reg_label_descripcion">Descripción</label>
                                <textarea 
                                value={this.state.description} 
                                onChange={this.handlerDescriptionChange}
                                />
                            </div>
                            <div>
                                <label className="reg_label_fotos">Fotos</label>
                            </div>
                            <div>
                                <button className="reg_button" type="submit">Publicar</button>
                            </div>
                        </form>
                    </div>   
                </div>
            </div>
        )
    }
}


export default AddPlan