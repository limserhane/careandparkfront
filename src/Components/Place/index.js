import React from "react";

import "./style.css";

import * as api from "../../Utils/api"

class Place extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			libre: false
		}

		this.id = this.props.id;
		this.numero = this.props.numero;

		this.type = ""

        this.chargerPlace = this.chargerPlace.bind(this)
        this.modifierDisponibilite = this.modifierDisponibilite.bind(this)
	}

    chargerPlace() {

        this.setState({loading: true})

        fetch(api.url+"/parkings/"+this.id+"/places/"+this.numero)
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                this.type = data.type
				this.setState({libre: data.etat === "LIBRE"})
            })}
            else {
                console.log(response)
            }
        })
        .catch( (error) => {
            console.log(error)
        })
    }

    modifierDisponibilite(modification) {
        
        this.setState({loading: true})
    
        const request = new Request(api.url+"/parkings/"+this.id+"/places/"+this.numero, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
			body: JSON.stringify({
				etat: modification
			})
        })

        fetch(request)
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                this.setState({libre: data.etat === "LIBRE"})
            })}
            else {
                if(response.status === 409) {
                    alert("La place est déjà occupée")
                    this.setState({libre: false})
                }
                else {
                    console.log(response)
                }
            }
        })
        .catch( (error) => {
            console.log(error)
        })

    }

	componentDidMount() {
		this.chargerPlace()
	}

	render() {

		const disponibilite = this.state.libre ? "libre" : "occupe"

		return (
			<button onClick={() => this.modifierDisponibilite(this.state.libre ? "OCCUPE" : "LIBRE")} className="place-container">
				<p className="place-numero"> N° {this.numero || "?"}</p>
				<p className="place-type">{this.type || "?"}</p>
				<div className={ "pastille " + disponibilite} />
			</button>
		);
	}
}

export default Place;
