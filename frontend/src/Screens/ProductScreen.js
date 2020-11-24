import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button, Container, InputGroup, FormControl} from 'react-bootstrap'
import {productDetails} from '../actions/productActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import classes from '../Styles/ProductScreen.module.css'
import { addToCart } from '../actions/cartActions'

const ProductScreen = ({match}) => {
    const [qty, setQty] = useState(1) 

    const dispatch = useDispatch()
    
    const prodDetails = useSelector(state => state.productDetails) 
    const {loading, error, product} = prodDetails

    const id = match.params.id


    useEffect(()=>{
         dispatch(productDetails(id))
    }, [dispatch, match])

    const reduceQty = ()=>{
        if( qty > 1){
        setQty(Number(qty) - Number(1) )
        }
        console.log(qty);
    }

    const addQty = ()=>{
        if(qty <= 999){
        setQty(Number(Number(qty)  + Number( 1) ))}
        console.log(qty);
    }

    const addToCartHandler = ()=>{
        
        dispatch(addToCart(id, qty))
        console.log(`dispatched id: ${id} qty:${qty}`);
    }
    
    return (
        <>
        <Link className='btn btn-dark my-3' to='/'>Regresar</Link>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
         <Container fluid>
            <Row >
                <Col md={4}>
                    <Image src={`/images/${product.imageUrl}`} alt={product.descripcion} fluid/>
                </Col>
                <Col md={3} style={{textAlign: 'left'}}>
                    <ListGroup variant='flush   '>
                        <ListGroup.Item>
                            <h3>{product.descripcion}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Precio : ${product.precio ? (product.precio).toFixed(2) : product.precio } MXN
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
                                        <strong>${ product.precio ? (product.precio).toFixed(2) : product.precio } MXN</strong>
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
                                <Row>
                                    <Col>
                                    Cantidad: 
                                    </Col>
                                    <Col>
                                    <InputGroup className="mb-1">
                                        <InputGroup.Append>
                                            <Button 
                                                onClick={reduceQty }
                                                variant="outline-secondary">-</Button>
                                            </InputGroup.Append>
                                            <FormControl
                                                type='number'
                                                disabled='true'
                                                className={classes.Form}
                                                value={qty}
                                                onChange={(e)=> e.target.value<1 ? 1 : setQty(e.target.value) }
                                            />
                                            <InputGroup.Append>
                                            <Button
                                                onClick={ addQty } 
                                                variant="outline-secondary">+</Button>  
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{textAlign: 'center'}}>
                                <Button 
                                    onClick={addToCartHandler}
                                    className={classes.Button} 
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
