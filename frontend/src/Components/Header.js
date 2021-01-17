import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classes from './NavigationBar.module.css'
import {LinkContainer} from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,Nav, NavDropdown, Image, Container, Form, Button, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {logout} from '../actions/userActions'

function Header() {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  useEffect(() => {
    
  }, [userInfo])


  const logoutHandler = ()=>{
    dispatch(logout())
  }

    return (
        <header>
            <Navbar fixed='top' collapseOnSelect expand="lg" className={classes.navbar} variant="dark">
            <Container>
      <LinkContainer to='/'>
        <Navbar.Brand>
          <Image src="/transparentLogo.png" className={classes.img}/>
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to='/' >
            <Nav.Link>Inicio</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/promociones'>
            <Nav.Link>Promociones</Nav.Link>
          </LinkContainer>

        
          <NavDropdown title="Catalogo" id="collasible-nav-dropdown" >
            <LinkContainer to='/catalogo/dulceria'>
              <NavDropdown.Item>Dulcería</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/desechables'>
              <NavDropdown.Item >Desechables</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/abarrotes'>
              <NavDropdown.Item >Abarrotes</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='artfiesta'>
              <NavDropdown.Item >Articulos P/ fiesta</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Divider />
            <LinkContainer to='/estuches'>
              <NavDropdown.Item>Estuches de regalo</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        </Nav>

        
        <Nav>
          <LinkContainer to='/carrito/:id?'>
            <Nav.Link ><i className='fas fa-shopping-cart'></i> Carrito</Nav.Link>
          </LinkContainer>
          {userInfo ? ( 
            <NavDropdown title={userInfo.name.split(' ')[0] } id='username'>
              <LinkContainer to='/micuenta'>
                <NavDropdown.Item>Mi cuenta</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}>Cerrar sesion</NavDropdown.Item>
            </NavDropdown>
          ):(
          <LinkContainer to='/cuenta'> 
            <Nav.Link ><i className='fas fa-user'></i> Cuenta
            </Nav.Link>
          </LinkContainer>
          )
           }
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
      
      

        </header>
    )
}

export default Header
