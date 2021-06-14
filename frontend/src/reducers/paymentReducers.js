import {
    PAYMENT_INTENT_CREATE,
    PAYMENT_INTENT_SUCCESS,
    PAYMENT_INTENT_FAIL,
    PAYMENT_INTENT_RESET
} from '../constants/paymentConstants'

export const paymentIntentReducer = (state = {}, action) =>{
    switch(action.type){
        case PAYMENT_INTENT_CREATE:
            return{
                loading :true,
                ...state
            }
        case PAYMENT_INTENT_SUCCESS:
            return{
                loading: false,
                paymentIntentSecret : action.payload 
            }
        case PAYMENT_INTENT_FAIL :
            return{
                loading: false,
                error: action.payload
            }
        case PAYMENT_INTENT_RESET:
            return{
                loading: false,
                paymentIntentSecret : null
            }
        default:
             return state
    }
}

