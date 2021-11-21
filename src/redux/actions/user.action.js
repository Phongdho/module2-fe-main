import api from "../../apiService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as types from "../constants/user.constant";
import productActions from "./product.action";
const userActions = {};

userActions.getCurrentUser = () => async (dispatch) => {
    try {
        dispatch({type: types.GET_SINGLE_USER_REQUEST});
        const res = await api.get("/users/me");
        console.log("res is", res)
        dispatch({type: types.GET_SINGLE_USER_SUCCESS, payload: res.data.data});
        console.log(res.data.data, "new me");
    } catch (err) {
        console.log(err);
        dispatch({type: types.GET_SINGLE_USER_FAIL});
    }
}

userActions.updateCurrentUser = ({name, email, image}) => async (dispatch) => {
    dispatch({ type: types.UPDATE_USER_REQUEST});
    try {
        const res = await api.put(`users/me`, {name, email, avatar: image});
        dispatch({type: types.UPDATE_USER_SUCCESS});
        dispatch(userActions.getCurrentUser());
        toast.success("You've successfully updated your information");
    } catch (err) {
        console.log(err);
        toast.error(err.message);
        dispatch({type: types.UPDATE_USER_FAIL});
    }
}

userActions.addToCart = ({addingProductToCart}) => {
    return async (dispatch) => {
        dispatch({type: types.ADD_TO_CART_REQUEST});
        try {
            let url = `/carts/${addingProductToCart}`;
            let res = await api.post(url, {
                // "productId": addingProductToCart,
                qty: 1
            });
            dispatch({type: types.ADD_TO_CART_SUCCESS, payload: res.data});
            toast.success("Item has successfully been added to your cart");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.ADD_TO_CART_FAIL, payload: err.message});
        }
    }
}

userActions.updateCart = ({updateId}) => {
    return async (dispatch) => {
        dispatch({type: types.UPDATE_CART_REQUEST});
        try {
            let url = `/carts/add-product-cart`;
            let res = await api.put(url, [{
                productId: updateId,
                qty: 1
            }]);
            dispatch({type: types.UPDATE_CART_SUCCESS, payload: res.data});
            toast.success("Item has successfully been added to your cart");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.UPDATE_CART_FAIL, payload: err.message});
        }
    }
}

userActions.getCartProduct = () => {
    return async (dispatch) => {
        try {
            dispatch({type: types.GET_TO_CART_REQUEST});
            const res = await api.get(`/carts/single-cart`);
            dispatch({type: types.GET_TO_CART_SUCCESS, payload: res.data.data});
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.GET_TO_CART_FAIL});
        }
    }
}

userActions.deleteCart = ({cartId}) => {
    return async (dispatch) => {
        dispatch({ type: types.DELETE_FROM_CART_REQUEST});
        try {
            let url = `/carts/${cartId}`;
            const res = await api.delete(url);
            dispatch(userActions.getCartProduct());
            dispatch({ type: types.DELETE_FROM_CART_SUCCESS})
        } catch (err) {
            console.log(err);
            dispatch({ type: types.DELETE_FROM_CART_FAIL})
        }
    }
}

userActions.postReview = ({ productId, review, rating}) => {
    return async (dispatch) => {
        dispatch({type: types.POST_REVIEW_REQUEST});
        try {
            const res = await api.post(`/comments/${productId}`, {
                "content": review
          });
            dispatch({type: types.POST_REVIEW_SUCCESS});
            dispatch(productActions.getSingleProduct({productId}));
            dispatch(userActions.getAllComment({productId}))
            toast.success("Your review has been received");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.POST_REVIEW_FAIL});
        }
    }
}

userActions.postOrder = (cartId) => {
    return async (dispatch) => {
        dispatch({type: types.POST_ORDER_REQUEST}); 
        try {
            console.log(cartId,"cardId");
            const res = await api.put(`/carts/payment/${cartId}`);
            dispatch({type: types.POST_REVIEW_SUCCESS});
            dispatch(userActions.getCartProduct());
            toast.success("We've received your order. Thanks for shopping with us!");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.POST_REVIEW_FAIL});
        }
    }
}

userActions.getAllComment = ({productId}) => async (dispatch) => {
    try {
      dispatch({ type: types.GET_ALL_COMMENT_REQUEST });
      const res = await api.get(`/comments/${productId}`);
      console.log(productId, "here");
      console.log(res,"data");
      dispatch({ type: types.GET_ALL_COMMENT_SUCCESS, payload:res.data.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: types.GET_ALL_COMMENT_FAIL });
    }
}

userActions.putReview = ({ updateComment, comment, rating, productId}) => {
    return async (dispatch) => {
        dispatch({type: types.POST_REVIEW_REQUEST});
        try {
            const res = await api.put(`/comments/${updateComment}`, {
                "content": comment
          });
            dispatch({type: types.POST_REVIEW_SUCCESS});
            // dispatch(productAction.getProductDetail({productId}));
            dispatch(userActions.getAllComment({productId}))
            // toast.success("Your review has been received");
        } catch (err) {
            console.log(err);
            toast.error(err.message);
            dispatch({type: types.POST_REVIEW_FAIL});
        }
    }
}

userActions.deleteReview = ({deleteReview, productId}) => {
    return async (dispatch) => {
        dispatch({type: types.DELETE_REVIEW_REQUEST});
        try {
            const res = await api.delete(`comments/${deleteReview}`);
            dispatch({type: types.DELETE_REVIEW_SUCCESS});
            dispatch(userActions.getAllComment({productId}))
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    }
}


export default userActions;
