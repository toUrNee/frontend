import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AddPlan from './components/AddPlan';


function App() {
  return (
    <Router>
    	<Switch>
			<React.Fragment>
			<div className = "App">
					<Route path = "/login" exact component = {Login} />
					<Route path = "/register" exact component = {Register} />
					<Route path = "/crear-plan" exact component = {AddPlan} />
					{/*<Route path = "/" exact component = {Inicio} />*/ }
			</div>		
			</React.Fragment> 
		</Switch>
    </Router>   
  );
}

export default App;
