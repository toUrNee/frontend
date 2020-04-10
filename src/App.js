import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'

function App() {
	return (
		<Router>
			<div className = "App">
				<Route path = "/login" component = {Login}></Route>
				<Register />
				{/*<Login />*/ } 
			</div>	
		</Router>
  	);
}

export default App;