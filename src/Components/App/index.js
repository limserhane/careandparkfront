import React from "react";

import "./style.css";

import Header from "../Header"

import { Outlet } from "react-router-dom";

class App extends React.Component {
	render() {
		return (
			<div className="app-container">
				<Header />
				<Outlet />
			</div>
		);
	}
}

export default App;
