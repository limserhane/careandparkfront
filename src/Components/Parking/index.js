import React from "react";

import "./style.css";

import Compteur from "../Compteur";
import ParkingInformations from "../ParkingInformations";

function Parking(props) {
	return (
        <div className="parking-container">
            <ParkingInformations />
            <Compteur />
        </div>
	);
}

export default Parking;
