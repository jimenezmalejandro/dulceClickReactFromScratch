import axios from 'axios'
import {
    RESET_PASSWORD_REQUEST, 
    RESET_PASSWORD_SUCCESS, 
    RESET_PASSWORD_FAIL} from '../constants/resetPasswordConstants'

export const reset = (email, validation) => async (dispatch, getState)=> {
    try {
        dispatch({
            type:RESET_PASSWORD_REQUEST
        })

        const config = {
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/api/users/reset',{email, validation}, config)
        
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload : error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}