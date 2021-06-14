import axios from 'axios'
import {PAYMENT_INTENT_CREATE, PAYMENT_INTENT_FAIL, PAYMENT_INTENT_RESET, PAYMENT_INTENT_SUCCESS} from '../constants/paymentConstants'

export const createPaymentIntent = (itemsList, user) => async (dispatch)=>{

    try {
        dispatch({
            type:PAYMENT_INTENT_CREATE
        })

        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }
    
        const {data} = await axios.post(`/api/payment/intent`,{itemsList}, config  )

        dispatch({
            type:PAYMENT_INTENT_SUCCESS,
            payload: data
        })

        await axios.post('/api/users/pushIntent',{paymentIntentData: data, user}, config )

        
    } catch (error) {
        dispatch({
            type: PAYMENT_INTENT_FAIL,
            payload : error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const clearClientSecret = () => async (dispatch)=>{
        dispatch({
            type: PAYMENT_INTENT_RESET
        })

    
}