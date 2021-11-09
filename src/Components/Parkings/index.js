import React from "react";

import "./style.css";

import * as api from "../../Utils/api"

import {NavLink} from "react-router-dom";

class Parkings extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			parkings: []
		}

		this.chargerParkings = this.chargerParkings.bind(this)
	}
	
	chargerParkings() {
		
		fetch(api.url+"/parkings")
		.then( (response) => {
			if(response.ok) { response.json().then( (data) => {
					this.setState({parkings: data})
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
		this.chargerParkings()
	}

	render() {
		return (
			<ul className="parkings-container">
				{this.state.parkings.map(parking => 
					<li key={parking.id} className="parking">
						<NavLink to={parking.id.toString()} className="link">{parking.nom}, {parking.adresse}</NavLink>
					</li>
				)}
			</ul>
		);
	}
}

export default Parkings;
