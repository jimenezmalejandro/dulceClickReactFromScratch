import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../Components/Message'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Card, Button, InputGroup, FormControl, ListGroupItem} from 'react-bootstrap'
import classes from '../Styles/ProductScreen.module.css'
import {addToCart, removeFromCart} from '../actions/cartActions'
import classButton from '../Components/Products/Product.module.css'


const CartScreen = ({match, location, history}) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart



    useEffect(()=>{

    },[dispatch])


    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = ()=>{
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={4}>
            <h1> Carrito <i className='fas fa-shopping-cart'></i> </h1>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item >
                            <h2>Subtotal 
                                ({cartItems.reduce((accum, item) => accum + item.qty ,0 )})
                                articulos
                            </h2> 
                            <h3 style={{display: "flex", justifyContent: 'center', alignItems:'center'}}>
                            <span style={{ fontSize: '.8rem'}} >$ </span>
                            { String(cartItems
                                .reduce((accum, item)=> accum + item.precio * item.qty, 0)).split('.')[0]}.
                            <span style={{fontSize: '.8rem'}}>
                            { String((cartItems
                                .reduce((accum, item)=> accum + item.precio * item.qty, 0)).toFixed(2)).split('.')[1]}
                            </span>
                            </h3>

                        </ListGroup.Item>
                        <ListGroupItem>
                            <Button type='button' className={classButton.ButtonSecondary} style={{width: '100%', minHeight:'3rem', backgroundColor:'#e4f434', color:'black', borderColor:'white'}} 
                                disabled={cartItems.length < 1}
                                onClick={checkoutHandler}
                                >
                                Completar compra <i className="fas fa-shopping-bag"></i> 
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
            
            <Col xs={6} md={8}>
                
                {cartItems.length === 0
                    ? <Message>Tu carrito esta vacio
                        <Link to='/'> Regresar</Link>
                        </Message>
                    :(
                      <ListGroup variant='flush' >
                          {cartItems.map(item => (
                              <ListGroup.Item key={item.product} >
                                  <Row className={classes.ListGroupItem}>
                                      <Col md={2}>
                                          <Image src={`/images/${item.imageUrl}`} alt={item.codigo} fluid rounded />
                                      </Col>
                                      <Col md={4}>
                                          <Link to={`/product/${item.product}`}>{item.descripcion}</Link>
                                      </Col>

                                      <Col md={4}>
                                        <InputGroup className={classes.Input}>
                                            <InputGroup.Append>
                                                <Button
                                                    onClick={ (e)=> item.qty <2 ? 1 : dispatch(addToCart(item.product, Number(item.qty) - Number(item.qty) - 1 ))}
                                                    variant="outline-secondary">-</Button>
                                                </InputGroup.Append>
                                                <FormControl
                                                    type='number'
                                                    disabled={true}
                                                    className={classes.Form}
                                                    value={item.qty} 
                                                    onChange={item.qty < 1 ? dispatch(addToCart(item.product,1)) : undefined}
                                                    />
                                                <InputGroup.Append>
                                                <Button
                                                    onClick={ (e)=> dispatch(addToCart(item.product,Number(item.qty) - Number(item.qty) + 1 ))}
                                                    variant="outline-secondary">+</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                      </Col>

                                      <Col md={2}>
                                        <Button type='button' variant='light' 
                                            onClick={()=>removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>  
                                            </Button>
                                      </Col>


                                  </Row>
                              </ListGroup.Item>
                          ))}
                      </ListGroup>
                    ) }
            </Col>
            
        </Row>
    )
}

export default CartScreen
