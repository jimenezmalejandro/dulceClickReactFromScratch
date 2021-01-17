import React from 'react'
import {Card, Button} from 'react-bootstrap'
import Message from '../../Components/Message'
import classes from './Product.module.css'
import {Link} from 'react-router-dom'
import {addToCart} from '../../actions/cartActions'
import {useDispatch} from 'react-redux'
//Animation
import {motion} from 'framer-motion'

const Product = ({product}) => {

    const dispatch = useDispatch()

    const addToCartHandler =()=>{
        dispatch(addToCart(product._id, 1))
    }

    return (
        <Card animate={{rotate:360}} transition={{duration:2}} className={classes.Card}>
            <Link to={`/product/${product._id}`} className={classes.Link}>
                <Card.Img src={`/images/${product.imageUrl}`} variant='top' className={classes.Image}/>
            </Link>
            <Card.Body className={classes.Body}> 
                
                <Link to={`/product/${product._id}`}>
                    <Card.Title as ='div' className={classes.anchor}>
                        <strong>{product.descripcion}</strong>
                    </Card.Title>
                </Link> 
                    {product.precio ?
                     <Card.Text as='h3' className={classes.CardText}>
                            <span style={{ fontSize: '1rem'}} >$ </span>
                        { String((product.precio)).split('.')[0]}.
                            <span style={{fontSize: '1rem'}}>
                        { String((product.precio).toFixed(2)).split('.')[1]}
                            </span>
                    </Card.Text>
                        :  <Message>Error!</Message>
                        }    
                        
                    <Button 
                        whileHover={{ scale: 1.2 }}
                        className={classes.Button}
                        onClick={addToCartHandler}
                        >Agregar al carrito
                    </Button> 
            </Card.Body>           
        </Card>
        
    )
}

export default Product
