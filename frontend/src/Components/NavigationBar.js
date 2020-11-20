import classes from './NavigationBar.module.css'
import {LinkContainer} from 'react-router-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,Nav, NavDropdown, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
    return (
      <Navbar collapseOnSelect expand="lg" className={classes.navbar} variant="dark">
      <LinkContainer to='/'>
        <Navbar.Brand>
          <Image src="/transparentLogo.png" className={classes.img}/>
        </Navbar.Brand>
      </LinkContainer>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to='/home' >
            <Nav.Link>Inicio</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/promociones'>
            <Nav.Link>Promociones</Nav.Link>
          </LinkContainer>
          <NavDropdown title="Catalogo" id="collasible-nav-dropdown">
            <LinkContainer to='/dulceria'>
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
          <LinkContainer to='/carrito'>
            <Nav.Link ><i className='fas fa-shopping-cart'></i> Carrito</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/cuenta'>
            <Nav.Link ><i className='fas fa-user'></i> Cuenta</Nav.Link>
          </LinkContainer>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
}

export default NavigationBar
