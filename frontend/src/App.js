import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import NavigationBar from './Components/NavigationBar'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'

function App() {
  return (
   
    <Router >
      <NavigationBar/>
      <div className='App'>
        <Route path='/' component={HomeScreen} exact/> 
        <Route path='/product/:id' component={ProductScreen}/> 
      </div>
    </Router>
    
  );
}

export default App;
