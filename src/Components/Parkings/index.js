import React from "react";

import "./style.css";

import {NavLink} from "react-router-dom";

function obtenirParkings() {
    return [
        {
            id: "1",
            nom: "Parking de la mairie",
            adresse: "Mairie"
        },
        {
            id: "2",
            nom: "Parking du gymnase",
            adresse: "Gymnase"
        },
        {
            id: "3",
            nom: "Parking du centre-ville",
            adresse: "Centre-ville"
        }
    ];
}

function Parkings(props) {
	return (
		<ul className="parkings-container">
			{obtenirParkings().map(parking => 
                <li className="parking">
                    <NavLink to={parking.id} className="link">{parking.nom}, {parking.adresse}</NavLink>
                </li>
            )}
		</ul>
	);
}

export default Parkings;
