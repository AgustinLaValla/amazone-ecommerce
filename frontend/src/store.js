import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer } from './reducers/productsListReducer';
import thunk from 'redux-thunk';
import { productDetailsReducer } from './reducers/productDetailsReducer';
import { cartReducer } from './reducers/cartReducer';
import Cookie from 'js-cookie';
import { userDetailsReducer, userSinginReducer } from './reducers/userReducer';
import { orderReducer, orderPaymentReducer, orderListReducer } from './reducers/orderReducer';

const userInfo = Cookie.getJSON('user-info') || null;
const cartItems = Cookie.getJSON('cartItems') || [];
const shipping = Cookie.getJSON('shipping') || null;
const payment = Cookie.getJSON('payment') || null;

const initialState = { cart: { cartItems, shipping, payment }, userSignin: { userInfo } };

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSinginReducer,
    order: orderReducer,
    orderPay: orderPaymentReducer,
    orderList: orderListReducer,
    user: userDetailsReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
