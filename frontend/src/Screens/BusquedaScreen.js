import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {productSearch} from '../actions/productActions'
import {Row, Col} from 'react-bootstrap'
import {Link, withRouter, useLocation} from 'react-router-dom'
import queryString from 'query-string'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Product from '../Components/Products/Product'

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
        <h5>Búsqueda: {producto}</h5><br/><br/>
        {
            loading ? <Loader/> : error
            ? <Message >😅Oops! no hemos encontrado resultados para{producto} 
                <span>Prueba con una descripción más corta</span>
              </Message>
            : foundProducts.length == 0 ? <Message>
                                                😅Oops! no hemos encontrado resultados para: {producto}. 
                                                    <span> Prueba con una descripción más corta</span>
                                          </Message> 
            : <Row>
                {foundProducts.map(product => (  
                     <Col  key={product.id} xs={12} sm={6} md={6} lg={4} xl={3}>
                        <Product 
                            product={product}
                        />
                    </Col>
                ))}
            </Row>
        }
        </>
    )
}

export default withRouter(BusquedaScreen)
