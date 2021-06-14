import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import classes from './CheckoutSteps.module.css'

function CheckoutSteps({step1, step2, step3, step4}) {
    return (
        <Nav className='justify-content-center mb-4' className={classes.navItemText}>
            <Nav.Item >
                {step1 ? (
                    <LinkContainer to='/cuenta' style={{'color': 'black', 'fontWeight':'900'}}>
                        <Nav.Link >Ingresar </Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled> Ingresa </Nav.Link>}
            </Nav.Item>
            <Nav.Item className={classes.separator}>
                |
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/envio' style={{'color': 'black', 'fontWeight':'900'}}>
                        <Nav.Link> Envio</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled> Envio </Nav.Link>}
            </Nav.Item>
            <Nav.Item className={classes.separator}>
                |
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/envio' style={{'color': 'black', 'fontWeight':'900'}}>
                        <Nav.Link> Pago</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled> Pago </Nav.Link>}
            </Nav.Item>
            <Nav.Item className={classes.separator}>
                |
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/pedido' style={{'color': 'black', 'fontWeight':'900'}}>
                        <Nav.Link> Confirmación</Nav.Link>
                    </LinkContainer>
                ): <Nav.Link disabled> Confirmación  </Nav.Link>}
            </Nav.Item>
          
        </Nav>
    )
}

export default CheckoutSteps
