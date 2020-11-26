import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import NavigationBar from './Components/NavigationBar'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import  DulceriaScreen from './Screens/DulceriaScreen'
import LoginScreen from './Screens/LoginScreen';

function App() {
  return (
   
    <Router >
      <NavigationBar/>
      <div className='App'>
        <Route path='/cuenta' component={LoginScreen}/> 
        <Route path='/product/:id' component={ProductScreen}/> 
        <Route path='/carrito/:id?' component={CartScreen}/> 
        <Route path='/dulceria' component={DulceriaScreen}/> 
        <Route path='/' component={HomeScreen} exact/> 
      </div>
    </Router>
    
  );
}

export default App;
