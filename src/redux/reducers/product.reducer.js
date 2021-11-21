import * as types from "../constants/product.constant";

const initialState = {
    products: [],
    loading: false,
    errorMessage: "",
    singleProduct: null,
};

const productReducer = (state=initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case types.GET_ALL_PRODUCTS_REQUEST:
            return {...state, loading: true, errorMessage:""};
        case types.GET_ALL_PRODUCTS_SUCCESS:
            return {...state, products: payload, loading: false};
        case types.GET_ALL_PRODUCTS_FAIL:
            return {...state, errorMessage: payload, loading: false};
        case types.GET_SINGLE_PRODUCT_REQUEST:
            return {...state, loading: true};
        case types.GET_SINGLE_PRODUCT_SUCCESS:
            return {...state, singleProduct: payload, loading: false};
        case types.GET_SINGLE_PRODUCT_FAIL:
            return {...state, loading: false};
        default:
            return state;
    }
}

export default productReducer;