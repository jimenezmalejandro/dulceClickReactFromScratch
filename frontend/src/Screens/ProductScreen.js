import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, Container} from 'react-bootstrap'
import {productDetails} from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ProductScreen = ({match}) => {
    const dispatch = useDispatch()
    
    const prodDetails = useSelector(state => state.productDetails) 
    const {loading, error, product} = prodDetails

    useEffect(()=>{
         dispatch(productDetails(match.params.id))
    }, [dispatch, match])

    
    return (
        <>
        <Link className='btn btn-dark my-3' to='/'>Regresar</Link>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
         <Container fluid>
            <Row >
                <Col md={5}>
                    <Image src={`/images/${product.imageUrl}`} alt={product.descripcion} fluid/>
                </Col>
                <Col md={3} style={{textAlign: 'left'}}>
                    <ListGroup variant='flush   '>
                        <ListGroup.Item>
                            <h3>{product.descripcion}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Precio : ${product.precio}MXN
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Detalles.
                            Producto: {product.descripcion}.
                            Piezas aproximadas: { product.piezas} (sujeto a cambios por el proveedor)*
                            Categoria: {product.categoria}.
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4} style={{textAlign: 'left'}}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                    Precio: 
                                    </Col>
                                    <Col>
                                        <strong>${product.precio}MXN</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                    Disponible: 
                                    </Col>
                                    <Col>
                                        {product.existencia >=1 ? 'Disponible para entrega immediata' : 'No disponible'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    className='btn-block' 
                                    variant='secondary'
                                    type='button'
                                    disabled={product.existencia < 1}
                                    >
                                    Añadir al carrito <i className='fas fa-cart-plus'></i>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
         </Container>   
        }
        </>
    )
}

export default ProductScreen
