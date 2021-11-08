import React from "react";

import "./style.css";

import * as api from "../../Utils/api"


class Compteur extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            compteur: 0,
        }

        this.id = this.props.id

        this.chargerCompteur = this.chargerCompteur.bind(this)
        this.modifierCompteur = this.modifierCompteur.bind(this)
    }


    chargerCompteur() {

        fetch(api.url+"/parkings/"+this.id+"/compteur")
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                this.setState({compteur: data})
            })}
            else {
                console.log(response)
            }
        })
        .catch( (error) => {
            console.log(error)
        })
    }


    modifierCompteur(modification) {
        const request = new Request(api.url+"/parkings/"+this.id+"/compteur/"+modification, {
            method: "POST"
        })

        fetch(request)
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                this.setState({compteur: data})
            })}
            else {
                if(response.status === 409) {
                    alert("Impossible d'enregistrer une sortie")
                    this.setState({compteur: 0})
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
        this.chargerCompteur()
    }

    render() {

        return (
            <div className="compteur-container">
                <p className="compteur">Nombre de véhicules : {this.state.compteur}</p>
                <button className="bouton recharger" onClick={() => this.chargerCompteur()}>Recharger</button>
                <button className="bouton sortie" onClick={() => this.modifierCompteur("sortie")}>Sortie</button>
                <button className="bouton entree" onClick={() => this.modifierCompteur("entree")}>Entrée</button>
            </div>
        );
    }
}

export default Compteur;
