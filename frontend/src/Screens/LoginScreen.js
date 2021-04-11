import React, {useState, useEffect} from 'react'
import {Link, Route} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../Components/FormContainer'
import {GoKey} from 'react-icons/go'


const LoginScreen = ({location, history}) => {
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
        
    }

    return (
        <FormContainer>
            <h1>Ingresa a tu cuenta </h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
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
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='ingresa constraseña' 
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}>
                    </Form.Control> 
                    <Link to='/reestablecer'>Olvidé mi contraseña</Link>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Ingresar
                </Button>
            </Form>

            <Row className='py-5'>
                <Col>
                    No tienes cuenta? : &nbsp;  
                    <Link to={redirect ? `/registro?redirect=${redirect}` : '/registro'}>
                        <span style={{fontSize: '1.2rem', color: 'blue'}}>&nbsp;Crear cuenta</span><br/>
                    </Link>
                    <span style={{fontSize: '.8rem', color: 'black'}}>&nbsp;(solo tomará unos segundos 😉)</span>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
