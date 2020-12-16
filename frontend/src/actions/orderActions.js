import axios from '../axios/axios';
import Cookie from 'js-cookie';
import * as fromORDER from '../constanst/orderConstants';
import { CART_EMPTY } from '../constanst/cartConstans';
import { getErrorMessage, setHeaders } from '../utils/utils';

export const createOrder = (order) => async (dispatch) => {
    dispatch({ type: fromORDER.CREATE_ORDER_REQUEST, payload: order });
    const token = Cookie.getJSON('token');
    try {
        const { data } = await axios.post('/api/orders', order, setHeaders(token));
        console.log(data);
        dispatch({ type: fromORDER.CREATE_ORDER_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        Cookie.remove('cartItems');
    } catch (error) {
        console.log(getErrorMessage(error));
        dispatch({
            type: fromORDER.CREATE_ORDER_FAILED,
            payload: getErrorMessage(error)
        });
    }
}

export const getOrder = (orderId) => async (dispatch) => {

    dispatch({ type: fromORDER.GET_ORDER_REQUEST });
    const token = Cookie.getJSON('token');

    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, setHeaders(token));
        dispatch({ type: fromORDER.GET_ORDER_SUCCESS, payload: data.order });
    } catch (error) {
        dispatch({
            type: fromORDER.GET_ORDER_FAILED,
            payload: getErrorMessage(error)
        });
    }
}

export const payOrder = (order, paymentResult) => async (dispatch) => {
    dispatch({ type: fromORDER.PAY_ORDER_REQUEST, payload: paymentResult });
    const token = Cookie.getJSON('token');
    try {
        const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, setHeaders(token));
        dispatch({ type: fromORDER.PAY_ORDER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: fromORDER.PAY_ORDER_FAILED, payload: getErrorMessage(error) });
    }
}

export const getOrderList = () => async dispatch => {
    dispatch({ type: fromORDER.GET_ORDER_LIST_REQUEST });
    const token = Cookie.getJSON('token');
    try {
        const { data } = await axios.get('/api/orders/my-list', setHeaders(token));
        dispatch({ type: fromORDER.GET_ORDER_LIST_SUCCESS, payload: data.orders });
    } catch (error) {
        console.log(error)
        dispatch({
            type: fromORDER.GET_ORDER_LIST_FAILED,
            payload: getErrorMessage(error)
        });
    }
}