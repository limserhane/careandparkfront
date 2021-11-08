import React, { useState, useEffect } from "react";

import "./style.css";

import * as api from "../../Utils/api"


function changementCompteur(parkingId, value, set) {
    
    const request = new Request(api.url+"/parkings/"+parkingId+"/compteur/"+value, {
        method: "POST"
    })

    fetch(request)
    .then( (response) => {
        if(response.ok) { response.json().then( (data) => {
            set(data)
        })}
        else {
            if(response.status === 409) {
                alert("Impossible d'enregistrer une sortie")
            }
        }
    })
    .catch( (error) => {
        console.log(error)
    })

}

function Compteur(props) {

    const id = props.id

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [compteur, setCompteur] = useState(0)

    function chargerCompteur() {
    
        fetch(api.url+"/parkings/"+id+"/compteur")
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                setCompteur(data)
                setLoading(false);
            })}
            else {
                // reponse not ok
            }
        })
        .catch( (error) => {
            setError(error);
            setLoading(false);
        })
    }

    useEffect( () => {
        chargerCompteur()
    }, [])


    if(loading) {
        return <span>Chargement du compteur... {id} ...</span>
    }

    if(error) {
        return (
            <div>
                <p>Erreur lors du chargement du compteur {id}</p>
                <p>{JSON.stringify(error)}</p>
            </div>
        );
    }

	return (
        <div className="compteur-container">
            <p className="compteur">Nombre de véhicules : {compteur}</p>
            <button className="bouton recharger" onClick={() => chargerCompteur()}>Recharger</button>
            <button className="bouton sortie" onClick={() => changementCompteur(id, "sortie", setCompteur)}>Sortie</button>
            <button className="bouton entree" onClick={() => changementCompteur(id, "entree", setCompteur)}>Entrée</button>
        </div>
	);
}

export default Compteur;
