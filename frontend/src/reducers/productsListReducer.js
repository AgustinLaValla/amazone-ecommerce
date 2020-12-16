import * as fromPRODUCTS from "../constanst/productsConstants";

const intialState = {
    loading: false,
    products: [],
    successSave: true,
    error: null
}

export function productListReducer(state = intialState, action) {
    switch (action.type) {

        //Get Products
        case fromPRODUCTS.PRODUCT_LIST_REQUEST:
            return { ...state, loading: true };

        case fromPRODUCTS.PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: null };

        case fromPRODUCTS.PRODUCT_LIST_FAILED:
            return { ...state, loading: false, error: action.payload }

        //Create Product

        case fromPRODUCTS.CREATE_PRODCUT_REQUEST:
            return { ...state, loading: true, successSave: false };

        case fromPRODUCTS.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, { ...action.payload }],
                successSave: true
            }
        case fromPRODUCTS.CREATE_PRODUCT_FAILED:
            return { ...state, loading: false, error: action.payload, successSave: true };

        //Update Product
        case fromPRODUCTS.UPDATE_PRODCUT_REQUEST:
            return { ...state, loading: true, successSave: false };

        case fromPRODUCTS.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: state.products.map(product => product._id === action.payload._id ? { ...action.payload } : product),
                successSave: true
            }

        case fromPRODUCTS.UPDATE_PRODUCT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
                successSave: true
            }

        //Delete Product
        case fromPRODUCTS.DELETE_PRODCUT_REQUEST:
            return { ...state, loading: true };

        case fromPRODUCTS.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: state.products.filter(product => product._id !== action.payload),
                error: null
            };

        case fromPRODUCTS.DELETE_PRODUCT_FAILED:
            return { ...state, error: action.payload }

        default: return state;
    }
}
