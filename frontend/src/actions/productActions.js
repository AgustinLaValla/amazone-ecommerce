import * as fromPRODUCTS from "../constanst/productsConstants";
import axios from '../axios/axios';
import Cookie from 'js-cookie';

const setHeaders = (token) => token ? { headers: { 'Authorization': `bearer ${token}` } } : null;

export const getProductList = () => async (dispatch) => {
    try {
        dispatch({ type: fromPRODUCTS.PRODUCT_LIST_REQUEST });
        const { data } = await axios.get('/api/products');
        dispatch({ type: fromPRODUCTS.PRODUCT_LIST_SUCCESS, payload: data.products });
    } catch (error) {
        dispatch({ type: fromPRODUCTS.PRODUCT_LIST_FAILED, payload: error });
    }
}

export const productDetails = (productId) => async dispatch => {
    try {
        dispatch({ type: fromPRODUCTS.PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({ type: fromPRODUCTS.PRODUCT_DETAILS_SUCCESS, payload: data.product });
    } catch (error) {
        dispatch({ type: fromPRODUCTS.PRODUCT_DETAILS_FAILED, payload: { ...error } });
    }
}

export const createProduct = (productBody) => async (dispatch) => {
    dispatch({ type: fromPRODUCTS.CREATE_PRODCUT_REQUEST });
    const token = Cookie.getJSON('token');
    
    try {
        const { data } = await axios.post('/api/products', { ...productBody }, setHeaders(token));
        dispatch({ type: fromPRODUCTS.CREATE_PRODUCT_SUCCESS, payload: data.product });
    } catch (error) {
        dispatch({ type: fromPRODUCTS.CREATE_PRODUCT_FAILED, payload: error });
    }
}

export const updateProduct = (productBody) => async (dispatch) => {
    const token = Cookie.getJSON('token');
    dispatch({ type: fromPRODUCTS.UPDATE_PRODCUT_REQUEST });
    try {
        const { data } = await axios.put(`/api/products/${productBody._id}`, { ...productBody }, setHeaders(token));
        dispatch({ type: fromPRODUCTS.UPDATE_PRODUCT_SUCCESS, payload: data.product });
    } catch (error) {
        dispatch({ type: fromPRODUCTS.UPDATE_PRODUCT_FAILED, payload: error });
    }
}

export const deleteProduct = (id) => async dispatch => {
    dispatch({ type: fromPRODUCTS.DELETE_PRODCUT_REQUEST });
    const token = Cookie.getJSON('token');
    try {
        await axios.delete(`/api/products/${id}`, setHeaders(token));
        dispatch({ type: fromPRODUCTS.DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
        dispatch({ type: fromPRODUCTS.DELETE_PRODUCT_FAILED, payload: error });
    }
}