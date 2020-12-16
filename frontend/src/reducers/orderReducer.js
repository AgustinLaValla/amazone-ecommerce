import * as fromORDERS from '../constanst/orderConstants';

const initialState = {
    loading: false,
    order: null,
    success: false,
    error: null,
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        //Create Order
        case fromORDERS.CREATE_ORDER_REQUEST:
            return { ...state, loading: true, success: false };

        case fromORDERS.CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, success: true, order: { ...action.payload }, error: null }

        case fromORDERS.CREATE_ORDER_FAILED:
            return { ...state, loading: false, error: action.payload, success: false }

        //Get Order
        case fromORDERS.GET_ORDER_REQUEST:
            return { ...state, loading: true };

        case fromORDERS.GET_ORDER_SUCCESS:
            return { ...state, loading: false, order: { ...action.payload }, error: null }

        case fromORDERS.GET_ORDER_FAILED:
            return { ...state, loading: false, error: action.payload, success: false }

        case fromORDERS.CLEAR_ORDERS:
            return {
                ...state,
                ...initialState
            }

        default:
            return state;
    }
}


export const orderPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case fromORDERS.PAY_ORDER_REQUEST:
            return { ...state, loading: true };
        case fromORDERS.PAY_ORDER_SUCCESS:
            return { ...state, loading: false, success: true };
        case fromORDERS.PAY_ORDER_FAILED:
            return { ...state, loading: false, success: false, error: action.payload };
        case fromORDERS.CLEAR_PAY_ORDER:
            return {}
        default:
            return state;
    }
}

const orderListInitialState = {
    orders: [],
    error: null,
    loading: false
}

export const orderListReducer = (state = orderListInitialState, action) => {
    switch (action.type) {
        case fromORDERS.GET_ORDER_LIST_REQUEST:
            return {
                ...state, loading: true
            }

        case fromORDERS.GET_ORDER_LIST_SUCCESS:
            return { ...state, orders: [...action.payload], loading: false }

        case fromORDERS.GET_ORDER_LIST_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}