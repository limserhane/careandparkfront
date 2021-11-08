import React from "react";

import "./style.css";

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
			{obtenirParkings().map(parking => <li>{parking.nom}, {parking.adresse}</li>)}
		</ul>
	);
}

export default Parkings;
