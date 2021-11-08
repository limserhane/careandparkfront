import React from "react";

import "./style.css";

import Compteur from "../Compteur";
import ParkingInformations from "../ParkingInformations";
import Places from "../Places";

import { useParams } from "react-router-dom";

function Parking(props) {
    const {id} = useParams();

	return (
        <div className="parking-container">
            <ParkingInformations id={id}/>
            <Compteur id={id}/>
            <Places id={id}/>
        </div>
	);
}

export default Parking;
