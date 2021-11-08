import React, { useState, useEffect } from "react";

import "./style.css";

import * as api from "../../Utils/api"

import {useParams} from "react-router-dom"

function Parking(props) {

    const {id} = useParams();

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [parking, setParking] = useState({})

    useEffect( () => {
    
        fetch(api.url+"/parkings/"+id)
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                    setParking(data)
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
        return <span>Chargement du parking {id} ...</span>
    }

    if(error) {
        return (
            <div>
                <h2>Erreur lors du chargement du parking {id}</h2>
                <p>{JSON.stringify(error)}</p>
            </div>
        );
    }

	return (
        <div className="parking-container">
            <h2 className="nom">{parking.nom}</h2>
            <p className="adresse">{parking.adresse}</p>
        </div>
	);
}

export default Parking;
