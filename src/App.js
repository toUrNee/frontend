import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register'
import  LoginBox from './components/LoginBox'

function App() {
  return (
    <div className="App">
     <div class = "row no-gutters">
        <div class = "col-md-5 no-gutters">
          <div class = "left d-flex justify-content-center">
            <Register />
          </div>
        </div>
        <div class = "col-md-7 no-gutters">
          <div class = "right d-flex justify-content-center">
            <LoginBox />            
          </div>
        </div>
      </div>   
    </div>
  );
}

export default App;
