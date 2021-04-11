import axios from 'axios'
import 
{
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_SEARCH_FAIL
} from '../constants/productConstants'

export const listProducts = ()=> async(dispatch)=> {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('/api/products')

        dispatch ({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload : error.response && error.response.data.messages 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const productDetails = (id) => async(dispatch)=>{

    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch (
            {
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data
            })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload : error.response && error.response.data.messages 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const productSearch = (productDescription) => async (dispatch) =>{
    try {
        
        dispatch({
            type:PRODUCT_SEARCH_REQUEST
        })

        const {data} = await axios.get(`api/products/search/${productDescription}`)

        dispatch({
            type: PRODUCT_SEARCH_SUCCESS,   
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_SEARCH_FAIL,
            payload : error.response && error.response.data.messages
            ? error.response.data.message
            : error.message
        })
    }
}