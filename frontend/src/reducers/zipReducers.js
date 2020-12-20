import {
    ZIP_VALIDATE_SUCCESS, 
    ZIP_VALIDATE_FAIL,
    ZIP_VALIDATE_REQUEST} from '../constants/zipConstants'

    export const zipValidateReducer = (state = {}, action) =>{
        switch (action.type){
            case ZIP_VALIDATE_REQUEST:
                return{loading : true}
                
            case ZIP_VALIDATE_SUCCESS:
                return{
                    loading: false, 
                    zipInfo: action.payload 
                }

            case ZIP_VALIDATE_FAIL:
                return{
                    loading: false,
                    error: action.payload
                }
                
            default:
                return state
        }
    }