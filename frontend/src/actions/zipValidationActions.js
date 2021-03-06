import axios from 'axios'
import {
    ZIP_VALIDATE_FAIL,
    ZIP_VALIDATE_SUCCESS,
    ZIP_VALIDATE_REQUEST,
    ZIP_VALIDATE_RESET
} from '../constants/zipConstants'

export const validateZip = (zipcode) => async (dispatch)=>{
    try {
        dispatch({
            type: ZIP_VALIDATE_REQUEST
        })
        
        const config = {
            headers : {
                'Content-type' : 'application/json'
            }
        }

        const {data} = await axios.post('api/zip/validatezip', {zipcode}, config)

        dispatch({
            type: ZIP_VALIDATE_SUCCESS,
            payload : data 
        })

    } catch (error) {
        dispatch({
            type: ZIP_VALIDATE_FAIL,
            payload : error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const zipValidateReset = () => async (dispatch) =>{

    dispatch({
        type: ZIP_VALIDATE_RESET
    })

}