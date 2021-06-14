import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
    productListReducer, 
    productDetailsReducer,
    productSearchReducer
} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer,
    userUpdateProfileReducer,
    userUpdateAddressReducer
} from './reducers/userReducers'
import {zipValidateReducer} from './reducers/zipReducers'
import {resetPasswordReducer} from './reducers/resetPasswordReducers'
import {paymentIntentReducer} from './reducers/paymentReducers'
 
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    productsFound : productSearchReducer,
    cart: cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userUpdateAddress: userUpdateAddressReducer,
    zipValidate : zipValidateReducer,
    resetPassword : resetPasswordReducer,
    paymentIntent : paymentIntentReducer,
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart:  {  cartItems: cartItemsFromStorage},
    userLogin : { userInfo : userInfoFromStorage }

}

const middleWare =[thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))


export default store