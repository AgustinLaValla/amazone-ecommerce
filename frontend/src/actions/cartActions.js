import axios from '../axios/axios';
import { CART_ADD_ITEM, CART_ADD_ITEM_FAILED, CART_REMOVE_ITEM, CART_GET_ITEMS, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from '../constanst/cartConstans';
import Cookie from 'js-cookie';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: CART_ADD_ITEM, payload: { ...data.product, qty } });
        const { cart: { cartItems } } = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));
    } catch (error) {
        dispatch({ type: CART_ADD_ITEM_FAILED, payload: error })
    }
}

export const getCartList = () => async (dispatch) => dispatch({type: CART_GET_ITEMS});


export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    const { cart: { cartItems } } = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
};

export const saveShipping = (data) => dispatch => {
    dispatch({ type:CART_SAVE_SHIPPING, payload:data });
    Cookie.set('shipping', JSON.stringify(data));
}

export const savePayment = (payment) => dispatch => {
    dispatch({type: CART_SAVE_PAYMENT, payload:payment});
    Cookie.set('payment', JSON.stringify(payment));
}