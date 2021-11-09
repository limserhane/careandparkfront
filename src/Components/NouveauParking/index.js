import React, { useState } from "react";

import "./style.css";

import * as api from "../../Utils/api"

import {useNavigate} from "react-router-dom"

function NouveauParking (props) {

    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");

    let navigate = useNavigate();

    function envoyer(event) {
        event.preventDefault();
    
        const request = new Request(api.url+"/parkings/", {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
			body: JSON.stringify({
				nom: nom,
                adresse: adresse
			})
        })

        fetch(request)
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                navigate("/parkings/"+data.id)
            })}
            else {
                if(response.status === 400) {
                    alert("Le nom et l'adresse doivent être renseignées")
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

    return (
        <div className="nouveauparking-container">
            <h2 className="title">Nouveau parking</h2>
            <form onSubmit={envoyer} className="formulaire">
                <label>Nom du parking
                    <input type="text" required value={nom} onChange={(event => {setNom(event.target.value)})}/>
                </label>
                <label>Adresse du parking
                    <input type="text" required value={adresse} onChange={(event => {setAdresse(event.target.value)})}/>
                </label>
                <input type="submit" value="Créer" />
            </form>
        </div>

    );
}

export default NouveauParking;
