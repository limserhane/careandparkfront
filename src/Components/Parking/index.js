import React from "react";

import "./style.css";

import Compteur from "../Compteur";
import ParkingInformations from "../ParkingInformations";

import { useParams } from "react-router-dom";

function Parking(props) {
    const {id} = useParams();

	return (
        <div className="parking-container">
            <ParkingInformations id={id}/>
            <Compteur id={id}/>
        </div>
	);
}

export default Parking;
