import React, { useState, useEffect } from "react";

import "./style.css";

import * as api from "../../Utils/api"

import {useParams} from "react-router-dom"

function ParkingInformations(props) {

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
        return <span>Chargement des informations... {id} </span>
    }

    if(error) {
        return (
            <div>
                <p>Erreur lors du chargement des informations {id}</p>
                <p>{JSON.stringify(error)}</p>
            </div>
        );
    }

	return (
        <div className="informations-container">
            <h2 className="nom">{parking.nom}</h2>
            <p className="adresse">{parking.adresse}</p>
        </div>
	);
}

export default ParkingInformations;
