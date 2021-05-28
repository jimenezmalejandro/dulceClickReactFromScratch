import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {Form, Button, Modal, Toast, Col, Row, Container} from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import CheckoutSteps from '../Components/CheckoutSteps' 
import {validateZip} from '../actions/zipValidationActions'
import {getUserDetails, updateUserAddress} from '../actions/userActions'
import {BiPackage} from 'react-icons/bi'

const ShippingScreen = ({history, match }) => {
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {user : {addressInfo}} = userDetails

    const zip = useSelector((state)=> state.zipValidate)
    const {zipInfo, error : zipError, loading : loadZip } = zip

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

    const [show, setShow] = useState(false)

    const shippingScreen = history.location.pathname === '/envio'
    const colWidth = shippingScreen ? 'col-lg-6' : 'col-lg-12 col-md-9'

    useEffect(() => {
        let coloniasSelect = document.querySelector('#neighborhood')
        if (addressInfo){
            setReferences(addressInfo.references)
            setCellphone(addressInfo.cellphone)
            setNeighborhood(addressInfo.neighborhood)
            setAddress(addressInfo.streetAndNumber)
            setCity(addressInfo.city)
            console.log('looping in addressInfo')
        }else{
            dispatch(getUserDetails('profile'));
        }
        if(zipInfo){
            console.log(zipInfo)
            coloniasSelect.innerHTML = ''
            console.log(coloniasSelect.options)
            zipInfo.colonias.map(element => {
                let option = document.createElement('option')
                option.text = element
                option.value = element
                coloniasSelect.add(option)
            })
        }
        if(zipError){
            setNotSupportedZip(true)
        }
    }, [success, addressInfo, zipInfo, zipError])

    const submitHandler =  (e)=>{
        e.preventDefault()
        e.stopPropagation()

        const form = e.currentTarget
        
        setValidated(true)

        console.log(form.checkValidity())

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
           setShow(true)
           dispatch(getUserDetails('profile'))
           history.push('/pago')
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
    
    const validation = e =>{
        setPostalCode(e.target.value)

        if(e.target.value.length === 5){
            dispatch(validateZip(e.target.value))
        }
        
    }

    return <Container>
    <Row className="justify-content-md-center">
        <Col className={colWidth}>
        {shippingScreen &&
            <Row>
                <Link to='/carrito'> Regresar</Link>
            </Row>
        }
        {shippingScreen &&
            <CheckoutSteps step1 step2></CheckoutSteps>
        }
        
        <h1> Envío <BiPackage/></h1>
        <Form  noValidate validated={validated} onSubmit={submitHandler} >
            <Form.Group controlId='address' >
                <Form.Label>Calle y número</Form.Label>
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
                            validation(e)
                            // setPostalCode(e.target.value)   
                            // dispatch(validateZip(e.target.value))
                        }}
                    >
                </Form.Control> 
                <Form.Control.Feedback type="invalid">
                    El código postal es necesario para la entrega
                </Form.Control.Feedback>
            </Form.Group>

            {loadZip ? <Loader></Loader> : 
            <Form.Group controlId='neighborhood'>
                <Form.Label>Colonia</Form.Label>
                <Form.Control
                    as="select" 
                    // id="colonias"
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
            }

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
                    Por favor ingresa una referencia, nombre de tu coto, punto de interés cercano....
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='cellphone'>
                <Form.Label>Teléfono celular</Form.Label>
                <Form.Control
                    pattern=".{10,10}"
                    required
                    type='text'
                    placeholder='número a 10 digitos' 
                    value={cellphone} 
                    onChange={(e)=> setCellphone(e.target.value)}>
                </Form.Control> 
                <Form.Control.Feedback type="invalid">
                    10 dígitos -Usaremos tu número para comunicarnos contigo para realizar la entrega
                </Form.Control.Feedback>
            </Form.Group>
            
            { loading && <Loader></Loader> }
            { error && <Message variant="danger">{error}</Message>}
            { success && 
            <Row>
                <Col xs={12} xl={12}>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                    <Toast.Body>✔️{success}</Toast.Body>
                    </Toast>
                </Col>
            </Row>}

            <Button className="my-4" type='submit' variant='info'>
                    Guardar mi dirección
            </Button>
        </Form>
        
    <Modal
        centered
        show={notSupportedZip}
    >
        <Modal.Header>Atención!</Modal.Header>
        <Modal.Body>
            Lo sentimos!😳 No tenemos cobertura en tu código postal.(Prueba con la de un amig@)
        </Modal.Body>
        <Button onClick={closeModal}>Ok</Button>

    </Modal>
    </Col>
</Row>
    </Container>
    
}

export default withRouter(ShippingScreen)