import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILED } from "../constanst/productsConstants"

const intialState = {
    loading: false,
    product: null,
    error: null
}

export const productDetailsReducer = (state = intialState, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: { ...action.payload }
            }
        case PRODUCT_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}