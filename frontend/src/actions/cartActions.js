import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState )=>{

    const {data} = await axios.get(`/api/products/${id}`)

    try {
        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                product: data._id,
                descripcion: data.descripcion,
                imageUrl: data.imageUrl,
                precio: data.precio,
                existencia : data.existencia,
                categoria: data.categoria,
                departamento: data.departamento,
                codigo: data.codigo,
                qty
            }
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    } catch (error) {
        
    }

}

export const removeFromCart = (id)=> async(dispatch, getState) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error);
    }
}
