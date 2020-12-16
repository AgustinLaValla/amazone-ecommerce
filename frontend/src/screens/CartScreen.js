import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, getCartList } from '../actions/cartActions';
import MessageAlert from '../components/MessageAlert';


export const CartScreen = (props) => {

    const { id } = useParams();

    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => props.history.push('/signin?redirect=shipping');


    useEffect(() => {
        dispatch(getCartList())
    }, [id])

    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0
                            ? <MessageAlert variant="danger">Cart is empty</MessageAlert>
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
                                            Qty:
                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item._id, e.target.value))}>
                                                {[...Array(item.countInStock).keys()].map(i =>
                                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                )}
                                            </select>
                                            <button type="button" className="button" onClick={() => removeFromCartHandler(item._id)} >
                                                Delete
                                            </button>
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

            <div className="cart-action">
                <h3>
                    Subtotal ( {cartItems.reduce((total, item) => total + item.qty, 0)} items) :
                    ${cartItems.reduce((total, item) => total + item.price * item.qty, 0)}
                </h3>
                <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                    Comprar
                </button>

            </div>

        </div>
    )
}
