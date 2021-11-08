import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';

import App from './Components/App';
import Parkings from "./Components/Parkings"
import Parking from "./Components/Parking"

import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
<React.StrictMode>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} >
				{/* NO INDEX = blank home */}
				<Route path="parkings" element={<Parkings/>} />
				<Route path="parkings/:id" element={<Parking />} />
			</Route>
		</Routes>
	</BrowserRouter>
</React.StrictMode>,
document.getElementById('root')
);