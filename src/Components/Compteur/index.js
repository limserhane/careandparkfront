import React, { useState, useEffect } from "react";

import "./style.css";

import * as api from "../../Utils/api"

import {useParams} from "react-router-dom"

function Compteur(props) {

    const {id} = useParams();

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [compteur, setCompteur] = useState(0)

    useEffect( () => {
    
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
    })

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
            <p className="nom">Nombre de véhicules : {compteur}</p>
            <button>Sortie</button>
            <button>Entrée</button>
        </div>
	);
}

export default Compteur;
