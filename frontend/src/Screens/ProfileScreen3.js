import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Row, Col, Button, ListGroup, Tab, Tabs, Nav} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import ShippingScreen from '../Screens/ShippingScreen'
import classes from '../Styles/ProfileScreen.module.css' 

const ProfileScreen3 = ({history}) => {
    const [name, setName] = useState('')    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success, error : updateError} = userUpdateProfile
    
    useEffect(()=>{
        if(!userInfo){
            history.push('/cuenta')
        }else{
            if( !user || !user.name || success){
                if(success){
                    alert('Datos actualizados!')
                    setPassword('')
                    setConfirmPassword('')
                }
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
        
    },[dispatch, history, userInfo, user, success])

    const submitHandler = (e) =>{
        e.preventDefault()
        if( password !== confirmPassword ){
            setMessage('Las contraseñas no coinciden')
        }else {
            setMessage(null)
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
        
    }

    return(

<Tab.Container id="left-tabs-example" defaultActiveKey="#misdatos">
  <Row >
    <Col sm={3} >
      <Nav  variant="pills" style={{"margin":"20px"}} className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="#misdatos">Mis datos de cuenta</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="#ordenes">Mis órdenes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="#direccion">Dirección de envío</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
    <Col sm={9} l={3} xl={6} >
      <Tab.Content>
         <Tab.Pane eventKey="#misdatos">
         {/* <h1>Actualizar Cuenta</h1> */}
         <h3 style={{"textAlign" : "left"}}>Acceso</h3>
                {message && <Message variant='danger'>{message}</Message>}
                {success &&  <Message variant='success'>{success}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {updateError && <Message variant='danger'>El email seleccionado ya está registrado con otra cuenta</Message>}
                {loading && <Loader></Loader>}
           
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='ingresa tu Nombre' 
                                value={name} 
                                onChange={(e)=> setName(e.target.value)}>
                            </Form.Control> 
                        </Form.Group>
                        
                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type='email'
                            placeholder='ingresa tu email' 
                            value={email} 
                            onChange={(e)=> setEmail(e.target.value)}>
                        </Form.Control> 
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Cambia tu contraseña</Form.Label>
                        <Form.Control 
                            type='password'
                            placeholder='ingresa constraseña' 
                            value={password} 
                            onChange={(e)=> setPassword(e.target.value)}>
                        </Form.Control> 
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirma tu nueva contraseña</Form.Label>
                        <Form.Control 
                            type='password'
                            placeholder='confirma tu constraseña' 
                            value={confirmPassword} 
                            onChange={(e)=> setConfirmPassword(e.target.value)}>
                        </Form.Control> 
                    </Form.Group>

                    <Button type='submit' variant='info'>
                        Actualizar mis datos
                    </Button>
                </Form>
        </Tab.Pane>

        <Tab.Pane eventKey="#ordenes">
          <h1>Órdenes</h1>
        </Tab.Pane>

        <Tab.Pane eventKey="#direccion">
            <ShippingScreen className='col-md-12 col-12'></ShippingScreen>
        </Tab.Pane>

      </Tab.Content>
    </Col>
  </Row>



</Tab.Container>

    )
}

export default ProfileScreen3
