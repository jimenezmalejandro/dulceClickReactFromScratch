import React, {useState} from 'react'
import{Row, Container, Form, Col, Card, Button} from 'react-bootstrap'
import Message from '../Message'
import {useFormik} from 'formik'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {billingInfoSchema } from '../../formValidations/billingValidation'
import {FaCreditCard} from 'react-icons/fa'
import classes from './CheckoutForm.module.css'

const CheckoutWithFormik = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [processing, setProcessing] = useState(false)
    const [cardComplete, setCardComplete] = useState(false)
    const [paymentError, setPaymentError] = useState(null)

    const handleCardChange = e =>{
        console.log(e)
        setPaymentError(e.error)
        setCardComplete(e.complete)
    }

    const formik = useFormik({
        initialValues : {
            name: "",
            zip: ""
        },
        onSubmit: async (e)  => {
            console.log(e)
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
            iconColor:"#fff",
            color: "#fff",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#fff"
            }
          },
          invalid: {
            color: "#ffc7ee",
            iconColor: "#ffc7ee"
          }
        },
        hidePostalCode : true
      }
      

    return (
            <Container>
            <Row className="justify-content-md-center">
                <Col className='col-lg-6 col-xl-6 col-md-8'>            
                <Form noValidate onSubmit={formik.handleSubmit} className={classes.formLabl}>
                    <Form.Group controlId='creditCard'className={classes.creditCard} >
                        <Card className={classes.card}>
                            <Form.Label className='my-4' >Tarjeta &nbsp; <FaCreditCard></FaCreditCard> </Form.Label>
                                <CardElement id="card-element" options={cardStyle} onChange={handleCardChange} />
                        </Card>
                    </Form.Group>
                            {paymentError && (
                                <Message variant='danger'> 
                                    {paymentError.message}
                                </Message>
                                )}
                    <h5 className='my-5'>Dirección de facturación (Tarjeta)</h5>
                    {console.log(formik)}
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
                            {processing ? 'Procesando...' : 'Procesar pago' } 
                    </Button>
    
                </Form>
                </Col>
            </Row>
    
        </Container> 
    )
}

export default CheckoutWithFormik
