import React from "react";

import "./style.css";

import * as api from "../../Utils/api"


class Compteur extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            compteur: 0,
            error: null
        }

        this.id = this.props.id

        this.chargerCompteur = this.chargerCompteur.bind(this)
        this.modifierCompteur = this.modifierCompteur.bind(this)
    }


    chargerCompteur() {

        this.setState({loading: true})

        fetch(api.url+"/parkings/"+this.id+"/compteur")
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                this.setState({
                    compteur: data,
                    error: null
                })
            })}
            else {
                // reponse not ok
            }
        })
        .catch( (error) => {
            this.setState({
                error: error
            })
        })
    }


    modifierCompteur(modification) {

        this.setState({loading: true})
    
        const request = new Request(api.url+"/parkings/"+this.id+"/compteur/"+modification, {
            method: "POST"
        })

        fetch(request)
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                this.setState({
                    compteur: data,
                    error: null
                })
            })}
            else {
                if(response.status === 409) {
                    alert("Impossible d'enregistrer une sortie")
                    this.setState({
                        compteur: 0,
                    })
                }
            }
        })
        .catch( (error) => {
            this.setState({
                error: error
            })
        })

    }

    componentDidMount() {
        this.chargerCompteur()
    }

    render() {
        if(this.state.error) {
            return (
                <div>
                    <p>Erreur lors du chargement du compteur {this.id}</p>
                    <p>{JSON.stringify(this.state.error)}</p>
                </div>
            );
        }

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
