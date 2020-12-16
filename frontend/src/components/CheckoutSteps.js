import React from 'react'

export const CheckoutSteps = (props) => {

    return (
        <div className="checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Ingresar</div>
            <div className={props.step2 ? 'active' : ''}>Dirreción de envío</div>
            <div className={props.step3 ? 'active' : ''}>Pago</div>
            <div className={props.step4 ? 'active' : ''}>Lugar de compra</div>
        </div>
    )
}
