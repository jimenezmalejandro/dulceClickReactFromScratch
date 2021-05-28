import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {Form, Button, Col} from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader' 
import CheckoutWithFormik from '../Components/Checkout/CheckoutWithFormik'
import {validateZip} from '../actions/zipValidationActions'
import {getUserDetails, updateUserAddress} from '../actions/userActions'
import {loadStripe} from '@stripe/stripe-js'
import {Elements, CardElement} from '@stripe/react-stripe-js'
import dotenv from 'dotenv'

const public_key = 'pk_test_51Ia9GqH4MkrLRtKb7BDTDJxSUAlox0r3c3fo0ogyYIW8y6HBkekT16B9wFPuVsfEJwuUoM53eSggQVBzqliiEuYW00piH9JPEd'

const stripePromise = loadStripe(public_key)

const PaymentScreen = ({history, match }) => {
    
    const userDetails = useSelector(state=> state.userDetails)
    const {user: {addressInfo}} = userDetails

    if(!addressInfo){
        history.push('/envio')
    }

    return(
        <>
        <h1> Pago </h1>
        <Elements stripe={stripePromise}>
            <CheckoutWithFormik></CheckoutWithFormik>
        </Elements>
       </>
    )
 
}

export default withRouter(PaymentScreen)