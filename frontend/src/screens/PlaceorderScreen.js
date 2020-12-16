import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { CLEAR_ORDERS } from '../constanst/orderConstants';
import LoadingSpinner from '../components/LoadingSpinner';
import MessageAlert from '../components/MessageAlert';

export const PlaceorderScreen = (props) => {

    const { cartItems, shipping, payment } = useSelector(state => state.cart);
    const { order, loading, success, error } = useSelector(state => state.order);

    const history = useHistory();

    const dispatch = useDispatch();

    const itemsPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 0;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {
        //create an order
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shipping,
            paymentMethod: payment.paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }));
    }


    useEffect(() => {
        if (!shipping) {
            history.push('/shipping');
        } else if (!payment) {
            history.push('/payment');
        };
        return () => { };
    }, [shipping, payment]);

    useEffect(() => {
        if (success && order && order._id) {
            // window.location.href = `/order/${order._id}`;
            history.push(`/order/${order._id}`);
            dispatch({ type: CLEAR_ORDERS })
        }
        return () => { };
    }, [order, success, dispatch]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 setp4 />
            <div className="placeorder">
                <div className="placeorder-info">
                    {shipping && <div>
                        <h3>Shipping</h3>
                        <div>{shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}</div>
                    </div>}
                    {payment && <div>
                        <h3>Payments</h3>
                        <div>Payment Method: {payment.paymentMethod}</div>
                    </div>}
                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <h3>Shopping Cart</h3>
                                <div>Price</div>
                            </li>
                            {
                                cartItems.length === 0
                                    ? <div>Cart is empty</div>
                                    :
                                    cartItems.map(item =>
                                        <li>
                                            <div className="cart-image">
                                                <img src={item.imageUrl} alt="product" />
                                            </div>
                                            <div className="cart-name">
                                                <div>
                                                    <Link to={`product/${item._id}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <div>
                                                    Qty: {item.qty}

                                                </div>
                                            </div>
                                            <div className="cart-price">
                                                ${item.price}
                                            </div>
                                        </li>
                                    )
                            }
                        </ul>
                    </div>
                </div>

                <div className="placeorder-action">
                    {error && <MessageAlert variant="danger">{error}</MessageAlert>}
                    {loading && <LoadingSpinner />}
                    <ul>
                        <li>
                            <button onClick={placeOrderHandler} className="button primary full-width">
                                {loading ? '...Loading' : 'Placeorder'}
                            </button>
                        </li>
                        <li>
                            <h3>Order sumary</h3>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Dirección de envio</div>
                            <div>${shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${taxPrice}</div>
                        </li>
                        <li>
                            <div>Order total</div>
                            <div>${totalPrice}</div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}
