import React, { useState } from "react";

import "./style.css";

import * as api from "../../Utils/api"

import { useParams } from "react-router-dom";

function NouvellePlace (props) {

    const {id} = useParams();

    const [numero, setNumero] = useState(0);
    const [type, setType] = useState("");

    // const [fichier, setFichier] = useState("");

    function envoyer(event) {
        if(event) event.preventDefault();
    
        const request = new Request(api.url+"/parkings/"+id+"/places", {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' 
            },
			body: JSON.stringify({
				numero: numero,
                type: type
			})
        })

        fetch(request)
        .then( (response) => {
            if(response.ok) { response.json().then( (data) => {
                setNumero(0)
                setType("")
                alert("Place "+data.numero+" créé")
            })}
            else {
                console.log(response)
            }
        })
        .catch( (error) => {
            console.log(error)
        })
    }

    function chargerFichier(event) {
        event.preventDefault()
        
        const fichier = event.target.files[0]

        let reader = new FileReader();
        reader.onloadend = (e) => {
            let data = JSON.parse(reader.result)

            if(!data.places || !Array.isArray(data.places)) {
                alert("Le fichier n'est pas au bon format")
            }

            envoyerPlaces(data.places)

        }

        reader.readAsText(fichier)
    }

    function envoyerPlaces(places) {
        places.forEach(place => {
                
            const request = new Request(api.url+"/parkings/"+id+"/places", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8' 
                },
                body: JSON.stringify({
                    numero: place.numero,
                    type: place.type
                })
            })
    
            fetch(request)
            .then( (response) => {
                if(response.ok) { response.json().then( (data) => {
                    console.log(data)
                })}
                else {
                    console.log(response)
                }
            })
            .catch( (error) => {
                console.log(error)
            })

        });
    }

    return (
        <div className="nouvelleplace-container">
            <h2 className="title">Nouvelle place</h2>
            <form onSubmit={envoyer} className="formulaire">
                <label>Numéro de la place
                    <input type="number" required value={numero} onChange={(event => {setNumero(event.target.value)})}/>
                </label>
                <label>Type de place
                    <select required value={type} onChange={(event => {setType(event.target.value)})}>
                        <option value=""></option>
                        <option value="NOMINALE">Nominale</option>
                        <option value="HANDICAPE">Handicape</option>
                        <option value="DEUX_ROUES">Deux roues</option>
                        <option value="BUS">Bus</option>
                    </select>
                </label>
                <input type="submit" value="Créer ou mettre à jour" />
            </form>
            <hr className="solid"/>
            <form >
                <label>Fichier JSON à charger
                    <input type="file" onChange={(event)=>{chargerFichier(event)}}/>
                </label>
                {/* <input type="submit" value="Créer les places" /> */}
            </form>

        </div>

    );
}

export default NouvellePlace;
