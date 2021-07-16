import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import {withRouter, useHistory} from 'react-router-dom'
import {} from 'react-router'
import Product from '../Components/Products/Product'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {listProducts} from '../actions/productActions'

const HomeScreen = ({history, match, location}) => { 
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(()=>{
        dispatch(listProducts())

    }
    
    ,[dispatch])

    return (
        <>
            <h1>Los mas vendidos</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:
                <Row>
                    {products.map(product => (
                        <Col  key={product.id} xs={12} sm={6} md={6} lg={4} xl={3}>
                                <Product 
                                    product={product}
                                />
                        </Col>
                    ) )}
                </Row>  
            }
        </>
    )
}

export default withRouter(HomeScreen)
