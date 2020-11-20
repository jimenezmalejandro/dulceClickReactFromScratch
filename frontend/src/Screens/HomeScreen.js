import React, {useState, useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'

import Product from '../Components/Products/Product'


const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async ()=>{
            const {data} = await axios.get('/api/products')
            setProducts(data)
        }

        fetchProducts()
    },[ ])

    return (
        <>
            <h1>Los mas vendidos</h1>
            <Container fluid>
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Container>
                            <Product product={product}/>
                        </Container>
                    </Col>
                ) )}
            </Row>  
            </Container>
        </>
    )
}

export default HomeScreen
