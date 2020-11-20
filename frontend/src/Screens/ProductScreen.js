import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import axios from 'axios'

const ProductScreen = ({match}) => {

    const [product, setProduct] = useState([])

    useEffect(()=>{
        const fetchProduct = async () =>{
            const {data} = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [match])

    
    return (
        <>
         <Link className='btn btn-dark my-3' to='/'>Regresar</Link>
         <Row style={{textAlign: "center"}  }>
             <Col md={6}>
                <Image src={`/images/${product.imageUrl}`} alt={product.descripcion} fluid/>
             </Col>
             <Col md={3}>
                <ListGroup variant='flush'>
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
             <Col md={3}>
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
        </>
    )
}

export default ProductScreen
