import * as types from "../constants/auth.constant";
import api from "../../apiService";
import { toast } from "react-toastify";

const authAction = {};

authAction.register = ({name, email, password}) => async (dispatch) => {
    try {
        dispatch({type: types.POST_REGISTER_REQUEST});
        const res = await api.post("/users", {name, email, password});
        dispatch({type: types.POST_REGISTER_SUCCESS});
        toast.success("Profile successfully created");
    } catch (err) {
        console.log(err);
        dispatch({type: types.POST_REGISTER_FAIL});
    }
}

authAction.login = ({email, password}) => async (dispatch) => {
    try {
        dispatch({type: types.POST_LOGIN_REQUEST});
        const res = await api.post("/users/login", { email, password});
        dispatch({type: types.POST_LOGIN_SUCCESS, payload: res.data.data.user});
        api.defaults.headers.common["authorization"]= "Bearer " + res.data.data;
        localStorage.setItem("token", res.data.data);
        toast.success("Login successfully");
    } catch (err) {
        console.log(err);
        dispatch({type: types.POST_LOGIN_FAIL});
    }
}

// authAction.logout = () => async (dispatch) => {
//     try {
//         dispatch({type: types.POST_LOGIN_REQUEST});
//         const res = await api.post("/users/login");
//         dispatch({type: types.POST_LOGIN_SUCCESS, payload: null});
//         api.defaults.headers.common["authorization"]= "Bearer ", "";
//         localStorage.setItem("token", null);
//         toast.success("Logout successfully");
//     } catch (err) {
//         console.log(err);
//         dispatch({type: types.POST_LOGIN_FAIL});
//     }
// }

export default authAction;
