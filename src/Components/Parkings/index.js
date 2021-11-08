import React, { useState, useEffect } from "react";

import "./style.css";

import * as api from "../../Utils/api"

import {NavLink} from "react-router-dom";

function Parkings(props) {
    
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [parkings, setParkings] = useState([])

    useEffect(() => {

        setLoading(true);
    
        fetch(api.url+"/parkings")
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                    setParkings(data)
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
    }, [])

    if(loading) {
        return <span>Chargement des parkings ...</span>
    }

    if(error) {
        return (
            <div>
                <h2>Erreur lors du chargement des parkings</h2>
                <p>{JSON.stringify(error)}</p>
            </div>
        );
    }

	return (
		<ul className="parkings-container">
			{parkings.map(parking => 
                <li key={parking.id} className="parking">
                    <NavLink to={parking.id.toString()} className="link">{parking.nom}, {parking.adresse}</NavLink>
                </li>
            )}
		</ul>
	);
}

export default Parkings;
