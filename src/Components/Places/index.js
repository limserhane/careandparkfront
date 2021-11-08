import React from "react";

import "./style.css";

import * as api from "../../Utils/api"

import Place from "../Place";

class Places  extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            places: []
        }

        this.id = this.props.id

        this.chargerPlaces = this.chargerPlaces.bind(this)
    }

    chargerPlaces() {
		
		fetch(api.url+"/parkings/"+this.id+"/places")
		.then( (response) => {
			if(response.ok) { response.json().then( (data) => {
					this.setState({places: data})
			})}
			else {
				console.log(response)
			}
		})
		.catch( (error) => {
			console.log(error)
		})
    }

    componentDidMount() {
        this.chargerPlaces()
    }

    render() {
        return (
            <div className="places-container">
                {(this.state.places.map((place) => <Place key={this.id.toString()+place.numero.toString()} id={this.id} numero={place.numero} />))}
            </div>
        );
    }
}

export default Places;
