import React, {useState} from 'react'
import {withRouter,Link} from 'react-router-dom'
import {NavDropdown, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import * as FaIcons from "react-icons/fa"
import * as FiIcons from 'react-icons/fi'
import * as AiIcons from "react-icons/ai"
import * as BsIcons from 'react-icons/bs'
import * as VscIcons from 'react-icons/vsc'
import './Navbar.css'
import { Form } from 'react-bootstrap'
import {logout} from '../../actions/userActions'


const Navbar = ({history, location, match}) => {
    
    const dispatch = useDispatch()

    let name = false
    const user = useSelector(state => state.userLogin.userInfo )
    if(user){
        name = user.name
    }else{
        console.log('not logged in')
    }

    let currentPath = history.location.pathname

    const [sidebar, setSidebar] = useState(false)
    const[busqueda, setBusqueda] = useState('')

    const showSidebar = (e)=> {
        setSidebar(!sidebar)
    }

    const submitHandler = (e)=> {
        e.preventDefault()
        history.push(`/busqueda?producto=${busqueda}`)
    }
    
    return (
        <>
            <div className={sidebar? 'bckgr' : ''} onClick={showSidebar}></div>
            <div className="navbar">
                <div className='logoAndMenu'>
                    <a href="#" className='menu-bars'>
                        <FaIcons.FaBars style={{'color': '#fff', 'size':'2rem'}}  onClick={showSidebar} />
                    </a>
                    <Link to='/' className='logo'><img src="/transparentLogo.png" className='logo' alt="logo"/></Link>
                </div>
                
                    <div className='cart'>
                        <Link to='/carrito'>
                            <FiIcons.FiShoppingCart style={{'color': '#fff', 'fontSize':'1.5rem'}}/>
                        </Link>
                    </div>

                <div className='searchBar' >
                    <Form id='busqueda'onSubmit={submitHandler} >
                          <Form.Control type='text' placeholder='Buscar' onChange={(e) => setBusqueda(e.target.value) } />
                    </Form>
                    <div className='searchIcon' onClick={submitHandler}>
                        <BsIcons.BsSearch />
                    </div>
                </div>
                
            </div>

            <nav className={sidebar? 'nav-menu active': 'nav-menu'}>
                <div className="close-Icon">
                    <a href='#'  onClick={showSidebar}>
                        <AiIcons.AiOutlineClose style={{'color': 'black'}} />
                    </a>
                </div>
                <div className="userName">
                    <VscIcons.VscAccount/>
                      {name ? (<Link to='/micuenta'>  Hola, {name} </Link>)
                      : (<div>
                          <Link to='/cuenta'> Inicia sesión </Link>
                          o
                          <Link to='/registro'> Crear cuenta </Link>
                      </div>)
                      } 
                </div>
                <ul className='nav-menu-items'>
                    {/* <li className="navbar-toggle">
                    </li> */}
                    <li onClick={(e) => history.location.pathname !== currentPath && showSidebar() }>
                        <Nav className="mr-auto sideNavigation" >
                            <Link to='/'  onClick={showSidebar} >
                                Inicio
                            </Link>
                            <Link to='/promociones' onClick={showSidebar}>
                                Promociones
                            </Link>
                            {/* //Dropdown Catalogue  */}
                                <NavDropdown title="Catalogo" id="collasible-nav-dropdown"className='catalogo'>
                                    <LinkContainer to='/catalogo/dulceria' >
                                        <NavDropdown.Item>Dulcería</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/desechables' >
                                        <NavDropdown.Item >Desechables</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/abarrotes'>
                                        <NavDropdown.Item >Abarrotes</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='artfiesta' >
                                        <NavDropdown.Item >Articulos P/ fiesta</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider />
                                    <LinkContainer to='/estuches' >
                                        <NavDropdown.Item>Estuches de regalo</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                                {user && 
                                    (
                                    <Link to='/micuenta'>Mi cuenta</Link>
                                    )
                                }
                        </Nav>
                    </li>
                    {user && 
                    <li className='cerrarSesion'>
                        <a href="/" onClick={dispatch(logout)}>Cerrar sesión</a>
                    </li>}
                    
                </ul>
            </nav>
        </>
    )
}

export default withRouter(Navbar)