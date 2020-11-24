import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../Components/Products/Product'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {listProducts} from '../actions/productActions'

const DulceriaScreen = () => { 
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(()=>{
        dispatch(listProducts())
    },[dispatch])

    return (
        <>
            <h1 style={{textAlign:'left'}}>Dulceria</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:
                <Row>
                    {products.map(product => {
                        if(product.departamento === 'dulceria'){
                            return(
                                <Col  key={product.id} sm={12} md={6} lg={4} xl={3}>
                                    <Product 
                                        product={product}
                                    />
                                </Col>)}
                    } )}
                </Row>  
            }
            
            
        </>
    )
}

export default DulceriaScreen
