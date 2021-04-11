import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import DulceriaScreen from './Screens/DulceriaScreen'
import LoginScreen from './Screens/LoginScreen';
import ForgtoPasswordScreen from './Screens/ForgotPasswordScreen'
import RegisterScreen from './Screens/RegisterScreen';
import BusquedaScreen from './Screens/BusquedaScreen'
//import ProfileScreen from './Screens/ProfileScreen'
//import ProfileScreen2 from './Screens/ProfileScreen2'
import ProfileScreen3 from './Screens/ProfileScreen3'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Container } from 'react-bootstrap';
import ShippingScreen from './Screens/ShippingScreen'
import Navbar from './Components/Navigation/Navbar'

function App() {
  return (
   
    <Router >
      {/* <Header/> */}
     
      <Navbar/> 
     

      <main className='App'>
        <Container>
          <Route path='/envio' component={ShippingScreen}/>
          <Route path='/cuenta' component={LoginScreen}/>
          {/* <Route path='/micuenta' component={ProfileScreen}/> */}
          {/* <Route path='/micuenta' component={ProfileScreen2}/> */}
          <Route path='/micuenta' component={ProfileScreen3}/>
          <Route path='/reestablecer' component={ForgtoPasswordScreen}/> 
          <Route path='/registro' component={RegisterScreen}/> 
          <Route path='/product/:id' component={ProductScreen}/> 
          <Route path='/carrito/:id?' component={CartScreen}/> 
          <Route path='/busqueda' component={BusquedaScreen}/>
          <Route path='/dulceria' component={DulceriaScreen}/> 
          <Route path='/' component={HomeScreen} exact/> 
          
        </Container>
      </main>
      <Footer/>
    </Router>
    
  );
}

export default App;
