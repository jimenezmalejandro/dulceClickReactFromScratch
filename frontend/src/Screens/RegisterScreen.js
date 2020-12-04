import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import {Form, Row, Col, Button, FormGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {register} from '../actions/userActions'
import FormContainer from '../Components/FormContainer'
import AppConfig from '../App.config'


const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null) 
    const [validation, setValidation] = useState('')

    
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister
    
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            console.log(`[useEffect] fired, userInfo: ${userInfo} and redirect is : ${redirect}` );
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        if( password !== confirmPassword ){
            setMessage('Las contraseñas no coinciden')
        }else {
            console.log('this has been rquested to be dispatched')
            dispatch(register(name, email, password , validation))
            console.log('dispatched register')
        }
        
    }

    return (
        <FormContainer>
            <h1>Registrate!</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='ingresa constraseña' 
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}>
                    </Form.Control> 
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirma tu contraseña</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='confirma tu constraseña' 
                        value={confirmPassword} 
                        onChange={(e)=> setConfirmPassword(e.target.value)}>
                    </Form.Control> 
                </Form.Group>

                 <Form.Group>
                     <ReCAPTCHA
                        sitekey={AppConfig.GOOGLE.siteKey}
                        onChange={token  => setValidation(token)}
                        onExpired={e => setValidation('')}
                    />
                 </Form.Group>
                    
                <Button type='submit' variant='primary'>
                    Crea mi cuenta!
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Ya tengo cuenta ! 
                    <Link to={redirect ? `/cuenta?redirect=${redirect}` : '/cuenta'}>  Ingresar a mi cuenta
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
