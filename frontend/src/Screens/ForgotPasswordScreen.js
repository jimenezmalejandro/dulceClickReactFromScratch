import React, {useState, useEffect} from 'react'
import {Link, Route} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap'
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


    useEffect(()=>{
        if(isValid){

        }
    },[isValid])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(reset(email))
        
    }

    return (
        <FormContainer> 
            <h2>Reestablecer mi contraseña</h2>
            {loading && <Loader></Loader>}
            {error && <Message variant='danger'>{error}</Message>}
            {isValid && <Message >{isValid} 📧</Message>}
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
                <Button type='submit' variant='primary'>
                    Reestablecer
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ForgotPasswordScreen
