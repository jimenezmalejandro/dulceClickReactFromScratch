import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

function CheckoutSteps({step1, step2, step3}) {
    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/cuenta'>
                        <Nav.Link>Ingresar</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled> Ingresa </Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/envio'>
                        <Nav.Link>Envio</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled> Envio </Nav.Link>}
            </Nav.Item>
            <Nav.Item>
                {step3? (
                    <LinkContainer to='/pedido'>
                        <Nav.Link>Ordenar</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled> Ordernar </Nav.Link>}
            </Nav.Item>
          
        </Nav>
    )
}

export default CheckoutSteps
