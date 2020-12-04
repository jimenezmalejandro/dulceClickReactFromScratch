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
import RegisterScreen from './Screens/RegisterScreen';
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Container } from 'react-bootstrap';

function App() {
  return (
   
    <Router >
      <Header/>
      <main className='App'>
        <Container>
          <Route path='/cuenta' component={LoginScreen}/>
          <Route path='/registro' component={RegisterScreen}/> 
          <Route path='/product/:id' component={ProductScreen}/> 
          <Route path='/carrito/:id?' component={CartScreen}/> 
          <Route path='/dulceria' component={DulceriaScreen}/> 
          <Route path='/' component={HomeScreen} exact/> 
        </Container>
      </main>
      <Footer/>
    </Router>
    
  );
}

export default App;
