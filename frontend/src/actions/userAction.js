import * as fromUSER from '../constanst/userConstants';
import axios from '../axios/axios';
import Cookie from 'js-cookie';
import { getErrorMessage, setHeaders } from '../utils/utils';

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: fromUSER.SIGN_IN_REQUEST });
    try {
        const { data } = await axios.post('/api/users/signin', { email, password });
        dispatch({ type: fromUSER.SIGN_IN_SUCCESS, payload: data.user });
        Cookie.set('user-info', JSON.stringify(data.user));
        Cookie.set('token', JSON.stringify(data.token));

    } catch (error) {
        dispatch({ type: fromUSER.SIGN_IN_FAILED, payload: getErrorMessage(error) });
    }
}

export const register = (name, email, password) => async dispatch => {
    dispatch({ type: fromUSER.REGISTER_REQUEST });
    try {
        const { data } = await axios.post('/api/users/register', { name, email, password });
        await dispatch({ type: fromUSER.REGISTER_SUCCESS, payload: data.user });
        Cookie.set('user-info', JSON.stringify(data.user));
    } catch (error) {
        await dispatch({ type: fromUSER.REGISTER_FAILED, payload: getErrorMessage(error) });
    }
}

export const getUserDetails = (userId) => async dispatch => {
    dispatch({ type: fromUSER.USER_DETAILS_REQUEST });
    const token = Cookie.getJSON('token');
    try {
        const { data } = await axios.get(`/api/users/${userId}`, setHeaders(token));
        dispatch({ type: fromUSER.USER_DETAILS_REQUEST_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: fromUSER.USER_DETAILS_REQUEST_FAILED, payload: getErrorMessage(error) });
    }
}


export const updateUserDetails = user => async dispatch => {
    dispatch({ type: fromUSER.UPDATE_USER_DETAILS_REQUEST });
    const token = Cookie.getJSON('token')
    try {
        const { data } = await axios.put(`/api/users/update/${user._id}`, user, setHeaders(token));
        dispatch({
            type: fromUSER.UPDATE_USER_DETAILS_REQUEST_SUCCESS,
            payload: { user: data.user, message: data.message }
        });
        Cookie.set('user-info', JSON.stringify(data.user));
        Cookie.set('token', JSON.stringify(data.token));
    } catch (error) {
        dispatch({ type: fromUSER.UPDATE_USER_DETAILS_REQUEST_FAILED, payload: getErrorMessage(error) });
    }
}