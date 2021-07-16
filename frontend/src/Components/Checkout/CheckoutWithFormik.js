import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import{Row, Container, Form, Col, Card, Button, ListGroup, Image} from 'react-bootstrap'
import Message from '../Message'
import Loader from '../Loader'
import CheckoutSteps from '../CheckoutSteps'
import {useFormik} from 'formik'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {billingInfoSchema } from '../../formValidations/billingValidation'
import {RiSecurePaymentLine} from 'react-icons/ri'
import classes from './CheckoutForm.module.css'
import NumberFormat from 'react-number-format'
import {es} from 'date-fns/locale'
import {format, add} from 'date-fns'
import {createPaymentIntent, clearClientSecret} from '../../actions/paymentActions'



const CheckoutWithFormik = () => {
    const dispatch = useDispatch()

    const stripe = useStripe()
    const elements = useElements()
    const [processing, setProcessing] = useState(false)
    const [cardComplete, setCardComplete] = useState(false)
    const [paymentError, setPaymentError] = useState(null)

    const itemList = useSelector(state => state.cart)
    const {cartItems} = itemList

    const userDetails = useSelector(state=> state.userDetails)
    const {user} = userDetails

    const  paymentIntent = useSelector(state => state.paymentIntent)
    const {loading} = paymentIntent


    let deliveryDate = format( add(new Date(),{days: 2}), 'EEEEEEE d MMM ',{locale:es})

    const handleCardChange = e =>{
        setCardComplete(e.complete)
        setPaymentError(e.error)
    }

    useEffect(() => {
        
        window.scrollTo(0,0) 
        dispatch(createPaymentIntent(cartItems, user))    
        console.log('loop')

        return () => {
            dispatch(clearClientSecret())
        }

    }, [])

    const formik = useFormik({
        initialValues : {
            name: "",
            zip: ""
        },
        onSubmit: async (e)  => {
            
            const billingDetails = {
                name: e.name,
                address: {
                    postal_code : e.zip,
                    country: 'MX'
                }
            }
            if(!stripe || !elements ){return}
            const cardElement = elements.getElement(CardElement)

            if(cardComplete){
                setProcessing(true)
            }

            console.log(processing)

            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details : billingDetails
            })
            
            if(error){
                console.log('[error is]', error)
                setPaymentError(error) 
            }else{
                console.log('[Payment method is ]', paymentMethod)
                console.log(billingDetails)
            }
        },
        validationSchema: billingInfoSchema
    })
    
    const cardStyle = {
        iconStyle: "solid",
        style: {
          base: {
            iconColor:"lightgray",
            color: "#333",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "lightgray"
            }
          },
          invalid: {
            color: "#f5c6cb",
            iconColor: "#f5c6cb"
          }
        },
        hidePostalCode : true
      }
      

    return (<>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            { loading ? <Loader/> : <Container>
            <Row className="justify-content-md-center my-3">
                <Col className='col-lg-6 col-xl-6 col-md-8 col-sm-12 center'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className={classes.lgItem}>
                            <div>Productos ({cartItems.reduce((accum, item) => accum + item.qty ,0 )}):</div>
                            <NumberFormat
                                displayType='text'
                                value={cartItems.reduce((accum, item)=> accum + item.precio * item.qty ,0)}
                                thousandSeparator={true}
                                prefix={'$'}
                                decimalScale={2}
                                fixedDecimalScale={true}
                            ></NumberFormat>
                        </ListGroup.Item>
                        <ListGroup.Item className={classes.lgItem}>Envío: 
                            <NumberFormat
                                    displayType='text'
                                    value={cartItems.reduce((accum, item)=> accum + item.precio * item.qty ,0) >= 999 ? 0 : 139 }
                                    thousandSeparator={true}
                                    prefix={'$'}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                ></NumberFormat>
                        </ListGroup.Item>
                        <ListGroup.Item className={classes.lgItem}>Total: 
                            <span style={{'fontWeight': 900}}>
                                <NumberFormat
                                        displayType='text'
                                        value={
                                            (cartItems.reduce((accum, item)=> accum + item.precio * item.qty ,0) >= 999 ? 0 : 139)
                                            + cartItems.reduce((accum, item)=> accum + item.precio * item.qty ,0)
                                        }
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                    ></NumberFormat>
                            </span>
                        </ListGroup.Item>
                        <ListGroup.Item className={classes.lgItem}>
                            <div>Entrega estimada:</div>
                            <div><span style={{'color' : 'green'}}>{deliveryDate}</span></div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className='col-lg-6 col-xl-6 col-md-8'>            
                <Form noValidate onSubmit={formik.handleSubmit} className={classes.formLabl}>
                    {/* <Form.Group controlId='creditCard'className={classes.creditCard} >
                        <Card className={classes.card}>
                            <Form.Label className='my-4' >Tarjeta &nbsp; <FaCreditCard></FaCreditCard> </Form.Label>
                                <CardElement id="card-element" options={cardStyle} onChange={handleCardChange} />
                        </Card>
                    </Form.Group> */}
                            

                    {/* <h5 className='my-4'>Dirección de facturación (Tarjeta)</h5> */}
                    {paymentError && (
                                <Message variant='danger'> 
                                    {paymentError.message}
                                </Message>
                                )}
                    <Form.Label>Tarjeta</Form.Label>
                    <Form.Group className={classes.cardDetails}>
                        <CardElement id="card-element"  onChange={handleCardChange} options={cardStyle} />
                    </Form.Group>

                    <Form.Group controlId='nombre' >
                        <Form.Label>Nombre del titular</Form.Label>
                        <Form.Control
                            name= 'name'
                            required
                            type='text'
                            ceholder='Nombre completo' 
                            value= {formik.values.name}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.name && formik.errors.name}
                            onBlur={formik.handleBlur}
                            disabled={processing}
                            >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                                {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                <Row>
                    <Form.Group as={Col} xs={4} controlId='zip' >
                        <Form.Label >CP</Form.Label>
                        <Form.Control 
                            name='zip'
                            required
                            type='text'
                            placeholder='Código postal'
                            value={formik.values.zip}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.zip && formik.errors.zip}
                            onBlur={formik.handleBlur}
                            disabled={processing}
                            >
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            Ingresa el código postal de la tarjeta.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Pais">
                        <Form.Label>País</Form.Label>
                            <Form.Control  defaultValue='México' disabled>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Form.Group  controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control  defaultValue='dirección de correo electrónico' disabled>
                    </Form.Control>
                </Form.Group>
                    <Button className={classes.button} disabled={!stripe || processing} type='submit' variant='warning'>
                            {processing ? 'Procesando...' :  
                             <div>Processar pago <RiSecurePaymentLine/></div> } 
                    </Button>
    
                </Form>
                </Col>
            </Row>
    
        </Container> }
        </>
    )
}


export default CheckoutWithFormik
