import React from "react";

import "./style.css";

import * as api from "../../Utils/api"

import {NavLink} from "react-router-dom"

function Header(props) {
	return (
		<div className="header-container">
			<NavLink to="/" className="link"><h1 className="title">Care And Park</h1></NavLink>
			<NavLink to="/parkings" className="sublink link">Parkings</NavLink>
			<a href={api.url} target="_blank" rel="noreferrer" className="sublink link">API</a>
			<NavLink to="/parkings/new" className="sublink link">Nouveau parking</NavLink>
		</div>
	);
}

export default Header;
