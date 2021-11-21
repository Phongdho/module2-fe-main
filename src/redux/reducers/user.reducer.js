import * as types from "../constants/user.constant";

const initialState = {
    cartProduct: [],
    loading: false,
    user: null,
    comment: null,
};

const userReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case types.ADD_TO_CART_REQUEST:
        case types.GET_TO_CART_REQUEST:
        case types.UPDATE_CART_REQUEST:
        case types.DELETE_FROM_CART_REQUEST:
        case types.POST_REVIEW_REQUEST:
        case types.POST_ORDER_REQUEST:
        case types.GET_SINGLE_USER_REQUEST:
        case types.UPDATE_USER_REQUEST:
        case types.GET_ALL_COMMENT_REQUEST:
        case types.DELETE_REVIEW_REQUEST:
            return {...state, loading: true};
        case types.GET_TO_CART_SUCCESS:
            return {...state, cartProduct: payload, loading: false};
        case types.GET_SINGLE_USER_SUCCESS:
        case types.UPDATE_USER_SUCCESS:
            return {...state, user: payload};
        case types.GET_ALL_COMMENT_SUCCESS:
            return {...state, comment: payload};
        case types.ADD_TO_CART_FAIL:
        case types.ADD_TO_CART_SUCCESS:
        case types.GET_TO_CART_FAIL:
        case types.DELETE_FROM_CART_SUCCESS:
        case types.DELETE_FROM_CART_FAIL:
        case types.POST_REVIEW_SUCCESS:
        case types.POST_REVIEW_FAIL:
        case types.POST_ORDER_SUCCESS:
        case types.POST_ORDER_FAIL:
        case types.UPDATE_CART_SUCCESS:
        case types.UPDATE_CART_FAIL:
        case types.UPDATE_USER_FAIL:
        case types.GET_SINGLE_USER_FAIL:
        case types.GET_ALL_COMMENT_FAIL:
        case types.DELETE_REVIEW_SUCCESS:
        case types.DELETE_REVIEW_FAIL:
            return {...state, loading: false};
        default:
            return state;
    };
};

export default userReducer;