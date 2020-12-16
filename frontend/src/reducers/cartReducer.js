import { CART_ADD_ITEM, CART_ADD_ITEM_FAILED, CART_REMOVE_ITEM, CART_GET_ITEMS, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_EMPTY } from '../constanst/cartConstans';

const initialState = {
    cartItems: [],
    error: null,
    shipping: null,
    payment: null
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        //Add Item
        case CART_ADD_ITEM:
            const exists = state.cartItems.find(item => item._id === action.payload._id);
            if (exists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item._id === action.payload._id
                        ? { ...action.payload, product: action.payload._id }
                        : item)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...action.payload, product: action.payload._id }]
                }
            }

        case CART_ADD_ITEM_FAILED:
            return {
                ...state,
                error: action.payload
            }

        //Remove Item
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems.filter(item => item._id !== action.payload)]
            }

        //Get Items
        case CART_GET_ITEMS:
            return { ...state }

        //Save shipping data
        case CART_SAVE_SHIPPING:
            return { ...state, shipping: { ...action.payload } }

        //Save payment
        case CART_SAVE_PAYMENT:
            return {
                ...state,
                payment: { ...action.payload }
            }

        case CART_EMPTY:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}