import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {productSearch} from '../actions/productActions'
import {Link, withRouter, useLocation} from 'react-router-dom'
import queryString from 'query-string'
import Loader from '../Components/Loader'

const BusquedaScreen = (history) => { 
    const {search} = useLocation()
    const {producto} = queryString.parse(search)

    const productsFound = useSelector(state => state.productsFound)
    const {loading, error, foundProducts} = productsFound

    const dispatch = useDispatch()
    
    useEffect(()=>{
        
        dispatch(productSearch(producto))

    },[dispatch, producto ])

    return (
        <>
        <h5>Búsqueda: {producto}</h5>
        {
            loading ? <Loader/> :
                <p>hello there</p>
        }
        </>
    )
}

export default withRouter(BusquedaScreen)
