import React,{useEffect, useState} from 'react'
import {Card, ListGroup, Button, ListGroupItem} from 'react-bootstrap'
import classes from './Product.module.css'
import {Link} from 'react-router-dom'

const Product = ({product}) => {



    return (
        <Card className={classes.Card}>
            <Link to={`/product/${product._id}`} className={classes.Link}>
                <Card.Img src={`/images/${product.imageUrl}`} variant='top' className={classes.Image}/>
            </Link>
            <Card.Body className={classes.Body}> 
                
                <Link to={`/product/${product._id}`}>
                    <Card.Title as ='div' className={classes.anchor}>
                        <strong>{product.descripcion}</strong>
                    </Card.Title>
                </Link> 
                
                <Card.Text as='h3'>{`$ ${product.precio}`}</Card.Text>
              
            <Button className={classes.Button}>Agregar al carrito</Button>
            </Card.Body>
        </Card>
        
    )
}

export default Product
