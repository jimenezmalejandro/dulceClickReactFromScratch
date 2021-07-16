import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {shippingInfoSchema} from '../formValidations/billingValidation'
import {useFormik} from 'formik'
import {Link, withRouter} from 'react-router-dom'
import {Form, Button, Modal, Toast, Col, Row, Container, ListGroup, InputGroup} from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import CheckoutSteps from '../Components/CheckoutSteps' 
import {validateZip, zipValidateReset} from '../actions/zipValidationActions'
import {getUserDetails, updateUserAddress} from '../actions/userActions'
import {BiPackage} from 'react-icons/bi'
import classes from './ShippingScreen.module.css'

const ShippingScreenFormik = ({history, match }) => {
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {user : {addressInfo}, loading : loadingUserDets} = userDetails

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
    const [addressInfoFull, setAddressInfoFull] = useState(false)
    const [useExistingAddress, setUseExistingAddress] = useState(false)
    

    const shippingScreen = history.location.pathname === '/envio'
    const colWidth = shippingScreen ? 'col-lg-6' : 'col-lg-12 col-md-9'

    useEffect(() => {
        let coloniasSelect = document.querySelector('#neighborhood')
        if (addressInfo){
            if( addressInfo.hasOwnProperty('streetAndNumber') && 
                addressInfo.hasOwnProperty('references') && 
                addressInfo.hasOwnProperty('postalCode') && 
                addressInfo.hasOwnProperty('neighborhood') && 
                addressInfo.hasOwnProperty('city') && 
                addressInfo.hasOwnProperty('cellphone') )
                {
                    setAddressInfoFull(true)
                }
        }else{
            dispatch(getUserDetails('profile'));
        }
        if(zipInfo){
            console.log(zipInfo)
            coloniasSelect.innerHTML = ''
            console.log(coloniasSelect.options)

            let defaultOption = document.createElement('option')
                defaultOption.defaultSelected = true
                defaultOption.text = 'Selecciona una ...'
                coloniasSelect.add(defaultOption)

            zipInfo.colonias.forEach(element => {
                let option = document.createElement('option')
                option.text = element
                option.value = element
                coloniasSelect.add(option)
            })
            
            
            setValidated(true)
        }
        if(zipError){
            setNotSupportedZip(true)
            setValidated(false)
        }
        return ()=>{
            if(zipInfo){
                console.log('Clean out useEffect')
                dispatch(zipValidateReset())
            }
        }
    }, [success, addressInfo, zipInfo, zipError, addressInfoFull])

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

    const formik = useFormik({
        initialValues : {
                calle : '',
                codigoPostal : '',
                ciudad : '',
                colonia: '',
                referencia : '', 
                celular : ''
        },
        
        onSubmit: async (e) =>{
            
            console.log('fired onsubmit')
            console.log(e)
            if(zipInfo && validated){
                const newAddress = {
                    streetAndNumber : address,
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
        },

        validationSchema : shippingInfoSchema
    })

    const submitWithExisting = (e)=>{
            setShow(true)
            dispatch(getUserDetails('profile'))
            history.push('/pago')
    }

    const useExisting =(e)=>{
        setUseExistingAddress(e.target.checked)
    }

    return( <>
    {console.log(formik)}
    {console.log(neighborhood)}
    {loadingUserDets ? <Loader/> : <Container>
    <Row className="justify-content-md-center">
        <Col className={colWidth}>
        {shippingScreen &&
            <Row>
                <Link to='/carrito' className='btn'> 
                    <Button variant="dark">
                        Regresar
                    </Button>
                </Link>
            </Row>
        }
        {shippingScreen &&
            <CheckoutSteps step1 step2></CheckoutSteps>
        }
        
        <h3 style={{'marginBottom': '2rem'}}> Dirección de envío <BiPackage/></h3>

        {addressInfoFull && <>
        <Row className={classes.existingAddressRow}>
            <InputGroup className={classes.check}>
                Usa tu dirección de envío existente <span>&nbsp;&nbsp;</span>
                <InputGroup.Checkbox  aria-label="check use existing address" onChange={useExisting}/>
            </InputGroup>
            <Col md={12}  className={classes.existingAddress}>
                <ListGroup className={classes.existingAddress}>
                    <ListGroup.Item>{addressInfo.streetAndNumber}</ListGroup.Item>
                    <ListGroup.Item>{addressInfo.neighborhood} </ListGroup.Item>
                    <ListGroup.Item>{addressInfo.city}, {addressInfo.postalCode}</ListGroup.Item>
                    <ListGroup.Item>Referencias: {addressInfo.references}</ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
        </>
        }

    {!useExistingAddress ? 
        <>      
        {addressInfoFull && <div className={classes.nuevaDireccion}>Ó ingresa una nueva dirección: <br /> <br /></div>} 
        <Form  noValidate onSubmit={formik.handleSubmit} validated={validated} className={classes.form} >
            <Form.Group controlId='address' >
                {/* <Form.Label>Calle y número</Form.Label> */}
                <Form.Control 
                    name= 'calle'
                    required
                    type='text'
                    placeholder='Calle y número' 
                    value={formik.values.calle} 
                    onChange={(e)=> {
                        setAddress(e.target.value)
                        formik.handleChange(e)
                    }}
                    isInvalid={formik.touched.calle && formik.errors.calle}
                    onBlur={formik.handleBlur}         
                >
                </Form.Control>
                <Form.Control.Feedback type="invalid" className={classes.invalidInput}>
                    {formik.errors.calle}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='postalcode'>
                {/* <Form.Label>Código Postal</Form.Label> */}
                <Form.Control
                    name='codigoPostal'
                    required
                    type='text'
                    placeholder='Código postal' 
                    value={formik.values.codigoPostal} 
                    onChange={(e) => 
                        {
                            validation(e)
                            formik.handleChange(e)
                        }
                    }
                    isInvalid={formik.touched.codigoPostal && formik.errors.codigoPostal}
                    onBlur = {formik.handleBlur}
                    >
                </Form.Control> 
                <Form.Control.Feedback type="invalid" className={classes.invalidInput}>
                    Ingresa el código postal de la dirección de envío.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='city'>
                {/* <Form.Label>Ciudad</Form.Label> */}
                <Form.Control
                    name='ciudad'
                    required
                    type='text'
                    placeholder='Guadalajara, Zapopan, Tlajomulco' 
                    value={ formik.values.ciudad} 
                    onChange={(e)=> {
                        setCity(e.target.value)
                        formik.handleChange(e)
                    }}
                    isInvalid={formik.touched.ciudad && formik.errors.ciudad}
                    onBlur={formik.handleBlur}         
                    >
                </Form.Control> 
                <Form.Control.Feedback type="invalid" className={classes.invalidInput}>
                    Por favor ingresa la ciudad donde será la entrega.
                </Form.Control.Feedback>
            </Form.Group>

            {loadZip ? <Loader></Loader> : 
            <Form.Group controlId='neighborhood'>
                {/* <Form.Label>Colonia</Form.Label> */}
                <Form.Control
                    name='colonia'
                    as="select" 
                    required
                    type='text'
                    placeholder='Colonia' 
                    value={ formik.values.colonia} 
                    onChange={(e)=> {
                        console.log('onChange is:', e)
                        setNeighborhood(e.target.value)
                        formik.handleChange(e)
                        formik.setFieldValue(zipInfo.colonias[0])
                        
                    }}
                    isInvalid={formik.touched.colonia && formik.errors.colonia}
                    onBlur={formik.handleBlur} 
                    >
                             
                </Form.Control>
                <Form.Control.Feedback type="invalid" className={classes.invalidInput}>
                    Por favor ingresa tu colonia
                </Form.Control.Feedback>
            </Form.Group>
            }

            <Form.Group controlId='reference'>
                {/* <Form.Label>Referencia</Form.Label> */}
                <Form.Control
                    name='referencia'
                    required
                    type='text'
                    placeholder='Cruces, color de cancel, nombre de tu coto, etc..' 
                    value={formik.values.referencia} 
                    onChange={(e)=> {
                        setReferences(e.target.value)
                        formik.handleChange(e)
                    }}
                    isInvalid={formik.touched.referencia && formik.errors.referencia}
                    onBlur={formik.handleBlur}    
                    
                    >
                </Form.Control> 
                <Form.Control.Feedback type="invalid" className={classes.invalidInput}>
                    Por favor ingresa una referencia, nombre de tu coto, punto de interés cercano....
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='cellphone'>
                {/* <Form.Label>Teléfono celular</Form.Label> */}
                <Form.Control
                    name='celular'
                    required
                    type='text'
                    placeholder='número a 10 digitos' 
                    // value={cellphone} 
                    // onChange={(e)=> setCellphone(e.target.value)}
                    value={ formik.values.celular} 
                    onChange={(e)=> {
                        setCellphone(e.target.value)
                        formik.handleChange(e)
                    }}
                    isInvalid={formik.touched.celular && formik.errors.celular}
                    onBlur={formik.handleBlur}    
                    
                    >
                </Form.Control> 
                <Form.Control.Feedback type="invalid" className={classes.invalidInput}>
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
        </>
        :
        <Row className="justify-content-center">
            <Button onClick={submitWithExisting}>Continuar con el pago</Button>
        </Row>
    }
        
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
    </Container>}
    </>
    )
    
}

export default withRouter(ShippingScreenFormik)