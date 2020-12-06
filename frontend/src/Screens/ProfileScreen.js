import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Row, Col, Button, FormGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'


const ProfileScreen = ({history}) => {
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
    const {success, updateError} = userUpdateProfile
    
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

    return <Row>
        <Col md={3} style={{paddingBottom: '15px'}}>
        <h2>Mi Cuenta</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {success &&  <Message variant='success'>{success}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {updateError && <Message variant='danger'>{updateError}</Message>}
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

                <Button type='submit' variant='primary'>
                    Actualizar mis datos
                </Button>
            </Form>
             
        </Col>
        <Col md={9}>
            <h2>Mis ordenes</h2>
        </Col>

    </Row>
}

export default ProfileScreen
