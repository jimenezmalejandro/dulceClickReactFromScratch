import React, {useState, useEffect} from 'react'
import {Form, Button, Modal} from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../Components/FormContainer'
import {validateZip} from '../actions/zipValidationActions'
import {updateUserAddress} from '../actions/userActions'

const ShippingScreen = ({history }) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {addressInfo} = userDetails.user

    const zip = useSelector((state)=> state.zipValidate)
    const {zipInfo} = zip

    const userUpdateAddress = useSelector(state => state.userUpdateAddress)
    const {loading, error, success} = userUpdateAddress

    const [address, setAddress] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [references, setReferences] = useState('')
    const [validated, setValidated] = useState(false)
    const [cellphone, setCellphone] = useState('')
    const [notSupportedZip, setNotSupportedZip] = useState(false)
    const country = 'México'

    useEffect(() => {
        if(addressInfo){
            setPostalCode(addressInfo.postalCode)
            setAddress(addressInfo.streetAndNumber)
            setCity(addressInfo.city)
        }
        console.log("this is looping")
    }, [zipInfo,success])

    const submitHandler =  (e)=>{
        e.preventDefault()
        e.stopPropagation()
        const form = e.currentTarget
        
        setValidated(true)

        if(form.checkValidity() === false){
            return
        }

        if(!zipInfo && validated){
            setNotSupportedZip(true)    
        }
        

        if(zipInfo){
            const newAddress = {
                streetAndNumber: address,
                postalCode,
                city,
                cellphone,
                references,
                neighborhood
            }
            
           dispatch(updateUserAddress(newAddress))
        }

    }

    const closeModal = ()=>{
        setAddress('')
        setNeighborhood('')
        setCity('')
        setPostalCode('')
        setReferences('')
        setValidated(false)
        setNotSupportedZip(false)
    }
 
    return <FormContainer>
        { loading && <Loader></Loader> }
        { error && <Message variant="danger">{error}</Message>}
        { success && <Message variant="success">{success}</Message>}
        <h1> Envío <i className="fa fa-truck" aria-hidden="true"></i></h1>
        <Form  noValidate validated={validated} onSubmit={submitHandler} >
            <Form.Group controlId='address'>
                <Form.Label>Dirección</Form.Label>
                <Form.Control 
                    required
                    type='text'
                    placeholder='Calle y número' 
                    value={address} 
                    onChange={(e)=> setAddress(e.target.value)}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Por favor ingresa calle y número.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='neighborhood'>
                <Form.Label>Colonia</Form.Label>
                <Form.Control 
                    required
                    type='text'
                    placeholder='Colonia' 
                    value={neighborhood} 
                    onChange={(e)=> setNeighborhood(e.target.value)}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                    Por favor ingresa tu colonia
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group controlId='city'>
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Guadalajara, Zapopan, Tlajomulco' 
                    value={city} 
                    onChange={(e)=> setCity(e.target.value)}>
                </Form.Control> 
                <Form.Control.Feedback type="invalid">
                    Por favor ingresa la ciudad donde será la entrega.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='postalcode'>
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Código postal' 
                    value={postalCode} 
                    onChange={(e) => 
                        {
                            setPostalCode(e.target.value)   
                            dispatch(validateZip(e.target.value))
                        }}
                    >
                </Form.Control> 
                <Form.Control.Feedback type="invalid">
                    El código postal es necesario para la entrega
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='reference'>
                <Form.Label>Referencia</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Cruces, color de cancel, nombre de tu coto, etc..' 
                    value={references} 
                    onChange={(e)=> setReferences(e.target.value)}>
                </Form.Control> 
                <Form.Control.Feedback type="invalid">
                    Por favor ingresa una referencia, nombre de tu coto, color de cancel, punto de interés cercano....
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='cellphone'>
                <Form.Label>Teléfono celular</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='número a 10 digitos' 
                    value={cellphone} 
                    onChange={(e)=> setCellphone(e.target.value)}>
                </Form.Control> 
                <Form.Control.Feedback type="invalid">
                    Usaremos tu número para comunicarnos contigo en caso de tener problemas con la entrega
                </Form.Control.Feedback>
            </Form.Group>
            
            <Button className="my-4" type='submit' variant='info'>
                    Guardar mi dirección!
            </Button>
        </Form>
        
    <Modal
        centered
        show={notSupportedZip}
    >
        <Modal.Header>Alerta!</Modal.Header>
        <Modal.Body>
            Lo sentimos!😳 No tenemos cobertura en tu zona.(Prueba con la de un amigo)
        </Modal.Body>
        <Button onClick={closeModal}>Ok</Button>

    </Modal>
        
    
    </FormContainer>
    
}

export default ShippingScreen
