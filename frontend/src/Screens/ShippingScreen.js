import React, {useState, useEffect} from 'react'
import {Form, Button, Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../Components/FormContainer'
import {validateZip} from '../actions/zipValidationActions'

const ShippingScreen = ({history }) => {

    const dispatch = useDispatch()

    const zip = useSelector((state)=> state.zipValidate)
    const {zipInfo} = zip

    const [address, setAddress] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [references, setReferences] = useState('')
    const [validated, setValidated] = useState(false)
    const [notSupportedZip, setNotSupportedZip] = useState(false)
    const country = 'México'

    useEffect(() => {
        console.log('zipInfo response is : ',  zipInfo )
    }, [zipInfo])

    const submitHandler =  (event)=>{
        event.preventDefault()
        event.stopPropagation()

        const form = event.currentTarget
        if(form.checkValidity() === false){
        }
        if(!zipInfo){
            setNotSupportedZip(true)    
        }

        setValidated(true)
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
        <h1>Envío</h1>
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
                   //{ onChange={(e)=> setPostalCode(e.target.value)}}
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
            
            <Button type='submit' variant='primary'>
                    Guardar mi dirección!
            </Button>
        </Form>
        
    <Modal
        centered
        show={notSupportedZip}
    >
        <Modal.Header>Atención!</Modal.Header>
        <Modal.Body>
            Lo sentimos!😳 No tenemos cobertura en tu zona.(Prueba con la de un amigo)
        </Modal.Body>
        <Button onClick={closeModal}>Ok</Button>

    </Modal>
        
    
    </FormContainer>
    
}

export default ShippingScreen
