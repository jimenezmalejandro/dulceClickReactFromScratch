import React,{useEffect, useState} from 'react'
import {Card, ListGroup, ListGroupItem} from 'react-bootstrap'
import classes from './Product.module.css'
import {Link} from 'react-router-dom'

const Product = ({product}) => {

    

    return (
        <Card className={classes.Card}>
            <Link to={`/product/${product.id}`} className={classes.Link}>
                <Card.Img src={`/images/${product.imageUrl}`} variant='top' className={classes.Image}/>
            </Link>
            <Card.Body className={classes.Body}>
                <ListGroup className='list-group-flush'>
                    <ListGroupItem> 
                        <Link to={`/product/${product.id}`}>
                            <Card.Title as ='div' className={classes.anchor}>
                                <strong>{product.descripcion}</strong>
                            </Card.Title>
                        </Link>
                    </ListGroupItem>
                    <ListGroupItem> 
                        <Card.Text as='h3'>{`$ ${product.precio}`}</Card.Text>
                    </ListGroupItem>
                </ListGroup> 
            </Card.Body>
        </Card>
    )
}

export default Product
