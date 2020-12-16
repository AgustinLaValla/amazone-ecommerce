import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder, payOrder } from '../actions/orderActions';
import { CheckoutSteps } from '../components/CheckoutSteps';
import MessageAlert from '../components/MessageAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import PaypalButton from '../components/PaypalButton';
import { CLEAR_ORDERS, CLEAR_PAY_ORDER } from '../constanst/orderConstants';
import dayjs  from 'dayjs'

export const OrderScreen = () => {

    const { id } = useParams();

    const { order, loading, error } = useSelector(state => state.order);
    const { loading: loadingPay, error: errorPay, success: successPay } = useSelector(state => state.orderPay);

    const dispatch = useDispatch();

    const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    useEffect(() => {
        if (!order || successPay || (order && order._id != id)) {
            dispatch({ type: CLEAR_PAY_ORDER })
            dispatch(getOrder(id))
        }
    }, [dispatch, id, successPay, order]);

    console.log(order)

    return loading ? <LoadingSpinner />
        : error ? <MessageAlert variant="danger">{error}</MessageAlert>
            : order &&
            (
                <div>
                    <CheckoutSteps step1 step2 step3 step4 />
                    <div className="row top">

                        <div className="placeorder-info">

                            {order.shippingAddress &&
                                <div className="card card-body">
                                    <h3>Shipping</h3>
                                    <div>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country} 
                                    </div>
                                    <div>
                                        {order.isDelivered
                                            ?
                                            <MessageAlert variant="success">
                                                Delivered at: {order.deliveredAt}
                                            </MessageAlert>
                                            :
                                            <MessageAlert variant="danger">
                                                Not Delivered
                                            </MessageAlert>
                                        }
                                    </div>
                                </div>
                            }

                            {order.paymentMethod &&
                                <div className="card card-body">
                                    <h3>Payments</h3>
                                    <div>Payment Method: {order.paymentMethod}</div>
                                    <div>{order.isPaid
                                        ?
                                        <MessageAlert variant="success">
                                            Paid at: {dayjs(order.paidAt).format('YYYY/MM/DD HH:MM')}
                                        </MessageAlert>
                                        :
                                        <MessageAlert variant="danger">
                                            Not Paid
                                       </MessageAlert>
                                    }
                                    </div>
                                </div>
                            }
                            <div className="card">
                                <ul className="cart-list-container">
                                    <li>
                                        <h3>Order items</h3>
                                        <div>Price</div>
                                    </li>


                                    {order.orderItems.length === 0
                                        ? <MessageAlert className="danger">Cart is Empty</MessageAlert>
                                        : order.orderItems.map(item =>
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
                                        )}


                                </ul>
                            </div>
                        </div>

                        <div className="placeorder-action">
                            <ul>
                                <li className="placeorder-action-payment">
                                    {!order.isPaid &&
                                        <React.Fragment>
                                            {errorPay && <MessageAlert variant="danger">{errorPay}</MessageAlert>}
                                            {loadingPay && <LoadingSpinner />}
                                            <PaypalButton order={order} onSuccess={handleSuccessPayment} />
                                        </React.Fragment>
                                    }
                                </li>
                                <li>
                                    <h3>Order sumary</h3>
                                </li>
                                <li>
                                    <div>Items</div>
                                    <div>${order.itemsPrice}</div>
                                </li>
                                <li>
                                    <div>Dirección de envio</div>
                                    <div>${order.shippingPrice}</div>
                                </li>
                                <li>
                                    <div>Tax</div>
                                    <div>${order.taxPrice}</div>
                                </li>
                                <li>
                                    <div>Order total</div>
                                    <div>${order.totalPrice}</div>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            );
}
