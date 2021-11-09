import React, { useState } from "react";

import "./style.css";

import * as api from "../../Utils/api"

function NouveauParking (props) {

    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");

    function envoyer(event) {
        event.preventDefault();

        if(nom === "" || adresse === "") {
            alert("Le nom et l'adresse doivent être renseignées")
            return
        }
    
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
                setNom("")
                setAdresse("")
                alert("Parking "+data.id+" créé")
            })}
            else {
                if(response.status === 400) {
                    alert("Le nom et l'adresse doivent être renseignées")
                    this.setState({libre: false})
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
                    <input type="text" value={nom} onChange={(event => {setNom(event.target.value)})}/>
                </label>
                <label>Adresse du parking
                    <input type="text" value={adresse} onChange={(event => {setAdresse(event.target.value)})}/>
                </label>
                <input type="submit" value="Créer" />
            </form>
        </div>

    );
}

export default NouveauParking;
