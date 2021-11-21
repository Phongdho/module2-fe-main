import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./LoginPage.css";
import authAction from "../../redux/actions/auth.action";
import {useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userActions from "../../redux/actions/user.action";

const LoginPage = () => {
    let [dataForm, setDataForm] = useState({
        email: "",
        password: ""
    });
    let {email, password} = dataForm;

    const handleOnChange = (e) => {
        setDataForm({...dataForm, [e.target.name]:e.target.value});
    };
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authAction.login(dataForm));
        dispatch(userActions.getCurrentUser())
        history.push('/profile');
    };

    return (
        <div className="login-form">
        <h3 className="login-title">Sign in to shop</h3>
        <Form onSubmit={handleSubmit} className="login-main">

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label><strong>Email address:</strong></Form.Label>
                <Form.Control type="email" placeholder="Enter Email" name="email" value={email} onChange={handleOnChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label><strong>Password:</strong></Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={handleOnChange} />
            </Form.Group>

            <Button variant="primary" type="submit" style={{backgroundColor:"lightsteelblue", border:"none", marginTop:'1rem'}}>
                Login
            </Button>
        </Form>
        <ToastContainer autoClose={2000} />
    </div>
    )
}

export default LoginPage
