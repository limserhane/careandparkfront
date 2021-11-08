import React from "react";

import "./style.css";

class Place extends React.Component {

	render() {
	let disponibilite = "libre"
		return (
			<button className="place-container">
				<p className="place-numero">N°</p>
				<p className="place-type">Nominale</p>
				<div className={ "pastille " + disponibilite} />
			</button>
		);
	}
}

export default Place;
