import React from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {Link} from 'react-router-dom'
import {ListGroup, Card, Container, Form, Button, Col, Row, InputGroup } from 'react-bootstrap'
import {Formik} from 'formik'
import {billingInfoSchema } from '../../formValidations/billingValidation'
import {FaCreditCard} from 'react-icons/fa'
import classes from './CheckoutForm.module.css'
import { IoIosArrowForward} from "react-icons/io";

const CheckoutForm = () => {

    const stripe = useStripe()
    const elements = useElements()

    const submitHandler = async (e)=>{
        e.preventDefault()
        let formData = {
            name: e.target[1].value,
            zip: e.target[2].value
        }
        const isValid = await billingInfoSchema.isValid(formData)
        
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if(error){
            console.log(elements)
            elements.getElement("card").focus()
            return
        }else{
            console.log('[paymentMethod]', paymentMethod)
        }
        
    }

    const cardStyle = {
        iconStyle: "solid",
        style: {
          base: {
            iconColor: "red",
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
            <Form noValidate onSubmit={submitHandler} className={classes.formLabl}>
                <Form.Group controlId='creditCard'className={classes.creditCard} >
                    <Card className={classes.card}>
                        <Form.Label className='my-4' >Tarjeta &nbsp; <FaCreditCard></FaCreditCard> </Form.Label>
                            <CardElement id="card-element" options={cardStyle} />
                    </Card>
                </Form.Group>
                <h5 className='my-5'>Dirección de facturación (Tarjeta)</h5>
                <Form.Group controlId='nameOnCard' >
                    <Form.Label>Nombre del titular</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Nombre completo' 
                        >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor ingresa calle y número.
                    </Form.Control.Feedback>
                </Form.Group>
            <Row>
                <Form.Group as={Col} xs={4} controlId='zipOnCard' >
                    <Form.Label >CP</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Código postal' 
                        >
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Por favor ingresa calle y número.
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
                
                {/* <h5 className='my-5'>Dirección de facturación (Tarjeta)</h5>
                <Form.Group className={classes.checkb} controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Mi dirección de facturación es igual a la de envío" />
                </Form.Group>
               
                <Form.Group controlId='address' >
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Calle y número' 
                        >
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
                        >
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
                        >
                    </Form.Control> 
                    <Form.Control.Feedback type="invalid">
                        El código postal es necesario para la entrega
                    </Form.Control.Feedback>
                </Form.Group> */}
                
                <Button className={classes.button} type='submit' variant='warning'>
                        Procesar pago 
                </Button>

            </Form>
            </Col>
        </Row>

    </Container> 
        
    )   
}


  

export default CheckoutForm
