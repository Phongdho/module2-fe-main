import api from "../../apiService";
import * as types from "../constants/product.constant";

const productActions = {};

productActions.getAllProducts = ({pageNum, limit, query}) => {
    return async (dispatch) => {
        try {
            dispatch({type: types.GET_ALL_PRODUCTS_REQUEST, payload: null});
            let url =`/products?page=${pageNum}&limit=${limit}`;
            if (query) url += `&search=${query}`;
            // console.log(url);
            const res = await api.get(url);
            // console.log('data', res);
            dispatch({type: types.GET_ALL_PRODUCTS_SUCCESS, payload: res.data.data.result}); //WOW, this took 30 mins to get right!
        } catch (err) {
            console.log(err);
            dispatch({type: types.GET_ALL_PRODUCTS_FAIL, payload: err.message});
        };
    };
};

productActions.getSingleProduct = ({productId}) => {
    return async (dispatch) => {
        try {
            dispatch({type: types.GET_SINGLE_PRODUCT_REQUEST, payload: null});
            let url = `/products/${productId}`;
            const res = await api.get(url);
            dispatch({type: types.GET_SINGLE_PRODUCT_SUCCESS, payload: res.data.data.result});
        } catch (err) {
            console.log(err);
            dispatch({type: types.GET_ALL_PRODUCTS_FAIL, payload: err.message});
        }
    }
}


export default productActions;