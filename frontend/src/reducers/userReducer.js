import * as fromUSER from "../constanst/userConstants"

const initialState = {
    loading: false,
    userInfo: null,
    error: null
}

export const userSinginReducer = (state = initialState, action) => {
    switch (action.type) {
        case fromUSER.REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case fromUSER.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: { ...action.payload },
                error: null
            }

        case fromUSER.REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case fromUSER.SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true
            };

        case fromUSER.SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: { ...action.payload },
                error: null
            };
        case fromUSER.SIGN_IN_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case fromUSER.SIGN_OUT:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

const userDetailsInitialState = {
    userDetails: null,
    loading: false,
    error: null,
    message: null
}

export const userDetailsReducer = (state = userDetailsInitialState, action) => {
    switch (action.type) {
        case fromUSER.USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case fromUSER.USER_DETAILS_REQUEST_SUCCESS:
            return { ...state, loading: false, userDetails: { ...action.payload } }

        case fromUSER.USER_DETAILS_REQUEST_FAILED:
            return { ...state, loading: false, error: action.payload }

        case fromUSER.UPDATE_USER_DETAILS_REQUEST:
            return { ...state, loading: true, }

        case fromUSER.UPDATE_USER_DETAILS_REQUEST_SUCCESS:
            return { ...state, loading: false, userDetails: { ...action.payload.user }, message: action.payload.message }

        case fromUSER.UPDATE_USER_DETAILS_REQUEST_FAILED:
            return { ...state, loading: false, error: action.payload }

        case fromUSER.USER_DETAILS_CLEAR_ERRORS:
            return { ...state, error: null }

        case fromUSER.USER_DETAILS_CLEAR_MESSAGE:
            return { ...state, message: null }
        default:
            return state;
    }
}