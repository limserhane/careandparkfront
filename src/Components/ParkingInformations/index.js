import React from "react";

import "./style.css";

import * as api from "../../Utils/api"


class ParkingInformations extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            error: null
        }

        this.id = this.props.id

        this.parking = {};

        this.chargerInformations = this.chargerInformations.bind(this)
    }

    chargerInformations() {

        fetch(api.url+"/parkings/"+this.id)
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                    this.parking = data
                    this.setState({error: null})
            })}
            else {
                // reponse not ok
            }
        })
        .catch( (error) => {
            this.setState({error: error})
        })
    }

    componentDidMount() {
        this.chargerInformations()
    }
    
    render() {
        if(this.state.error) {
            return (
                <div>
                    <p>Erreur lors du chargement des informations</p>
                    <p>{JSON.stringify(this.state.error)}</p>
                </div>
            );
        }

        return (
            <div className="informations-container">
                <h2 className="nom">{this.parking.nom || "?"}</h2>
                <p className="adresse">{this.parking.adresse || "?"}</p>
            </div>
        );
    }
}

export default ParkingInformations;
