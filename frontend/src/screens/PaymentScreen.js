import React, { useState } from 'react'
import { savePayment } from '../actions/cartActions';
import { useDispatch } from 'react-redux';
import { CheckoutSteps } from '../components/CheckoutSteps';

export const PaymentScreen = (props) => {

    const [paymentMethod, setPaymentMethod] = useState(null);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({ paymentMethod }));
        props.history.push('/placeorder');
    };


    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2 className="text-center">Payment</h2>
                        </li>
                        <li>
                            <div>
                                <input
                                    type="radio"
                                    value="paypal"
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    required
                                />
                                <label htmlFor="paymentMethod">Paypal</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    value="stripe"
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    required
                                />
                                <label htmlFor="paymentMethod">Stripe</label>
                            </div>
                        </li>
                        <li>
                            <button type="submit" className="button primary" disabled={!paymentMethod}>Continuar</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}
