import React, {useState, useEffect} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import AppConfig from '../App.config'
import {Link, Route} from 'react-router-dom'
import {Form, Button, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {login} from '../actions/userActions'
import {reset} from '../actions/resetPasswordActions'
import FormContainer from '../Components/FormContainer'


const ForgotPasswordScreen = ({location, history}) => {
    
    const dispatch = useDispatch()

    const resetPassword = useSelector(state => state.resetPassword)
    const {loading, email : isValid, error} = resetPassword

    const [email, setEmail] = useState('')
    const [validation, setValidation] = useState('')


    useEffect(()=>{
        if(isValid){

        }
    },[isValid ])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(reset(email, validation))
        setValidation('')
    }

    return (
        <FormContainer> 
            <Row className='my-5'>
                <Link to='/cuenta'> Regresar</Link>
            </Row>
            <h2>Reestablecer mi contraseña</h2>
            {loading && <Loader></Loader>}
            {error && <Message variant='danger'>{error}</Message>}
            {isValid && <Message >{isValid} 📧</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        required
                        type='email'
                        placeholder='ingresa tu email' 
                        value={email} 
                        onChange={(e)=> setEmail(e.target.value)}>
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
                    Reestablecer
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ForgotPasswordScreen
